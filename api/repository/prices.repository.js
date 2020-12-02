import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.prices;

export const priceColumns = {
  id: 'prices.id',
  amount: 'prices.amount',
  type: 'prices.type',
  stripeId: 'prices.stripe_id',
  productId: 'prices.product_id',
  createAt: 'prices.created_at',
  updatedAt: 'prices.updated_at',
};

export function insertPrice(priceData = [], transaction) {
  return database(TABLE).insert(priceData).transacting(transaction);
}
