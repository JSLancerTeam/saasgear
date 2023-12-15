import { combineResolvers } from 'graphql-resolvers';
import { getDocuments, getDocumentDetail, createDocument, updateDocument, deleteDocument } from '~/services/document/document.service';
import { isAuthenticated } from './authorization.resolver';

const resolvers = {
  Query: {
    getDocuments: combineResolvers(
      // isAuthenticated,
      (_, { offset, limit }, { user }) => getDocuments(user.id, offset, limit),
    ),
    getDocumentDetail: combineResolvers(
      // isAuthenticated,
      (_, { id }) => getDocumentDetail(id),
    ),
  },
  Mutation: {
    createDocument: combineResolvers(
      isAuthenticated,
      (_, { name, body }, { user }) => createDocument(user.id, name, body),
    ),
    updateDocument: combineResolvers(
      isAuthenticated,
      (_, { id, name, body }) => updateDocument(id, name, body),
    ),
    deleteDocument: combineResolvers(
      isAuthenticated,
      (_, { id }) => deleteDocument(id),
    ),
  },
};

export default resolvers;
