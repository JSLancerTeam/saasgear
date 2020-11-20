import { gql } from 'graphql.macro';

export default gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;
