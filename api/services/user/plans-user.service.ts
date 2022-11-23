import { ApolloError } from 'apollo-server-express';
import dayjs from 'dayjs';

import logger from '~/utils/logger';
import {
  deleteUserPlanById,
  getUserPlanByCustomerId,
  getUserPlanById,
  getUserPlanByUserId,
  insertUserPlan,
  updateUserPlanById,
  UserPlanData,
  GetUserPlanByCustomerIdResponse,
} from '~/repository/user_plans.repository';
import { cancelSubcription, createNewSubcription, updateSubcription, DataSubcription } from '~/services/stripe/subcription.service';
import { findProductAndPriceByType, FindProductAndPriceByTypeResponse } from '~/repository/products.repository';
import { deletePermissionByUserPlanId, insertMultiPermission } from '~/repository/user_permission.repository';
import { findUser } from '~/repository/user.repository';
import formatDateDB from '~/utils/format-date-db';
import { PERMISSION_PLAN } from '~/constants/billing.constant';
import compileEmailTemplate from '~/helpers/compile-email-template';
import sendMail from '~/libs/mail';

export function getUserPlan(userId: number): Promise<GetUserPlanByCustomerIdResponse> {
  return getUserPlanByUserId(userId);
}

export async function createUserPlan(userId: number, paymentMethodToken: string, planName: string, billingType: 'MONTHLY' | 'YEARLY'): Promise<true | ApolloError> {
  try {
    const user = await findUser({ id: userId });
    if (!user) {
      return new ApolloError('Can not find any user');
    }

    const product: FindProductAndPriceByTypeResponse = await findProductAndPriceByType(planName, billingType);
    if (!product) {
      return new ApolloError('Can not find any plan');
    }

    const userPlan = await getUserPlanByUserId(userId);
    if (userPlan) {
      await updateUserPlanById(userPlan.id, { is_active: false });
      await deletePermissionByUserPlanId(userPlan.id);
    }

    const { subcription_id, customer_id } = await createNewSubcription(paymentMethodToken, user.email, user.name, product.price_stripe_id);
    if (subcription_id && customer_id) {
      const dataUserPlan = {
        user_id: userId,
        product_id: product.id,
        price_id: product.price_id,
        customer_id,
        subcription_id,
        expired_at: formatDateDB(dayjs().add(1, product.price_type === 'yearly' ? 'y' : 'M')),
      };
      const userPlanId = await insertUserPlan(dataUserPlan);
      let userPermissionData;

      if (product.type === 'starter' || product.type === 'professional') {
        userPermissionData = PERMISSION_PLAN[product.type].map((permission: string) => ({
          user_id: userId,
          user_plan_id: userPlanId[0],
          permission,
        }));
      }
      await insertMultiPermission(userPermissionData);
    }
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function updateUserPlan(userPlanId: number, planName: string, billingType: 'MONTHLY' | 'YEARLY'): Promise<true | ApolloError> {
  try {
    const userPlan = await getUserPlanById(userPlanId);
    if (!userPlan) {
      return new ApolloError('Can not find any user plan');
    }

    const product: FindProductAndPriceByTypeResponse = await findProductAndPriceByType(planName, billingType);
    if (!product) {
      return new ApolloError('Can not find any plan');
    }

    await updateSubcription(userPlan.subcription_id, product.price_stripe_id);

    const dataUserPlan: UserPlanData = {
      product_id: product.id,
      price_id: product.price_id,
    };
    if (!userPlan.is_trial) {
      dataUserPlan.expired_at = formatDateDB(dayjs().add(1, product.price_type === 'yearly' ? 'y' : 'M'));
    }

    await updateUserPlanById(userPlanId, dataUserPlan);
    let userPermissionData;

    if (product.type === 'starter' || product.type === 'professional') {
      userPermissionData = PERMISSION_PLAN[product.type].map((permission: string) => ({
        user_id: userPlan.user_id,
        user_plan_id: userPlanId,
        permission,
      }));
    }
    await deletePermissionByUserPlanId(userPlanId);
    await insertMultiPermission(userPermissionData);
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function deleteUserPlan(id: number): Promise<true | ApolloError> {
  try {
    const userPlan = await getUserPlanById(id);
    if (!userPlan) {
      return new ApolloError('Can not find any user plan');
    }

    await cancelSubcription(userPlan.customer_id);
    await Promise.all([
      deleteUserPlanById(userPlan.id),
      deletePermissionByUserPlanId(userPlan.id, userPlan.expired_at),
    ]);

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function invoicePaymentSuccess(data: DataSubcription): Promise<boolean> {
  try {
    const userPlan = await getUserPlanByCustomerId(data.customer);
    if (!userPlan) {
      throw new ApolloError('Can not find any user plan');
    }

    const expiredAt = formatDateDB(dayjs().add(1, userPlan.priceType === 'yearly' ? 'y' : 'M'));
    const dataUserPlan: UserPlanData = {
      expired_at: expiredAt,
      deleted_at: null,
    };

    await updateUserPlanById(userPlan.id, dataUserPlan);

    const user = await findUser({ id: userPlan.userId });
    if (user) {
      const template = await compileEmailTemplate({
        fileName: 'invoicePaymentSuccess.mjml',
        data: {
          link: data.hosted_invoice_url,
          name: user.name,
          date: expiredAt,
        },
      });

      sendMail(user.email, 'Invoice payment successfully', template);
    }

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function invoicePaymentFailed(data: DataSubcription): Promise<boolean> {
  try {
    const userPlan = await getUserPlanByCustomerId(data.customer);
    if (!userPlan) {
      throw new ApolloError('Can not find any user plan');
    }

    const expiredAt = formatDateDB(dayjs(userPlan.expiredAt).add(10, 'd'));
    const dataUserPlan = {
      expired_at: expiredAt,
      deleted_at: formatDateDB(),
    };

    await updateUserPlanById(userPlan.id, dataUserPlan);

    const user = await findUser({ id: userPlan.userId });
    if (user) {
      const template = await compileEmailTemplate({
        fileName: 'invoicePaymentFailed.mjml',
        data: {
          name: user.name,
          date: expiredAt,
        },
      });

      sendMail(user.email, 'Invoice payment failed', template);
    }
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function trialWillEnd(data: DataSubcription): Promise<boolean> {
  try {
    const userPlan = await getUserPlanByCustomerId(data.customer);
    if (!userPlan) {
      throw new ApolloError('Can not find any user plan');
    }

    const user = await findUser({ id: userPlan.userId });
    if (user) {
      const template = await compileEmailTemplate({
        fileName: 'trialWillEnd.mjml',
        data: {
          name: user.name,
          date: formatDateDB(dayjs(data.trial_end * 1000)),
        },
      });

      sendMail(user.email, 'Trial will end', template);
    }
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
