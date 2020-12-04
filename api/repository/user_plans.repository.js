import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';
import formatDateDB from '~/utils/format-date-db';
import { priceColumns } from './prices.repository';
import { productColumns } from './products.repository';

const TABLE = TABLES.userPlans;

export const userPlanColumns = {
  id: 'user_plans.id',
  userId: 'user_plans.user_id',
  productId: 'user_plans.product_id',
  priceId: 'user_plans.price_id',
  subcriptionId: 'user_plans.subcription_id',
  customerId: 'user_plans.customer_id',
  isTrial: 'user_plans.is_trial',
  expiredAt: 'user_plans.expired_at',
  isActive: 'user_plans.is_active',
  createAt: 'user_plans.created_at',
  updatedAt: 'user_plans.updated_at',
  deletedAt: 'user_plans.deleted_at',
};

export function insertUserPlan(data, transaction = null) {
  const query = database(TABLE).insert(data);
  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

export function getUserPlanById(id) {
  return database(TABLE)
    .where({ id, [userPlanColumns.isActive]: true })
    .where(userPlanColumns.expiredAt, '>=', formatDateDB())
    .first();
}

export function getUserPlanExpired() {
  return database(TABLE)
    .whereNotNull([userPlanColumns.deletedAt])
    .where(userPlanColumns.expiredAt, '<', formatDateDB());
}

export function getUserPlanByCustomerId(customerId) {
  return database(TABLE)
    .leftJoin(TABLES.prices, userPlanColumns.priceId, priceColumns.id)
    .select(userPlanColumns, `${priceColumns.type} as priceType`)
    .where({ [userPlanColumns.customerId]: customerId, [userPlanColumns.isActive]: true })
    .first();
}

export function updateUserPlanById(id, data) {
  return database(TABLE).where({ id }).update(data);
}

export function getUserPlanByUserId(userId) {
  return database(TABLE)
    .leftJoin(TABLES.products, userPlanColumns.productId, productColumns.id)
    .leftJoin(TABLES.prices, userPlanColumns.priceId, priceColumns.id)
    .select(userPlanColumns, productColumns.name, `${productColumns.type} as productType`, priceColumns.amount, `${priceColumns.type} as priceType`)
    .where({ [userPlanColumns.userId]: userId, [userPlanColumns.isActive]: true })
    .where(userPlanColumns.expiredAt, '>=', formatDateDB())
    .first();
}

export function deleteUserPlanById(id) {
  return database(TABLE).where({ id }).update({ [userPlanColumns.deletedAt]: formatDateDB() });
}
