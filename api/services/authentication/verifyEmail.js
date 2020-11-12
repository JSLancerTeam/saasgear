import pkg from 'apollo-server-express';
import {
  findRecordByToken,
  activeUserToken,
} from '~/repository/user_token.repository';
import { activeUser } from '~/repository/user.repository';
import { sendMailToVerifyEmail } from '~/email-template/verifyEmail';

const { ApolloError } = pkg;

function isValidDate(createdAt) {
  const tokenDate = new Date(createdAt);
  const now = new Date().getTime();
  const limitDate = tokenDate.setDate(tokenDate.getDate() + 7);
  return limitDate - now > 0;
}

export async function verifyEmail(token) {
  const record = await findRecordByToken(token);
  if (record) {
    if (isValidDate(record.created_at)) {
      await activeUserToken(record.id);
      await activeUser(record.user_id);
      return {
        verified: true,
      };
    }
    throw new ApolloError('Token has expired');
  } else {
    return {
      verified: false,
    };
  }
}

export async function resendVerifyEmail({ email, name }) {
  try {
    await sendMailToVerifyEmail({
      email: 'tmtzminhtri@gmail.com',
      name,
      subject: 'Resend your email address',
    });
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
}
