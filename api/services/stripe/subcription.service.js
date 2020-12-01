import Apollo from 'apollo-server-express';
import dayjs from 'dayjs';
import Stripe from 'stripe';
import logger from '~/utils/logger';
import { lowerCaseAndTrim } from '~/helpers/string.helper';

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const { ApolloError } = Apollo;

/**
 * Create new subcription
 *
 * @param {string} token
 *
 * @returns {Promise<any>}
 */
export async function createNewSubcription(token, email, name, price_id) {
  if (!token) {
    throw new ApolloError('Invalid token');
  }

  try {
    const customer = await stripe.customers.create({
      email: lowerCaseAndTrim(email),
      name,
      source: token,
    });

    const result = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price_id }],
      trial_end: dayjs().add(14, 'day').unix(),
    });

    return result.id;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function updateSubcription(subId, priceId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subId);

    await stripe.subscriptions.update(subId, {
      cancel_at_period_end: false,
      proration_behavior: 'create_prorations',
      items: [{
        id: subscription.items.data[0].id,
        price: priceId,
      }],
    });

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}

export async function cancelSubcription(subId) {
  try {
    await stripe.subscriptions.del(subId);

    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
