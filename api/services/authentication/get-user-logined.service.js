import { AuthenticationError } from 'apollo-server-express';
import { verify } from '~/helpers/jwt.helper';
import { getUserByEmail } from '~/repository/user.repository';

export default async function getUserLogined(bearerToken) {
  if (bearerToken) {
    try {
      const token = bearerToken.split(' ');
      if (!token[1] || token[0] !== 'Bearer') {
        return null;
      }
      const { user } = verify(token[1]);
      const userInfo = await getUserByEmail(user.email);
      return {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        is_active: userInfo.is_active,
      };
    } catch (error) {
      throw new AuthenticationError('Authentication failure');
    }
  }
  return null;
}
