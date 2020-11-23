import { gql } from 'graphql.macro';

export default gql`
  mutation ResetPassword(
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      token: $token
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;
