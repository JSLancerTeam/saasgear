import { gql } from 'graphql.macro';

export default gql`
  mutation CreateDocument($name: String!, $body: String!) {
    createDocument(name: $name, body: $body) {
      id
      name
      body
      createdBy
      createdAt
    }
  }
`;
