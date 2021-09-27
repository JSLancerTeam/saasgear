import { AuthenticationError } from 'apollo-server-express';
import { Response } from 'express';
import { skip } from 'graphql-resolvers';
import { UserProfile } from '~/repository/user.repository';

type Context = {
  user?: UserProfile;
  res?: Response;
}

export const isAuthenticated = (parent: unknown, args: unknown, { user }: Context): AuthenticationError =>
  user?.email ? skip : new AuthenticationError('Authentication fail');
