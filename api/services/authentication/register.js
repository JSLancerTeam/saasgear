import pkg from 'apollo-server-express';
import _ from 'lodash';
import Validator from 'fastest-validator';

import { getUserByEmail, createUser } from '~/repository/user.repository';
import { createUserTokenByUser } from '~/repository/user_token.repository';
import { generatePassword } from '~/helpers/hashing.helper';
import { sendMailToVerifyEmail } from '~/email-template/verifyEmail';
import generateRandomKey from '~/helpers/genarateRandomkey';

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
    throw new UserInputError('password is required', {
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

  try {
    const user = await getUserByEmail(email);
    if (user && user.is_active) {
      throw new ApolloError('Email address has been used');
    } else if (user && !user.is_active) {
      throw new ApolloError('Your account is not yet verify');
    }

    const passwordHashed = await generatePassword(password);
    const tokenVerifyEmail = await generateRandomKey();
    const newUserId = await createUser({
      email,
      password: passwordHashed,
      name,
    });

    await Promise.all([
      sendMailToVerifyEmail({
        email: 'tmtzminhtri@gmail.com',
        subject: 'Confirm your email address',
        name,
        token: tokenVerifyEmail,
        url: 'http://localhost:3001',
      }),
      createUserTokenByUser(newUserId, tokenVerifyEmail, 'verify_email'),
    ]);
    return { token: null, verified: false };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { registerUser };
