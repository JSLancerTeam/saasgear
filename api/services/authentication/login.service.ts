import { ValidationError, AuthenticationError } from 'apollo-server-express';
import { Response } from 'express';
import { comparePassword } from '~/helpers/hashing.helper';
import { sign } from '~/helpers/jwt.helper';
import { findUser } from '~/repository/user.repository';
import { loginValidation } from '~/validations/authenticate.validation';
import { clearCookie, COOKIE_NAME } from '~/utils/cookie';

export type Token = {
  token: string;
};

export async function loginUser(email: string, password: string, res: Response): Promise<ValidationError | AuthenticationError | Token> {
  const validateResult = loginValidation({ email, password });
  if (Array.isArray(validateResult) && validateResult.length) {
    return new ValidationError(
      validateResult.map((it) => it.message).join(','),
    );
  }
  const user = await findUser({ email });
  if (!user) {
    clearCookie(res, COOKIE_NAME.TOKEN);
    return new AuthenticationError('Invalid email or password');
  }

  const matchPassword = await comparePassword(password, user.password);
  if (!matchPassword) {
    clearCookie(res, COOKIE_NAME.TOKEN);
    return new AuthenticationError('Invalid email or password');
  }
  return {
    token: sign({
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    }),
  };
}
