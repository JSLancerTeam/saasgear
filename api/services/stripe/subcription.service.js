import { ApolloError } from 'apollo-server-express';
import dayjs from 'dayjs';
import Stripe from 'stripe';
import { getUserPlan } from '~/services/user/plans-user.service';

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

/**
 * Create new subcription
 *
 * @param {string} token
 *
 * @returns {Promise<any>}
 */
export async function createNewSubcription(token, user) {
  if (!token) {
    throw new ApolloError('Invalid token');
  }

  try {
    const userPlan = await getUserPlan(user.id);
    if (!userPlan) {
      throw new ApolloError('Can not find any plan');
    }

    const customer = await stripe.customers.create({
      email: user.email,
      name: user.name,
      source: token,
    });

    const product = await stripe.products.create({
      name: userPlan.plan_name,
    });

    const price = await stripe.prices.create({
      unit_amount: userPlan.price * 100,
      currency: 'usd',
      recurring: {
        interval: userPlan.billing_type === 'monthly' ? 'month' : 'year',
      },
      product: product.id,
    });

    await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      trial_end: dayjs().add(14, 'day').unix(),
    });
    return true;
  } catch (error) {
    throw new ApolloError('Something went wrong!');
  }
}
