import pkg from 'apollo-server-express';

const { gql } = pkg;

export const UserPlanSchema = gql`

  type ResponseUserPlan {
    userId: Int!
    productId: Int!
    priceId: Int!
    name: String!
    amount: Float!
    productType: String!
    priceType: String!
  }

  extend type Query {
    getUserPlan: ResponseUserPlan!
  }
`;
