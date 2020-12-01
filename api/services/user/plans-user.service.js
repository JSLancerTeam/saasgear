import Apollo from 'apollo-server-express';

import logger from '~/utils/logger';
import {
  deleteUserPlanById,
  getUserPlanById,
  getUserPlanByUserId,
  insertUserPlan,
  updateUserPlanById,
} from '~/repository/user_plans.repository';
import { cancelSubcription, createNewSubcription, updateSubcription } from '~/services/stripe/subcription.service';
import { findProductAndPriceByType } from '~/repository/products.repository';
import { findUser } from '~/repository/user.repository';

const { ApolloError } = Apollo;
export function getUserPlan(userId) {
  return getUserPlanByUserId(userId);
}

export async function createUserPlan(userId, paymentMethodToken, planName, billingType) {
  try {
    const user = await findUser({ id: userId });
    if (!user) {
      throw new ApolloError('Can not find any user');
    }

    const product = await findProductAndPriceByType(planName, billingType);
    if (!product) {
      throw new ApolloError('Can not find any plan');
    }

    const subscriptionId = await createNewSubcription(paymentMethodToken, user.email, user.name, product.price_stripe_id);
    const dataUserPlan = {
      user_id: userId,
      product_id: product.id,
      price_id: product.price_id,
      subcription_id: subscriptionId,
    };
    await insertUserPlan(dataUserPlan);

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function updateUserPlan(usePlanId, planName, billingType) {
  try {
    const userPlan = await getUserPlanById(usePlanId);
    if (!userPlan) {
      throw new ApolloError('Can not find any user plan');
    }

    const product = await findProductAndPriceByType(planName, billingType);
    if (!product) {
      throw new ApolloError('Can not find any plan');
    }

    await updateSubcription(userPlan.subcription_id, product.price_stripe_id);

    const dataUserPlan = {
      product_id: product.id,
      price_id: product.price_id,
    };
    await updateUserPlanById(usePlanId, dataUserPlan);

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function deleteUserPlan(id) {
  try {
    const userPlan = await getUserPlanById(id);
    if (!userPlan) {
      throw new ApolloError('Can not find any user plan');
    }

    await cancelSubcription(userPlan.subcription_id);
    await deleteUserPlanById(id);

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
