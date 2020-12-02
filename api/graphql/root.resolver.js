import userResolves from './resolvers/user.resolver';
import userPlanResolves from './resolvers/user-plan.resolver';
import stripeResolves from './resolvers/stripe.resolver';

export default [userResolves, userPlanResolves, stripeResolves];
