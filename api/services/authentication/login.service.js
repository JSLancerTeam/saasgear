import _ from 'lodash';
import pkg from 'apollo-server-express';

import { comparePassword } from '~/helpers/hashing.helper';
import { sign } from '~/helpers/jwt.helper';
import { getUserByEmail } from '~/repository/user.repository';
import { loginValidation } from '~/utils/validations/authenticate.validation';

const { AuthenticationError, ValidationError } = pkg;

async function loginUser(email, password) {
  const validResult = loginValidation({ email, password });
  if (_.isArray(validResult)) {
    throw new ValidationError(validResult.map((it) => it.message).join(','), {
      invalidArgs: validResult.map((it) => it.field).join(','),
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
