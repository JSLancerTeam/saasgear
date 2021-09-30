import Apollo from 'apollo-server-express';
import url from 'url';
import { findUser, createUser } from '~/repository/user.repository';
import AxiosInstance from '~/utils/axios-instance';
import { SOCIAL_PROVIDER } from '~/constants/provider.constant';
import { sign } from '~/helpers/jwt.helper';
import { Token } from './login.service';
import { AxiosResponse } from 'axios';
import { GetAccessTokenFromGoogleResponse, GetUserInfoResponse } from './social-login-types/google-login';

export async function loginGoogle(code: string): Promise<Token> {
  const response = await getAccessTokenFromGoogle(code);
  if (response.data.error) {
    throw new Apollo.ApolloError(response.data.error_description);
  }
  const { access_token, token_type } = response.data;
  const userInfo = await getUserInfo(`${token_type} ${access_token}`);
  const { id, name, email, picture } = userInfo.data;

  const user = await findUser({ provider_id: id, provider: SOCIAL_PROVIDER.google });
  if (user) return { token: sign({ email, name }) };

  const userByEmail = await findUser({ email });
  if (userByEmail) {
    if (userByEmail?.provider === SOCIAL_PROVIDER.google && parseInt(userByEmail?.provider_id, 10) === Number(id)) {
      return { token: sign({ email, name }) };
    }
  }

  await createUser({
    provider: SOCIAL_PROVIDER.google,
    email,
    name,
    provider_id: id,
    avatar_url: picture,
    is_active: true,
  });
  return { token: sign({ email, name }) };
}

async function getAccessTokenFromGoogle(code: string): Promise<AxiosResponse<GetAccessTokenFromGoogleResponse>> {
  const path = 'https://oauth2.googleapis.com/token';
  const data = {
    client_id: process.env.GOOGLE_CLIENT_KEY,
    client_secret: process.env.GOOGLE_SECRET_KEY,
    code,
    redirect_uri: `${process.env.FRONTEND_URL}/social/google/callback`,
    grant_type: 'authorization_code',
  };
  const params = new url.URLSearchParams(data);

  return AxiosInstance.post(path, params.toString(), {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
}

async function getUserInfo(token: string): Promise<AxiosResponse<GetUserInfoResponse>> {
  const path = 'https://www.googleapis.com/userinfo/v2/me';
  return AxiosInstance.get(path, {
    headers: {
      Authorization: token,
    },
  });
}
