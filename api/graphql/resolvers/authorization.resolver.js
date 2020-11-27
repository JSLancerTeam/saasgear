import { AuthenticationError } from 'apollo-server-express';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { user }) =>
  user && user.email ? skip : new AuthenticationError('Authentication fail');
