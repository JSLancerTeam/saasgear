import { ApolloError } from 'apollo-server-express';
import dayjs from 'dayjs';
import Stripe from 'stripe';
import logger from '~/utils/logger';
import { normalizeEmail } from '~/helpers/string.helper';

export type DataSubcription = {
  customer: string;
  items?: {
    price: string;
  }[];
  trial_end?: number;
  hosted_invoice_url?: string;
}

type NewSubcription = {
  customer_id: string;
  subcription_id: string;
}

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2020-08-27',
});

/**
 * Create new subcription
 *
 * @param {string} token
 * @param {string} email
 * @param {string} name
 * @param {string} priceId
 * @param {boolean} isTrial
 *
 * @returns {Promise<any>}
 */
export async function createNewSubcription(token: string, email: string, name: string, priceId: string, isTrial = false): Promise<NewSubcription> {
  if (!token) {
    throw new ApolloError('Invalid token');
  }

  try {
    const customer = await stripe.customers.create({
      email: normalizeEmail(email),
      name,
      source: token,
    });

    const dataSubcription: DataSubcription = {
      customer: customer.id,
      items: [{ price: priceId }],
    };
    if (isTrial) {
      dataSubcription.trial_end = dayjs().add(14, 'd').unix();
    }

    const result = await stripe.subscriptions.create(dataSubcription);

    return {
      customer_id: customer.id,
      subcription_id: result.id,
    };
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Payment failed! Please check your card.');
  }
}

/**
 * Update subcription
 *
 * @param {string} subId
 * @param {string} priceId
 *
 * @returns {Promise<any>}
 */
export async function updateSubcription(subId: string, priceId: string): Promise<boolean> {
  try {
    const subscription = await stripe.subscriptions.retrieve(subId);

    await stripe.subscriptions.update(subId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
    });

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Payment failed! Please check your card.');
  }
}

/**
 * Cancel subcription
 *
 * @param {string} customerId
 *
 * @returns {Promise<any>}
 */
export async function cancelSubcription(customerId: string): Promise<boolean> {
  try {
    await stripe.customers.del(customerId);

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
