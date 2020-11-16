import { gql } from 'graphql.macro';

export default gql`
  mutation Register(
    $email: String!
    $password: String!
    $name: String!
    $planName: String
    $billingType: BillingType
  ) {
    register(
      email: $email
      password: $password
      name: $name
      planName: $planName
      billingType: $billingType
    ) {
      verified
    }
  }
`;
