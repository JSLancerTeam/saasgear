import { registerUser } from '~/services/authentication/register';
import { loginUser } from '~/services/authentication/login';
import { getProfileUserById } from '~/services/user/profileUser';
import {
  verifyEmail,
  resendVerifyEmail,
} from '~/services/authentication/verifyEmail';
import { forgotPasswordUser } from '~/services/authentication/forgotPassword';
import { resetPasswordUser } from '~/services/authentication/resetPassword';

const resolvers = {
  Query: {
    profileUser: (_, args, { user }) => getProfileUserById(user.id),
    verify: (_, { token }) => verifyEmail(token),
    resendEmail: (_, args, { user }) => resendVerifyEmail(user),
  },
  Mutation: {
    register(_, { email, password, name }) {
      return registerUser(email, password, name);
    },
    login(_, { email, password }) {
      return loginUser(email, password);
    },
    forgotPassword: async (_, { email }) => forgotPasswordUser(email),
    resetPassword: async (_, { token, password, confirmPassword }) =>
      resetPasswordUser(token, password, confirmPassword),
  },
};

export default resolvers;
