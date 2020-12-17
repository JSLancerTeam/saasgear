import { gql } from 'graphql.macro';

export default gql`
  query GetDocumentList($offset: Int, $limit: Int) {
    getDocuments(offset: $offset, limit: $limit) {
      documents {
        id
        name
        body
        createdAt
        createdBy
      }
      count
    }
  }
`;
