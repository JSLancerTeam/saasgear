import {
  ApolloError,
  ValidationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-express';
import dayjs from 'dayjs';
import { updateUser } from '~/repository/user.repository';
import { generatePassword } from '~/helpers/hashing.helper';
import { findToken, removeUserToken } from '~/repository/user_tokens.repository';
import logger from '~/utils/logger';
import { changePasswordValidation } from '~/utils/validations/authenticate.validation';

export async function resetPasswordUser(token, password, confirmPassword) {
  try {
    const validateResult = changePasswordValidation({ password });
    if (validateResult.length) {
      return new UserInputError(
        validateResult.map((it) => it.message).join(','),
        {
          invalidArgs: validateResult.map((it) => it.field).join(','),
        },
      );
    }
    if (password !== confirmPassword) {
      return new ValidationError('Password and confirm password do not match');
    }
    const session = await findToken(token);
    if (!session || !session.id) {
      return new ApolloError('Session not found');
    }
    if (dayjs(session.updated_at).add(15, 'm').diff(dayjs()) < 0) {
      return new ForbiddenError('Session expired');
    }
    const [newPassword] = await Promise.all([
      generatePassword(password),
      removeUserToken(session.id),
    ]);
    await updateUser(session.user_id, { password: newPassword });
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
