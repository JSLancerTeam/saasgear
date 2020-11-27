import { combineResolvers } from 'graphql-resolvers';
import { getUserPlan } from '~/services/user/plans-user.service';
import { isAuthenticated } from './authorization.resolver';

const resolvers = {
  Query: {
    getUserPlan: combineResolvers(
      isAuthenticated,
      (_, args, { user }) => getUserPlan(user.id),
    ),
  },
};

export default resolvers;
