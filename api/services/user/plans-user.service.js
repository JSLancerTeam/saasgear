import {
  getUserPlanByUserId,
} from '~/repository/user_plans.repository';

export async function getUserPlan(userId) {
  return getUserPlanByUserId(userId);
}
