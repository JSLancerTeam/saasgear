import Apollo from 'apollo-server-express';

import { createUser, findUser } from '~/repository/user.repository';
import generateRandomKey from '~/helpers/genarateRandomkey';
import generateTemplateEmail from '~/helpers/generate-template-email';
import { createToken } from '~/repository/user_token.repository';
import sendMail from '~/libs/mail';
import { sign } from '~/helpers/jwt.helper';

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

  const template = generateTemplateEmail({
    fileName: 'verifyEmail.mjml',
    data: {
      name,
      url: `${process.env.FRONTEND_URL}/verify-email?token=${tokenVerifyEmail}`,
    },
  });

  sendMail(email, 'Confirm your email address', template);
  await createToken(userId, tokenVerifyEmail, 'verify_email');

  return {
    token: sign({
      email,
      name,
    }),
  };
}
