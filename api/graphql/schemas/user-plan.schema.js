import pkg from 'apollo-server-express';

const { gql } = pkg;

export const UserPlanSchema = gql`

  type ResponseUserPlan {
    id: Int!
    userId: Int!
    productId: Int!
    priceId: Int!
    name: String!
    amount: Float!
    productType: String!
    priceType: String!
  }

  extend type Query {
    getUserPlan: ResponseUserPlan
  }

  extend type Mutation {
    createUserPlan(paymentMethodToken: String!, planName: String!, billingType: BillingType!): Boolean!
    updateUserPlan(userPlanId: Int!, planName: String!, billingType: BillingType!): Boolean!
    deleteUserPlan(userPlanId: Int!): Boolean!
  }
`;
