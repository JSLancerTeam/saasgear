import { gql } from 'apollo-server-express';

import { UserSchema } from './schemas/user.schema';

const rootSchema = gql`
  scalar Date
  scalar JSON

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [rootSchema, UserSchema];
