import { combineResolvers } from 'graphql-resolvers';

import { Response } from 'express';
import { isAuthenticated } from './authorization.resolver';
import { registerUser } from '~/services/authentication/register.service';
import { loginUser } from '~/services/authentication/login.service';
import { verifyEmail, resendEmailAction } from '~/services/authentication/verify-email.service';
import { forgotPasswordUser } from '~/services/authentication/forgot-password.service';
import { resetPasswordUser } from '~/services/authentication/reset-password.service';
import { changePasswordUser } from '~/services/authentication/change-password.service';
import { loginSocial } from '~/services/authentication/social-login.service';
import { registerAccountBySocial } from '~/services/authentication/register-social.service';
import { deleteUser } from '~/services/user/delete-user.service';
import { updateProfile, changeUserAvatar } from '~/services/user/update-user.service';
import { normalizeEmail } from '~/helpers/string.helper';
import { clearCookie, COOKIE_NAME, setAuthenticationCookie } from '~/utils/cookie';

type Res = {
  res: Response;
}

type Provider = {
  provider: 'GITHUB' | 'FACEBOOK' | 'GOOGLE';
}

type LoginBySocial = Provider & {
  code: string;
}

type Register = {
  email: string;
  password: string;
  name: string;
  paymentMethodToken: string;
  planName: string;
  billingType: 'MONTHLY' | 'YEARLY';
}

type Login = {
  email: string;
  password: string;
}

type ForgotPassword = {
  email: string;
}

type ResetPassword = {
  token: string;
  password: string;
  confirmPassword: string;
}

type Verify = {
  token: string;
}

type RegisterSocialAccount = Provider & {
  email: string;
  name: string;
  avatarUrl: string;
  providerId: string;
}

const resolvers = {
  Query: {
    profileUser: combineResolvers(
      isAuthenticated,
      (_, args, { user }) => user,
    ),
    loginBySocial: (_: unknown, { provider, code }: LoginBySocial) => loginSocial(provider, code),
  },
  Mutation: {
    register: async (_: unknown, { email, password, name, paymentMethodToken, planName, billingType } : Register, { res }: Res) => {
      const result = await registerUser(normalizeEmail(email), password, name, paymentMethodToken, planName, billingType);
      if (result && result.token) {
        setAuthenticationCookie(res, result.token);
        return true;
      }
      return result;
    },
    login: async (_: unknown, { email, password }: Login, { res }: Res) => {
      const result = await loginUser(normalizeEmail(email), password, res);
      if (result && result.token) {
        setAuthenticationCookie(res, result.token);
        return true;
      }
      return result;
    },
    logout: (_: unknown, __: unknown, { res }: Res) => {
      clearCookie(res, COOKIE_NAME.TOKEN);
      return true;
    },
    forgotPassword: async (_: unknown, { email }: ForgotPassword) => forgotPasswordUser(normalizeEmail(email)),
    changePassword: combineResolvers(
      isAuthenticated,
      (_, { currentPassword, newPassword }, { user }) => changePasswordUser(user.id, currentPassword, newPassword),
    ),
    resetPassword: async (_: unknown, { token, password, confirmPassword }: ResetPassword) => resetPasswordUser(token, password, confirmPassword),
    verify: (_: unknown, { token }: Verify) => verifyEmail(token),
    resendEmail: combineResolvers(
      isAuthenticated,
      (_, { type }, { user }) => resendEmailAction(user, <'verify_email' | 'forgot_password'>normalizeEmail(type)),
    ),
    registerSocialAccount: async (_: unknown, { provider, email, name, avatarUrl, providerId }: RegisterSocialAccount, { res }: Res) => {
      const result = await registerAccountBySocial(provider, normalizeEmail(email), name, avatarUrl, providerId);
      if (result && result.token) {
        setAuthenticationCookie(res, result.token);
        return true;
      }
      return result;
    },
    deleteAccount: combineResolvers(
      isAuthenticated,
      async (_, __, { user, res }) => {
        const result = await deleteUser(user);
        if (result === true) {
          clearCookie(res, COOKIE_NAME.TOKEN);
        }
        return result;
      },
    ),
    updateProfile: combineResolvers(
      isAuthenticated,
      (_, { name, company, position }, { user }) => updateProfile(user.id, name, company, position),
    ),
    updateProfileAvatar: combineResolvers(
      isAuthenticated,
      (_, { file }, { user }) => changeUserAvatar(file, user),
    ),
  },
};

export type { LoginBySocial };

export default resolvers;
