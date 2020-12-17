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
import { normalizeEmail } from '~/helpers/string.helper';

const resolvers = {
  Query: {
    profileUser: combineResolvers(
      isAuthenticated,
      (_, args, { user }) => user,
    ),
    loginBySocial: (_, { provider, code }) => loginSocial(provider, code),
  },
  Mutation: {
    register(_, { email, password, name, paymentMethodToken, planName, billingType }) {
      return registerUser(normalizeEmail(email), password, name, paymentMethodToken, planName, billingType);
    },
    login(_, { email, password }) {
      return loginUser(normalizeEmail(email), password);
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
    registerSocialAccount: (_, { provider, email, name, avatarUrl, providerId }) => registerAccountBySocial(provider, normalizeEmail(email), name, avatarUrl, providerId),
    deleteAccount: combineResolvers(
      isAuthenticated,
      (_, a, { user }) => deleteUser(user),
    ),
  },
};

export default resolvers;
