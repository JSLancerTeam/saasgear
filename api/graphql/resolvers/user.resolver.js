import { registerUser } from '../../services/authentication/register.js';
import { loginUser } from '../../services/authentication/login.js';
import { getProfileUserById } from '../../services/user/profileUser.js';
import { verifyEmail, resendVerifyEmail } from '../../services/authentication/verifyEmail.js';

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
	},
};

export default resolvers;
