import { gql } from 'apollo-server-express';

export const TeamSchema = gql`
  type Team {
    id: ID
    name: String
    alias: String
  }

  extend type Query {
    teams: [Team],
    getTeamById(teamId: Int!): Team
  }

  extend type Mutation {
    createTeam(name: String!, alias: String!): Team,
    inviteMember(email: String!, teamId: Int!): Boolean
  }
`;
