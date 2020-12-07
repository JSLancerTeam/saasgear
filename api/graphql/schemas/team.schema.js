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
`;
