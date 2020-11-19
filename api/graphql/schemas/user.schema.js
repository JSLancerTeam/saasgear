import pkg from 'apollo-server-express';

const { gql } = pkg;

export const UserSchema = gql`
  enum BillingType {
    MONTHLY
    YEARLY
  }

  enum SendMailType {
    VERIFY_EMAIL
    FORGOT_PASSWORD
  }

  type User {
    id: ID!
    email: String!
    name: String!
    is_active: Boolean!
  }
  type ResponseUserLogin {
    token: String!
  }

  extend type Query {
    profileUser: User!
  }

  extend type Mutation {
    register(
      email: String!
      password: String!
      name: String!
      planName: String
      billingType: BillingType
    ): ResponseUserLogin!
    login(email: String!, password: String!): ResponseUserLogin!
    forgotPassword(email: String!): Boolean!
    resetPassword(
      token: String!
      password: String!
      confirmPassword: String!
    ): Boolean!
    verify(token: String!): Boolean!
    resendEmail(type: SendMailType!): Boolean!
  }
`;
