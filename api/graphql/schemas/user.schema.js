import pkg from 'apollo-server-express';

const { gql } = pkg;

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

  type Query {
    profileUser: User
    verify(token: String!): Response!
    resendEmail: ResponseStatus!
  }

  type Mutation {
    register(email: String!, password: String!, name: String!): Response!
    login(email: String!, password: String!): Response!
    forgotPassword(email: String!): Boolean!
    resetPassword(
      token: String!
      password: String!
      confirmPassword: String!
    ): Boolean!
  }
`;
