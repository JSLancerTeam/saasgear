import {
  createNewUserPlan,
  getUserPlanById,
} from '~/repository/user_plans.repository';

/**
 * Create user plan
 *
 * @param {number} userId
 * @param {string} planName
 * @param {number} price
 * @param {string} billingType
 *
 * @returns {Promise<any>}
 */
export async function createUserPlan(userId, planName, price, billingType) {
  if (billingType === 'YEARLY') {
    price *= 10;
  }

  return createNewUserPlan(
    userId,
    planName,
    price,
    billingType.toString().toLowerCase(),
  );
}

export async function getUserPlan(userId) {
  return getUserPlanById(userId);
}
