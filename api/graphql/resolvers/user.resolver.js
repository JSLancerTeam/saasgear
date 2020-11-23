import { registerUser } from '~/services/authentication/register.service';
import { loginUser } from '~/services/authentication/login.service';
import {
  verifyEmail,
  resendEmailAction,
} from '~/services/authentication/verify-email.service';
import { forgotPasswordUser } from '~/services/authentication/forgot-password.service';
import { resetPasswordUser } from '~/services/authentication/reset-password.service';
import { loginGithub } from '~/services/authentication/github-login.service';
import { registerAccountByGithub } from '~/services/authentication/register-social.service';

const resolvers = {
  Query: {
    profileUser: (_, args, { user }) => user,
    loginByGithub: (_, { code }) => loginGithub(code),
  },
  Mutation: {
    register(_, { email, password, name, planName, billingType }) {
      return registerUser(email, password, name, planName, billingType);
    },
    login(_, { email, password }) {
      return loginUser(email, password);
    },
    forgotPassword: async (_, { email }) => forgotPasswordUser(email),
    resetPassword: async (_, { token, password, confirmPassword }) =>
      resetPasswordUser(token, password, confirmPassword),
    verify: (_, { token }) => verifyEmail(token),
    resendEmail: (_, { type }, { user }) =>
      resendEmailAction(user, type.toLowerCase()),
    registerSocialAccount: (
      _,
      { provider, email, name, avatarUrl, providerId },
    ) => registerAccountByGithub(provider, email, name, avatarUrl, providerId),
  },
};

export default resolvers;
