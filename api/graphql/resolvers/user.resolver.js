import { registerUser } from '../../services/authentication/register.js';
import { loginUser } from '../../services/authentication/login.js';
import { getProfileUserById } from '../../services/user/profileUser.js';
import { verifyEmail } from '../../services/authentication/verifyEmail.js';

const resolvers = {
	Query: {
		profileUser: (_, { id }) => {
			return getProfileUserById(id);
		},
		verify: (_, { token }) => {
			return verifyEmail(token);
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
