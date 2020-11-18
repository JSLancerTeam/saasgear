import { registerUser } from '~/services/authentication/register.service';
import { loginUser } from '~/services/authentication/login.service';
import {
  verifyEmail,
  resendEmailAction,
} from '~/services/authentication/verify-email.service';
import { forgotPasswordUser } from '~/services/authentication/forgot-password.service';
import { resetPasswordUser } from '~/services/authentication/reset-password.service';

const resolvers = {
  Query: {
    profileUser: (_, args, { user }) => user,
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
  },
};

export default resolvers;
