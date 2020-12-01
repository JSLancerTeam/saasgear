import pkg from 'apollo-server-express';

import { findUser, createUser } from '~/repository/user.repository';
import { createToken } from '~/repository/user_tokens.repository';
import { generatePassword } from '~/helpers/hashing.helper';
import compileEmailTemplate from '~/helpers/compile-email-template';
import generateRandomKey from '~/helpers/genarateRandomkey';
import sendMail from '~/libs/mail';
import { registerValidation } from '~/utils/validations/authenticate.validation';
import logger from '~/utils/logger';
import { sign } from '~/helpers/jwt.helper';
import { findProductAndPriceByType } from '~/repository/products.repository';
import { createNewSubcription } from '~/services/stripe/subcription.service';
import { addMultiPermissions } from '~/services/user/permission.service';
import { PERMISSION_PLAN } from '~/constants/billing.constant';
import { SEND_MAIL_TYPE } from '~/constants/send-mail-type.constant';

const { ValidationError, ApolloError } = pkg;

async function registerUser(email, password, name, paymentMethodToken, planName, billingType) {
  const validateResult = registerValidation({ email, password, name });
  if (validateResult.length) {
    throw new ValidationError(validateResult.map((it) => it.message).join(','), {
      invalidArgs: validateResult.map((it) => it.field).join(','),
    });
  }

  try {
    const user = await findUser({ email });
    if (user && user.is_active) {
      return new ApolloError('Email address has been used');
    }

    if (user && !user.is_active) {
      return new ApolloError('Your account is not yet verify');
    }

    const passwordHashed = await generatePassword(password);
    const userData = {
      email,
      password: passwordHashed,
      name,
    };
    let newUserId = null;

    if (planName) {
      const product = await findProductAndPriceByType(planName, billingType);
      if (!product) {
        return new ApolloError('Can not find any plan');
      }

      const subscriptionId = await createNewSubcription(paymentMethodToken, email, name, product.price_stripe_id);

      if (subscriptionId) {
        const userPlanData = {
          product_id: product.id,
          price_id: product.price_id,
          subcription_id: subscriptionId,
        };
        newUserId = await createUser(userData, userPlanData);
      }
    } else {
      newUserId = await createUser(userData);
    }

    const tokenVerifyEmail = await generateRandomKey();
    const template = await compileEmailTemplate({
      fileName: 'verifyEmail.mjml',
      data: {
        name,
        url: `${process.env.FRONTEND_URL}/verify-email?token=${tokenVerifyEmail}`,
      },
    });

    const pms = [
      sendMail(email, 'Confirm your email address', template),
      createToken(newUserId, tokenVerifyEmail, SEND_MAIL_TYPE.VERIFY_EMAIL),
    ];
    if (planName && PERMISSION_PLAN[planName]) {
      pms.push(addMultiPermissions(newUserId, PERMISSION_PLAN[planName]));
    }

    await Promise.all(pms);

    const token = sign({ email, name });
    return { token };
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export { registerUser };
