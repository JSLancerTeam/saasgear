import { combineResolvers } from 'graphql-resolvers';
import { getUserPlan, createUserPlan, deleteUserPlan, updateUserPlan } from '~/services/user/plans-user.service';
import { isAuthenticated } from './authorization.resolver';

const resolvers = {
  Query: {
    getUserPlan: combineResolvers(
      isAuthenticated,
      (_, args, { user }) => getUserPlan(user.id),
    ),
  },
  Mutation: {
    createUserPlan: combineResolvers(
      isAuthenticated,
      (_, { paymentMethodToken, planName, billingType }, { user }) => createUserPlan(user.id, paymentMethodToken, planName, billingType),
    ),
    updateUserPlan: combineResolvers(
      isAuthenticated,
      (_, { userPlanId, planName, billingType }) => updateUserPlan(userPlanId, planName, billingType),
    ),
    deleteUserPlan: combineResolvers(
      isAuthenticated,
      (_, { userPlanId }) => deleteUserPlan(userPlanId),
    ),
  },
};

export default resolvers;
