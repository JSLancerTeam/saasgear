import { gql } from 'graphql.macro';

export default gql`
  mutation VerifyToken($token: String!) {
    verify(token: $token) {
      verified
    }
  }
`;
