import Apollo from 'apollo-server-express';
import dayjs from 'dayjs';
import Stripe from 'stripe';
import logger from '~/utils/logger';

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
      email,
      name,
      source: token,
    });

    await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price_id }],
      trial_end: dayjs().add(14, 'day').unix(),
    });
    return true;
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
