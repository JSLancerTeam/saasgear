import pkg from 'apollo-server-express';
import { getUserByEmail, getUserByIdAndJoinUserToken } from '../../repository/user.repository.js';
import generateRandomKey from '../../helpers/genarateRandomkey.js';
import { createUserTokenByUser, updateUserTokenById } from '../../repository/user_token.repository.js';
import { sendForgotPasswordEmail } from '../../email-template/forgotPassword.js';
import logger from '../../utils/logger.js';

const { ApolloError } = pkg;

export async function forgotPasswordUser(email) {
  try {
    const user = await getUserByEmail(email);
    if (!user || !user.id) {
      throw new ApolloError('Can not find any user');
    }
    const session = await getUserByIdAndJoinUserToken(user.id, 'forgot_password');
    const tokenGenerated = await generateRandomKey();
    const token = `${tokenGenerated}-${user.id}`;
    if (!session) {
      await createUserTokenByUser(user.id, token, 'forgot_password');
    } else {
      await updateUserTokenById(session.token_id, token);
    }
    await sendForgotPasswordEmail(user.email, 'Forgot password at Saasgear', user.name, token);
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}