import _ from 'lodash';
import { AuthenticationError, ValidationError } from 'apollo-server-express';

import { comparePassword } from '~/helpers/hashing.helper';
import { sign } from '~/helpers/jwt.helper';
import { getUserByEmail } from '~/repository/user.repository';
import { loginValidation } from '~/utils/validations/authenticate.validation';

async function loginUser(email, password) {
  const isValidInput = loginValidation({ email, password });
  if (_.isArray(isValidInput)) {
    throw new ValidationError(isValidInput.map((it) => it.message).join(','), {
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

  const token = sign({
    email: user.email,
    name: user.name,
    createdAt: user.created_at,
  });

  return { token };
}

export { loginUser };
