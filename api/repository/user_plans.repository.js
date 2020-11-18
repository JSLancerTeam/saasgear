import database from '~/config/database.config';

const TABLE = 'user_plans';

async function createNewUserPlan(userId, planName, price, billingType) {
  return database(TABLE).insert({
    user_id: userId,
    plan_name: planName,
    price,
    billing_type: billingType,
  });
}

async function getUserPlanById(userId) {
  return database(TABLE).where({ user_id: userId }).first();
}

export { createNewUserPlan, getUserPlanById };
