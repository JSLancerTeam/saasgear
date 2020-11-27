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

const resolvers = {
  Query: {
    profileUser: (_, args, { user }) => user,
    loginBySocial: (_, { provider, code }) => loginSocial(provider, code),
  },
  Mutation: {
    register(_, { email, password, name, paymentMethodToken, planName, billingType }) {
      return registerUser(email, password, name, paymentMethodToken, planName, billingType);
    },
    login(_, { email, password }) {
      return loginUser(email, password);
    },
    forgotPassword: async (_, { email }) => forgotPasswordUser(email),
    changePassword: combineResolvers(
      isAuthenticated,
      (_, { currentPassword, newPassword }, { user }) => changePasswordUser(user.id, currentPassword, newPassword),
    ),
    resetPassword: async (_, { token, password, confirmPassword }) => resetPasswordUser(token, password, confirmPassword),
    verify: (_, { token }) => verifyEmail(token),
    resendEmail: (_, { type }, { user }) => resendEmailAction(user, type.toLowerCase()),
    registerSocialAccount: (_, { provider, email, name, avatarUrl, providerId }) => registerAccountBySocial(provider, email, name, avatarUrl, providerId),
  },
};

export default resolvers;
