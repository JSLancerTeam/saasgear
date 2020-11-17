import pkg from 'apollo-server-express';
import _ from 'lodash';

import { getUserByEmail, createUser } from '~/repository/user.repository';
import { createUserTokenByUser } from '~/repository/user_token.repository';
import { generatePassword } from '~/helpers/hashing.helper';
import { sendMailToVerifyEmail } from '~/email-template/verifyEmail';
import generateRandomKey from '~/helpers/genarateRandomkey';
import { registerValidation } from '~/utils/validations/authenticate.validation';
import { createUserPlan } from '~/services/user/plans-user.service';
import { addMultiPermissions } from '~/services/user/permission.service';
import { BILLING_PRICE } from '~/constants/billing.constant';

const { ValidationError, ApolloError } = pkg;

async function registerUser(email, password, name, planName, billingType) {
  const isValidInput = registerValidation({ email, password, name });
  if (_.isArray(isValidInput)) {
    throw new ValidationError(isValidInput.map((it) => it.message).join(','), {
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

    if (planName) {
      const { price, permissions } = BILLING_PRICE[planName];
      await createUserPlan(newUserId, planName, price, billingType);
      await addMultiPermissions(newUserId, permissions);
    }

    await Promise.all([
      sendMailToVerifyEmail({
        email: 'tmtzminhtri@gmail.com',
        subject: 'Confirm your email address',
        name,
        token: tokenVerifyEmail,
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
