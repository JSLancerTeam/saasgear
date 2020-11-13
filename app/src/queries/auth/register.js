import { gql } from 'graphql.macro';

export default gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      verified
    }
  }
`;
