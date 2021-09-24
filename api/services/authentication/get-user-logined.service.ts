import { AuthenticationError } from 'apollo-server-express';
import { Response } from 'express';
import { verify } from '~/helpers/jwt.helper';
import { findUser } from '~/repository/user.repository';
import { getTeamInvitation } from '~/repository/team_invitations.repository';
// import { fromPairs } from 'lodash';

type UserLoginedResponse = {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  position: string;
  company: string;
  avatarUrl: string;
  invitationToken: string | null;
}

export default async function getUserLogined(bearerToken: string | null, res: Response): Promise<UserLoginedResponse> {
  if (bearerToken) {
    try {
      const token = bearerToken.split(' ');
      if (!token[1] || token[0] !== 'Bearer') {
        return null;
      }
      const verifyToken = verify(token[1]);
      if (typeof verifyToken === 'object') {
        const { user } = verifyToken;
        const userInfo = await findUser({ email: user.email });
        const [invitationToken] = await getTeamInvitation({ email: user.email, status: 'active' });
        return {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          isActive: userInfo.is_active,
          position: userInfo.position,
          company: userInfo.company,
          avatarUrl: userInfo.avatar_url,
          invitationToken: invitationToken ? invitationToken.token : null,
        };
      }
    } catch (error) {
      res.clearCookie('token');
      throw new AuthenticationError('Authentication failure');
    }
  }
  return null;
}
