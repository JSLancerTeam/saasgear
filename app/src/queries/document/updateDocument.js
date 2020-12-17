import { gql } from 'graphql.macro';

export default gql`
  mutation UpdateDocument($id: Int!, $name: String!, $body: String!) {
    updateDocument(id: $id, name: $name, body: $body) {
      id
      name
      body
      createdBy
      createdAt
    }
  }
`;
