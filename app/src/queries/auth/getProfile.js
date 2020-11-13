import { gql } from 'graphql.macro';

export default gql`
  query GetProfile {
    profileUser {
      id
      email
      name
      is_active
    }
  }
`;
