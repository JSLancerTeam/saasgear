import { SOCIAL_PROVIDER } from '~/constants/provider.constant';
import { loginGithub } from './github-login.service';
import { loginFacebook } from './facebook-login.service';

export async function loginSocial(provider, code) {
  let result = null;
  switch (provider) {
    case SOCIAL_PROVIDER.github.toUpperCase():
      result = await loginGithub(code);
      break;
    case SOCIAL_PROVIDER.facebook.toUpperCase():
      result = await loginFacebook(code);
      break;
    default:
      break;
  }
  return result;
}
