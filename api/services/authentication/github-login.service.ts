import Apollo from 'apollo-server-express';import { AxiosResponse } from 'axios';
import { findUser, createUser } from '~/repository/user.repository';
import { SOCIAL_PROVIDER } from '~/constants/provider.constant';
import { sign } from '~/helpers/jwt.helper';
import AxiosInstance from '~/utils/axios-instance';
import { Token } from './login.service';
import { AccessTokenFromGithubResponse, GetProfileResponse } from './social-login-types/github-login';

export async function loginGithub(code: string): Promise<Token> {
  const response = await getAccessTokenFromGithub(code);
  if (response.data.error) {
    throw new Apollo.ApolloError(response.data.error_description);
  }
  const { access_token, token_type } = response.data;
  const userInfoResponse = await getProfile(`${token_type} ${access_token}`);
  const { name, email, avatar_url, id } = userInfoResponse.data;

  const user = await findUser({ provider_id: `${id}`, provider: SOCIAL_PROVIDER.github });

  if (user) {
    return {
      token: sign({
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      }),
    };
  }
  await createUser({
    provider: SOCIAL_PROVIDER.github,
    email,
    name,
    provider_id: `${id}`,
    avatar_url,
    is_active: true,
  });
  return { token: sign({ email, name }) };
}

async function getAccessTokenFromGithub(code: string): Promise<AxiosResponse<AccessTokenFromGithubResponse>> {
  const path = 'https://github.com/login/oauth/access_token';
  const data = {
    client_id: process.env.GITHUB_CLIENT_KEY,
    client_secret: process.env.GITHUB_SECRET_KEY,
    code,
  };
  return AxiosInstance.post(path, data);
}

async function getProfile(token: string): Promise<AxiosResponse<GetProfileResponse>> {
  const path = 'https://api.github.com/user';
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return AxiosInstance.get(path, config);
}