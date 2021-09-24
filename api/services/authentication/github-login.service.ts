import Apollo from 'apollo-server-express';
import { AxiosResponse } from 'axios';
import { findUser, createUser } from '~/repository/user.repository';
import { SOCIAL_PROVIDER } from '~/constants/provider.constant';
import { sign } from '~/helpers/jwt.helper';
import AxiosInstance from '~/utils/axios-instance';

type UserGithub = {
  user: {
    name?: string;
    email?: string;
    avatarUrl?: string;
    providerId?: string;
    provider: 'github';
  }
}

export type SocialToken = {
  token: string;
}

type AccessTokenFromGithubResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  error: Error;
  error_description: string;
}

// type AccessTokenFromGithubResponseError = {
//   error: Error;
//   error_description: string;
// }

type GetProfileResponse = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: string | null; //
  bio: string | null; //
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  }
}

export async function loginGithub(code: string): Promise<UserGithub | SocialToken> {
  const response = await getAccessTokenFromGithub(code);
  if (response.data.error) {
    throw new Apollo.ApolloError(response.data.error_description);
  }
  const { access_token, token_type } = response.data;
  const userInfoResponse = await getProfile(`${token_type} ${access_token}`);
  const { name, email, avatar_url, id } = userInfoResponse.data;

  const user = await findUser({ provider_id: `${id}`, provider: SOCIAL_PROVIDER.github });

  if (user) {
    if (!email || (email && user.email === email)) {
      return {
        user: {
          name,
          email,
          avatarUrl: avatar_url,
          providerId: `${id}`,
          provider: SOCIAL_PROVIDER.github,
        },
      };
    }
    return {
      token: sign({
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      }),
    };
  }
  if (!email) {
    return {
      user: {
        name,
        email,
        avatarUrl: avatar_url,
        providerId: `${id}`,
        provider: SOCIAL_PROVIDER.github,
      },
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
