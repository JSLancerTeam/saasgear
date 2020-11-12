import { registerUser } from '../../services/authentication/register.js';
import { loginUser } from '../../services/authentication/login.js';
import { getProfileUserById } from '../../services/user/profileUser.js';
import { verifyEmail, resendVerifyEmail } from '../../services/authentication/verifyEmail.js';
import { forgotPasswordUser } from '../../services/authentication/forgotPassword.js';
import { resetPasswordUser } from '../../services/authentication/resetPassword.js';

const resolvers = {
	Query: {
		profileUser: (_, args, { user }) => {
			return getProfileUserById(user.id);
		},
		verify: (_, { token }) => {
			return verifyEmail(token);
		},
		resendEmail: (_, args, { user }) => {
			return resendVerifyEmail(user);
		},
	},
	Mutation: {
		register: function (_, { email, password, name }) {
			return registerUser(email, password, name);
		},
		login: function (_, { email, password }) {
			return loginUser(email, password);
		},
		forgotPassword: async (_, { email }) => {
      return forgotPasswordUser(email);
		},
		resetPassword: async (_, { token, password, confirmPassword }) => {
      return resetPasswordUser(token, password, confirmPassword);
    },
	},
};

export default resolvers;
