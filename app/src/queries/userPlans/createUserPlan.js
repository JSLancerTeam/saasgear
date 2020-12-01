import { gql } from 'graphql.macro';

export default gql`
  mutation CreateUserPlan($paymentMethodToken: String!, $planName: String!, $billingType: BillingType!) {
    createUserPlan(paymentMethodToken: $paymentMethodToken, planName: $planName, billingType: $billingType)
  }
`;
