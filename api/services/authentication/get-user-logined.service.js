import { AuthenticationError } from 'apollo-server-express';
import { verify } from '~/helpers/jwt.helper';
import { findUser } from '~/repository/user.repository';
import { getTeamInvitation } from "~/repository/team_invitations.repository";

export default async function getUserLogined(bearerToken) {
  if (bearerToken) {
    try {
      const token = bearerToken.split(' ');
      if (!token[1] || token[0] !== 'Bearer') {
        return null;
      }
      const { user } = verify(token[1]);
      const userInfo = await findUser({ email: user.email });
      const [invitationToken] = await getTeamInvitation({ email: user.email, status: 'active' });
      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        isActive: userInfo.is_active,
        avatarUrl: userInfo.avatar_url,
        invitationToken: invitationToken ? invitationToken.token : null,
      };
    } catch (error) {
      throw new AuthenticationError('Authentication failure');
    }
  }
  return null;
}
