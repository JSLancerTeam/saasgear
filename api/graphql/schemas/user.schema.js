import { gql } from 'apollo-server-express';

export const UserSchema = gql`
  enum BillingType {
    MONTHLY
    YEARLY
  }

  enum SendMailType {
    VERIFY_EMAIL
    FORGOT_PASSWORD
  }

  enum SocialProviderType {
    GITHUB
    FACEBOOK
    GOOGLE
  }

  type User {
    id: ID!
    email: String!
    name: String!
    isActive: Boolean!
    position: String
    company: String
    avatarUrl: String
    invitationToken: String
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
    loginBySocial(provider: SocialProviderType!, code: String!): ResponseUserSocial!
  }

  extend type Mutation {
    register(email: String!, password: String!, name: String!, paymentMethodToken: String, planName: String, billingType: BillingType): ResponseUserLogin!

    login(email: String!, password: String!): ResponseUserLogin!

    registerSocialAccount(provider: SocialProviderType!, email: String!, name: String!, avatarUrl: String!, providerId: String!): ResponseUserLogin!

    forgotPassword(email: String!): Boolean!

    changePassword(currentPassword: String!, newPassword: String!): Boolean!

    resetPassword(token: String!, password: String!, confirmPassword: String!): Boolean!

    verify(token: String!): Boolean!

    resendEmail(type: SendMailType!): Boolean!

    deleteAccount: Boolean!

    updateProfile(name: String, company: String, position: String): Boolean!
  }
`;
