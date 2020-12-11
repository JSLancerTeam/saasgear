import { gql } from 'apollo-server-express';

export const TeamSchema = gql`
  enum TeamMemberType {
    active
    inactive
  }

  type Team {
    id: ID
    name: String
    alias: String
  }

  type TeamMember {
    userName: String
    userId: ID
    email: String
    isOwner: Boolean
    status: TeamMemberType
  }

  extend type Query {
    teams: [Team],
    getTeamDetail(alias: String!): [TeamMember]
  }

  extend type Mutation {
    createTeam(name: String!, alias: String!): Team,
    inviteMember(email: String!, teamId: Int!): Boolean
  }
`;
