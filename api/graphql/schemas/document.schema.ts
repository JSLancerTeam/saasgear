import { gql } from 'apollo-server-express';

export const DocumentSchema = gql`
  type Document {
    id: ID!
    name: String!
    body: String!
    createdBy: String!
    createdAt: Date!
    userId: Int!
  }

  type DocumentList {
    documents: [Document!]
    count: Int!
  }

  extend type Query {
    getDocuments(offset: Int, limit: Int): DocumentList,
    getDocumentDetail(id: Int!): Document,
  }

  extend type Mutation {
    createDocument(name: String!, body: String!): Document,
    updateDocument(id: Int!, name: String!, body: String!): Document,
    deleteDocument(id: Int!): Boolean!,
  }
`;
