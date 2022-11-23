import { gql } from 'apollo-server-express';
import { UserSchema } from './schemas/user.schema';
import { UserPlanSchema } from './schemas/user-plan.schema';
import { TeamSchema } from './schemas/team.schema';
import { DocumentSchema } from './schemas/document.schema';

const rootSchema = gql`
  scalar Date
  scalar JSON
  scalar Upload

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

export default [rootSchema, UserSchema, UserPlanSchema, TeamSchema, DocumentSchema];
