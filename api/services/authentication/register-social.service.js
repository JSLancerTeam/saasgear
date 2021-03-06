import Apollo from 'apollo-server-express';

import { createUser, findUser } from '~/repository/user.repository';
import generateRandomKey from '~/helpers/genarateRandomkey';
import { createToken } from '~/repository/user_tokens.repository';
import compileEmailTemplate from '~/helpers/compile-email-template';
import sendMail from '~/libs/mail';
import { sign } from '~/helpers/jwt.helper';
import { SEND_MAIL_TYPE } from '~/constants/send-mail-type.constant';

export async function registerAccountBySocial(provider, email, name, avatarUrl, providerId) {
  const existEmail = await findUser({ email });
  if (existEmail) {
    throw new Apollo.ApolloError('Email address has been used');
  }

  const userId = await createUser({
    provider: provider.toLowerCase(),
    provider_id: providerId,
    name,
    avatar_url: avatarUrl,
    email,
  });
  const tokenVerifyEmail = await generateRandomKey();

  const template = await compileEmailTemplate({
    fileName: 'verifyEmail.mjml',
    data: {
      name,
      url: `${process.env.FRONTEND_URL}/verify-email?token=${tokenVerifyEmail}`,
    },
  });

  await Promise.all([sendMail(email, 'Confirm your email address', template), createToken(userId, tokenVerifyEmail, SEND_MAIL_TYPE.VERIFY_EMAIL)]);

  return {
    token: sign({
      email,
      name,
    }),
  };
}
