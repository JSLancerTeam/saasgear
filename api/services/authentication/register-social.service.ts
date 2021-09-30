import Apollo from 'apollo-server-express';

import { createUser, findUser } from '~/repository/user.repository';
import generateRandomKey from '~/helpers/genarateRandomkey';
import { createToken } from '~/repository/user_tokens.repository';
import compileEmailTemplate from '~/helpers/compile-email-template';
import sendMail from '~/libs/mail';
import { sign } from '~/helpers/jwt.helper';
import { SEND_MAIL_TYPE } from '~/constants/send-mail-type.constant';
import { Token } from './login.service';

type Provider = 'GITHUB' | 'FACEBOOK' | 'GOOGLE';

type ProviderLower = Lowercase<Provider>;

export async function registerAccountBySocial(provider: Provider, email: string, name: string, avatarUrl: string, providerId: string): Promise<Token> {
  const existEmail = await findUser({ email });
  if (existEmail) {
    throw new Apollo.ApolloError('Email address has been used');
  }

  const userId = await createUser({
    provider: <ProviderLower>provider.toLowerCase(),
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

  if (typeof userId === 'number') {
    await Promise.all([sendMail(email, 'Confirm your email address', template), createToken(userId, tokenVerifyEmail, SEND_MAIL_TYPE.VERIFY_EMAIL)]);
  }

  return {
    token: sign({
      email,
      name,
    }),
  };
}
