import { gql } from 'graphql.macro';

export default gql`
  mutation UpdateUserPlan($userPlanId: Int!, $planName: String!, $billingType: BillingType!) {
    updateUserPlan(userPlanId: $userPlanId, planName: $planName, billingType: $billingType)
  }
`;
