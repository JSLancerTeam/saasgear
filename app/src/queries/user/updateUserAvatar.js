import { gql } from 'graphql.macro';

export default gql`
  mutation UpdateUserAvatar($file: Upload!) {
    updateProfileAvatar(file: $file) {
      url
    }
  }
`;
