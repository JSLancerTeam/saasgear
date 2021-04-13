import { ApolloError } from 'apollo-server-errors';
import { findUser, updateUser } from '../../repository/user.repository';
import logger from '../../utils/logger';

export async function updateProfile(id, name, company, position) {
  try {
    const user = await findUser(id);
    if (!user) {
      return new ApolloError('Can not find any user');
    }

    await updateUser(id, { name, position, company });
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
