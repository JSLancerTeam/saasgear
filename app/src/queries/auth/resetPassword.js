import { gql } from 'graphql.macro';

export default gql`
  mutation ResetPassword($token: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(email: $email, password: password: $password, confirmPassword: $confirmPassword)
  }
`;
