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
    isActive: Boolean!
    avatarUrl: String
  }

  type ResponseUserLogin {
    token: String!
  }

  type UserSocial {
    providerId: String!
    provider: String!
    avatarUrl: String
    name: String!
    email: String
  }

  type ResponseUserSocial {
    token: String
    user: UserSocial
  }

  extend type Query {
    profileUser: User!
    loginByGithub(code: String): ResponseUserSocial!
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
    registerSocialAccount(
      provider: String!
      email: String!
      name: String!
      avatarUrl: String!
      providerId: String!
    ): ResponseUserLogin!
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
