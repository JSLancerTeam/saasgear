import pkg from 'apollo-server-express';

const { gql } = pkg;

export const StripeSchema = gql`
  extend type Mutation {
    createSubcription(token: String!): Boolean!
  }
`;
