import pkg from 'apollo-server-express';
import {
  getUserByEmail,
  getUserByIdAndJoinUserToken,
} from '~/repository/user.repository';
import generateRandomKey from '~/helpers/genarateRandomkey';
import {
  createToken,
  updateUserTokenById,
} from '~/repository/user_token.repository';
import logger from '~/utils/logger';
import sendMail from '~/libs/mail';
import generateTemplateEmail from '~/helpers/generate-template-email';

const { ApolloError } = pkg;

export async function forgotPasswordUser(email) {
  try {
    const user = await getUserByEmail(email);
    if (!user || !user.id) {
      throw new ApolloError('Can not find any user');
    }
    const session = await getUserByIdAndJoinUserToken(
      user.id,
      'forgot_password',
    );
    const tokenGenerated = await generateRandomKey();
    const token = `${tokenGenerated}-${user.id}`;
    if (!session) {
      await createToken(user.id, token, 'forgot_password');
    } else {
      await updateUserTokenById(session.id, token);
    }

    const template = generateTemplateEmail({
      fileName: 'forgotPassword.mjml',
      data: {
        name: session.name,
        url: `${process.env.FRONTEND_URL}/auth/reset-password?&token=${token}`,
      },
    });

    await sendMail(session.email, ' Reset Password from SAASGEAR', template);
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
