import { registerUser } from '../../services/authentication/register.js';
import { loginUser } from '../../services/authentication/login.js';
import { getProfileUserById } from '../../services/user/profileUser.js';

const resolvers = {
	Query: {
		profileUser: (_, { id }) => {
			return getProfileUserById(id);
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
