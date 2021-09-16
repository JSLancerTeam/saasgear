import { combineResolvers } from 'graphql-resolvers';

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

const resolvers = {
  Query: {
    profileUser: combineResolvers(
      isAuthenticated,
      (_, args, { user }) => user,
    ),
    loginBySocial: (_, { provider, code }) => loginSocial(provider, code),
  },
  Mutation: {
    register: async (_, { email, password, name, paymentMethodToken, planName, billingType }, { res }) => {
      const result = await registerUser(normalizeEmail(email), password, name, paymentMethodToken, planName, billingType);
      if (result && result.token) {
        setAuthenticationCookie(res, result.token);
        return true;
      }
      return result;
    },
    login: async (_, { email, password }, { res }) => {
      const result = await loginUser(normalizeEmail(email), password, res);
      if (result && result.token) {
        setAuthenticationCookie(res, result.token);
        return true;
      }
      return result;
    },
    logout: (_, __, { res }) => {
      clearCookie(res, COOKIE_NAME.TOKEN);
      return true;
    },
    forgotPassword: async (_, { email }) => forgotPasswordUser(normalizeEmail(email)),
    changePassword: combineResolvers(
      isAuthenticated,
      (_, { currentPassword, newPassword }, { user }) => changePasswordUser(user.id, currentPassword, newPassword),
    ),
    resetPassword: async (_, { token, password, confirmPassword }) => resetPasswordUser(token, password, confirmPassword),
    verify: (_, { token }) => verifyEmail(token),
    resendEmail: combineResolvers(
      isAuthenticated,
      (_, { type }, { user }) => resendEmailAction(user, normalizeEmail(type)),
    ),
    registerSocialAccount: async (_, { provider, email, name, avatarUrl, providerId }, { res }) => {
      const result = await registerAccountBySocial(provider, normalizeEmail(email), name, avatarUrl, providerId);
      if (result && result.token) {
        setAuthenticationCookie(res, result.token);
        return true;
      }
      return result;
    },
    deleteAccount: combineResolvers(
      isAuthenticated,
      async (_, __, { user }, { res }) => {
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

export default resolvers;
