import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';
import { priceColumns } from './prices.repository';
import { productColumns } from './products.repository';

const TABLE = TABLES.userPlans;

export const userPlanColumns = {
  id: 'user_plans.id',
  userId: 'user_plans.user_id',
  productId: 'user_plans.product_id',
  priceId: 'user_plans.price_id',
  subcriptionId: 'user_plans.subcription_id',
  createAt: 'user_plans.created_at',
  updatedAt: 'user_plans.updated_at',
};

export function insertUserPlan(data, transaction = null) {
  const query = database(TABLE).insert(data);
  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

export function getUserPlanById(id) {
  return database(TABLE).where({ id }).first();
}

export function updateUserPlanById(id, data) {
  return database(TABLE).where({ id }).update(data);
}

export function getUserPlanByUserId(userId) {
  return database(TABLE)
    .leftJoin(TABLES.products, userPlanColumns.productId, productColumns.id)
    .leftJoin(TABLES.prices, userPlanColumns.priceId, priceColumns.id)
    .select(userPlanColumns, productColumns.name, `${productColumns.type} as productType`, priceColumns.amount, `${priceColumns.type} as priceType`)
    .where({ user_id: userId })
    .first();
}

export function deleteUserPlanById(id) {
  return database(TABLE).where({ id }).del();
}
