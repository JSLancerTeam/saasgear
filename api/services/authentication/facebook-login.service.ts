import { AxiosResponse } from 'axios';
import AxiosInstance from '~/utils/axios-instance';
import { findUser, createUser } from '~/repository/user.repository';
import { SOCIAL_PROVIDER } from '~/constants/provider.constant';
import { sign } from '~/helpers/jwt.helper';
import { Token } from './login.service';
import { GetAccessTokenFromFacebookResponse, GetProfileUserFacebookResponse } from './social-login-types/facebook-login';

export async function loginFacebook(code: string): Promise<Token> {
  const response = await getAccessTokenFromFacebook(code);
  const { access_token } = response.data;
  const profileUser = await getProfileUser(access_token);
  const {
    email,
    name,
    id,
    picture: {
      data: { url },
    },
  } = profileUser.data;

  if (email) {
    const userByEmail = await findUser({ email });
    if (userByEmail?.provider === SOCIAL_PROVIDER.facebook && userByEmail?.provider_id === id) {
      return { token: sign({ email, name }) };
    }
  }

  const user = await findUser({ provider_id: id, provider: SOCIAL_PROVIDER.facebook });
  if (user) {
    return { token: sign({ email, name }) };
  }

  await createUser({
    provider: SOCIAL_PROVIDER.facebook,
    email,
    name,
    provider_id: id,
    avatar_url: url,
    is_active: true,
  });
  return { token: sign({ email, name }) };
}

async function getAccessTokenFromFacebook(code: string): Promise<AxiosResponse<GetAccessTokenFromFacebookResponse>> {
  const path = `https://graph.facebook.com/v9.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_KEY}&redirect_uri=${process.env.DOMAIN_FRONTEND}/social/facebook/callback&client_secret=${process.env.FACEBOOK_CLIENT_SECRET_KEY}&code=${code}`;
  return AxiosInstance.get(path);
}

async function getProfileUser(access_token: string): Promise<AxiosResponse<GetProfileUserFacebookResponse>> {
  const fields = encodeURIComponent('id,name,email,picture{url}');
  const path = `https://graph.facebook.com/v9.0/me?fields=${fields}&access_token=${access_token}`;
  return AxiosInstance.get(path);
}
