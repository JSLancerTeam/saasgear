import pkg from 'apollo-server-express';
import dayjs from 'dayjs';
import { findToken, changeTokenStatus, createToken } from '~/repository/user_token.repository';
import { activeUser } from '~/repository/user.repository';
import generateRandomKey from '~/helpers/genarateRandomkey';
import generateTemplateEmail from '~/helpers/generate-template-email';
import sendMail from '~/libs/mail';
import logger from '~/utils/logger';
import { lowerCaseAndTrim } from '~/helpers/string.helper';
import { SEND_MAIL_TYPE } from '~/constants/send-mail-type.constant';

const { ApolloError } = pkg;

function isValidDate(createdAt) {
  return dayjs(createdAt).add(15, 'minute').diff(dayjs()) > 0;
}

export async function verifyEmail(authToken) {
  try {
    const token = await findToken(authToken);

    if (!token || !token.is_active || token.type !== SEND_MAIL_TYPE.VERIFY_EMAIL) {
      throw new ApolloError('Invalid token');
    }

    if (!isValidDate(token.created_at)) {
      throw new ApolloError('Token had expired');
    }

    await Promise.all([changeTokenStatus(token.id, token.type, false), activeUser(token.user_id)]);

    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function resendEmailAction(user, type) {
  try {
    let template;
    let subject;
    const token = await generateRandomKey();
    switch (type) {
      case SEND_MAIL_TYPE.VERIFY_EMAIL:
        if (user.is_active === 1) {
          throw new ApolloError('Account verified');
        }
        subject = 'Resend confirm your email address';
        template = await generateTemplateEmail({
          fileName: 'verifyEmail.mjml',
          data: {
            name: user.name,
            url: `${process.env.FRONTEND_URL}/verify-email?token=${token}`,
          },
        });
        break;

      case SEND_MAIL_TYPE.FORGOT_PASSWORD:
        subject = 'Resend reset password';
        template = await generateTemplateEmail({
          fileName: 'forgotPassword.mjml',
          data: {
            name: user.name,
            url: `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`,
          },
        });
        break;

      default:
        subject = 'Resend confirm your email address';
        template = await generateTemplateEmail({
          fileName: 'verifyEmail.mjml',
          data: {
            name: user.name,
            url: `${process.env.FRONTEND_URL}/verify-email?token=${token}`,
          },
        });
        break;
    }

    await changeTokenStatus(null, type, false);
    await Promise.all([createToken(user.id, token, type), sendMail(lowerCaseAndTrim(user.email), subject, template)]);

    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
