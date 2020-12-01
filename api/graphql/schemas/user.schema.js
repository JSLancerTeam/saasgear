import { gql } from 'apollo-server-express';

export const UserSchema = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    is_active: Boolean!
  }
  type Response {
    token: String
    verified: Boolean
  }

  type ResponseStatus {
    status: Boolean!
  }

  enum BillingType {
    MONTHLY
    YEARLY
  }

  extend type Query {
    profileUser: User
  }

  extend type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      planName: String
      billingType: BillingType
    ): Response!
    login(email: String!, password: String!): Response!
    forgotPassword(email: String!): Boolean!
    resetPassword(
      token: String!
      password: String!
      confirmPassword: String!
    ): Boolean!
    verify(token: String!): Response!
    resendEmail: ResponseStatus!
  }
`;
