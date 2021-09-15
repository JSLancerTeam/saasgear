import { gql } from 'graphql.macro';

export default gql`
  mutation UpdateProfile($name: String, $company: String, $position: String) {
    updateProfile(name: $name, company: $company, position: $position)
  }
`;
