import _ from 'lodash';
import pkg from 'apollo-server-express';
import Validator from 'fastest-validator';

import { comparePassword } from '~/helpers/hashing.helper';
import { sign } from '~/helpers/jwt.helper';
import { getUserByEmail } from '~/repository/user.repository';

const { AuthenticationError, UserInputError } = pkg;

function loginValidation(data) {
  const validator = new Validator();
  const schema = {
    email: { type: 'email' },
    password: { type: 'string', min: 6 },
  };
  return validator.validate(data, schema);
}

async function loginUser(email, password) {
  if (_.isUndefined(email)) {
    throw new UserInputError('email is required', {
      invalidArgs: 'email',
    });
  }
  if (_.isUndefined(password)) {
    throw new UserInputError('password is required', {
      invalidArgs: 'password',
    });
  }
  const isValidInput = loginValidation({ email, password });
  if (_.isArray(isValidInput)) {
    throw new UserInputError(isValidInput.map((it) => it.message).join(','), {
      invalidArgs: isValidInput.map((it) => it.field).join(','),
    });
  }

  const user = await getUserByEmail(email);
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  const matchPassword = await comparePassword(password, user.password);
  if (!matchPassword) {
    throw new AuthenticationError('Invalid email or password');
  }

  const token = sign({ id: user.id });

  return { token };
}

export { loginUser };
