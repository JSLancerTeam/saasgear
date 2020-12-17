import { gql } from 'graphql.macro';

export default gql`
  query GetDocumentDetail($id: Int!) {
    getDocumentDetail(id: $id) {
      id
      name
      body
      createdAt
      createdBy
    }
  }
`;
