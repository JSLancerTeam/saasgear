import Apollo from 'apollo-server-express';
import { findUser, createUser } from '~/repository/user.repository';
import { SOCIAL_PROVIDER } from '~/constants/provider.constant';
import { sign } from '~/helpers/jwt.helper';
import AxiosInstance from '~/utils/axios-instance';

export async function loginGithub(code) {
  if (!code) {
    throw new Apollo.ApolloError('Invalid');
  }
  const response = await getAccessTokenFromGithub(code);
  if (response.data.error) {
    throw new Apollo.ApolloError(response.data.error_description);
  }
  const { access_token, token_type } = response.data;
  const userInfoResponse = await getProfile(`${token_type} ${access_token}`);
  const { name, email, avatar_url, id } = userInfoResponse.data;
  if (email) {
    const userByEmail = await findUser({ email });
    if (userByEmail) {
      return {
        user: {
          name,
          email,
          avatarUrl: avatar_url,
          providerId: id,
          provider: SOCIAL_PROVIDER.github,
        },
      };
    }

    await createUser({
      provider: SOCIAL_PROVIDER.github,
      email,
      name,
      provider_id: id,
      avatar_url,
      is_active: true,
    });
    return { token: sign({ email, name }) };
  }

  const user = await findUser({ provider_id: id });
  if (user) {
    return {
      token: sign({
        email: user.email,
        name: user.name,
        createdAt: user.created_at,
      }),
    };
  }
  return {
    user: {
      name,
      email,
      avatarUrl: avatar_url,
      providerId: id,
      provider: SOCIAL_PROVIDER.github,
    },
  };
}

async function getAccessTokenFromGithub(code) {
  const path = 'https://github.com/login/oauth/access_token';
  const data = {
    client_id: process.env.GITHUB_CLIENT_KEY,
    client_secret: process.env.GITHUB_SECRET_KEY,
    code,
  };
  return AxiosInstance.post(path, data);
}

async function getProfile(token) {
  const path = 'https://api.github.com/user';
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return AxiosInstance.get(path, config);
}
