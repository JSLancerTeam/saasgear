import { gql } from 'apollo-server-express';

export const TeamSchema = gql`
  enum TeamMemberType {
    active
    inactive
    pending
    decline
  }

  enum JoinTeamType {
    accept
    decline
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
    teamId: ID
  }

  type VerifyTokenResponse{
    teamName: String!
    owner: String!
  }

  extend type Query {
    teams: [Team]
    getTeamDetail(alias: String!): [TeamMember]
    verifyInvitationToken(invitationToken: String!): VerifyTokenResponse!
  }

  extend type Mutation {
    createTeam(name: String!, alias: String!): Team,
    inviteMember(email: String!, alias: String!): TeamMember
    joinTeam(type: JoinTeamType!, token: String!): Boolean!
    cancelInvitation(userId: String!, teamId: String!): Boolean!
  }
`;
