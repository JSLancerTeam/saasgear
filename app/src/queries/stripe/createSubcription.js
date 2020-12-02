import { gql } from 'graphql.macro';

export default gql`
  mutation CreateSubcription($token: String!) {
    createSubcription(token: $token)
  }
`;
