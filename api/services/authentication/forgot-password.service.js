import pkg from 'apollo-server-express';
import { findUser, getUserByIdAndJoinUserToken } from '~/repository/user.repository';
import generateRandomKey from '~/helpers/genarateRandomkey';
import {
  createToken,
  updateUserTokenById,
} from '~/repository/user_tokens.repository';
import logger from '~/utils/logger';
import sendMail from '~/libs/mail';
import compileEmailTemplate from '~/helpers/compile-email-template';
import { SEND_MAIL_TYPE } from '~/constants/send-mail-type.constant';

export async function forgotPasswordUser(email) {
  try {
    const user = await findUser({ email });
    if (!user || !user.id) {
      return new ApolloError('Can not find any user');
    }
    const session = await getUserByIdAndJoinUserToken(user.id, SEND_MAIL_TYPE.FORGOT_PASSWORD);
    const tokenGenerated = await generateRandomKey();
    const token = `${tokenGenerated}-${user.id}`;
    if (!session) {
      await createToken(user.id, token, SEND_MAIL_TYPE.FORGOT_PASSWORD);
    } else {
      await updateUserTokenById(session.id, token);
    }

    const template = await compileEmailTemplate({
      fileName: 'forgotPassword.mjml',
      data: {
        name: session.name,
        url: `${process.env.FRONTEND_URL}/auth/reset-password?&token=${token}`,
      },
    });

    await sendMail(session.email, ' Reset Password from SaaSgear', template);
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError(error);
  }
}
