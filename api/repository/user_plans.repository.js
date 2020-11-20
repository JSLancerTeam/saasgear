import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.userPlans;

export const userPlanColumns = {
  id: 'user_plans.id',
  userId: 'user_plans.user_id',
  planName: 'user_plans.plan_name',
  price: 'user_plans.price',
  billingType: 'user_plans.billing_type',
  createAt: 'user_plans.created_at',
  updatedAt: 'user_plans.updated_at',
};

export async function createNewUserPlan(userId, planName, price, billingType) {
  return database(TABLE).insert({
    user_id: userId,
    plan_name: planName,
    price,
    billing_type: billingType,
  });
}

export async function getUserPlanById(userId) {
  return database(TABLE).where({ user_id: userId }).first();
}
