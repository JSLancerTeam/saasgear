import Knex from 'knex';
import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';

export type Price = {
  id?: number;
  amount?: number;
  type?: string;
  stripe_id?: string;
  product_id?: number;
  created_at?: string;
  updated_at?: string;
};

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

export function insertPrice(priceData: Price[] = [], transaction: Knex.Transaction): Promise<number[]> {
  return database(TABLE).insert(priceData).transacting(transaction);
}
