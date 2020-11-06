import pkg from 'apollo-server-express';
import _ from 'lodash';
import Validator from 'fastest-validator';

import User, { getUserByEmail } from '../../repository/user.repository.js';
import { generatePassword } from '../../helpers/hashing.helper.js';
import { sign } from '../../helpers/jwt.helper.js';

const { UserInputError, ApolloError } = pkg;

function registerValidation(data) {
	const validator = new Validator();
	const schema = {
		email: { type: 'email' },
		password: { type: 'string', min: 6 },
		name: { type: 'string', empty: false },
	};
	return validator.validate(data, schema);
}
async function registerUser(email, password, name) {
	if (_.isUndefined(email)) {
		throw new UserInputError('email is required', {
			invalidArgs: 'email',
		});
	}
	if (_.isUndefined(password)) {
		throw new UserInputError('email is required', {
			invalidArgs: 'email',
		});
	}
	if (_.isUndefined(name)) {
		throw new UserInputError('name is required', {
			invalidArgs: 'name',
		});
	}

	const isValidInput = registerValidation({ email, password, name });
	if (_.isArray(isValidInput)) {
		throw new UserInputError(isValidInput.map((it) => it.message).join(','), {
			invalidArgs: isValidInput.map((it) => it.field).join(','),
		});
	}

	const user = await getUserByEmail(email);
	if (user) {
		throw new ApolloError('Email address has been used');
	}
	const passwordHashed = await generatePassword(password);
	const newUserId = await User.create({ email, password: passwordHashed, name });
	const token = sign({ id: newUserId });

	return { token };
}

export { registerUser };
