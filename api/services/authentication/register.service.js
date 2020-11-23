import pkg from 'apollo-server-express';

import { findUser, createUser } from '~/repository/user.repository';
import { createToken } from '~/repository/user_token.repository';
import { generatePassword } from '~/helpers/hashing.helper';
import generateTemplateEmail from '~/helpers/generate-template-email';
import generateRandomKey from '~/helpers/genarateRandomkey';
import sendMail from '~/libs/mail';
import { registerValidation } from '~/utils/validations/authenticate.validation';
import { createUserPlan } from '~/services/user/plans-user.service';
import { addMultiPermissions } from '~/services/user/permission.service';
import { BILLING_PRICE } from '~/constants/billing.constant';
import logger from '~/utils/logger';
import { sign } from '~/helpers/jwt.helper';

const { ValidationError, ApolloError } = pkg;

async function registerUser(email, password, name, planName, billingType) {
  const validateResult = registerValidation({ email, password, name });
  if (validateResult.length) {
    throw new ValidationError(
      validateResult.map((it) => it.message).join(','),
      {
        invalidArgs: validateResult.map((it) => it.field).join(','),
      },
    );
  }

  try {
    const user = await findUser({ email });
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

    const token = sign({
      email,
      name,
    });

    if (planName) {
      const { price, permissions } = BILLING_PRICE[planName];
      await createUserPlan(newUserId, planName, price, billingType);
      await addMultiPermissions(newUserId, permissions);
    }

    const template = generateTemplateEmail({
      fileName: 'verifyEmail.mjml',
      data: {
        name,
        url: `${process.env.FRONTEND_URL}/verify-email?token=${tokenVerifyEmail}`,
      },
    });

    await Promise.all([
      sendMail(email, 'Confirm your email address', template),
      createToken(newUserId, tokenVerifyEmail, 'verify_email'),
    ]);
    return { token };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export { registerUser };
