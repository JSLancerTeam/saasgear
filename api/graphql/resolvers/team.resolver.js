import { combineResolvers } from 'graphql-resolvers';
import { getAllTeams, findTeamByAlias, createTeam, inviteTeamMember } from '~/services/teams/teams.service';
import { verifyInvitationToken } from '~/services/teams/verifyInvitationToken.service';
import { acceptInvitation } from '~/services/teams/acceptInvitation';
import { isAuthenticated } from './authorization.resolver';
import { cancelInvitation } from '../../services/teams/cancelInvitation';

const resolvers = {
  Query: {
    teams: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => getAllTeams(user),
    ),
    getTeamDetail: combineResolvers(
      isAuthenticated,
      (_, { alias }) => findTeamByAlias(alias),
    ),
    verifyInvitationToken: (_, { invitationToken }) => verifyInvitationToken(invitationToken),
  },
  Mutation: {
    createTeam: combineResolvers(
      isAuthenticated,
      (_, { name, alias }, { user }) => createTeam(user, name, alias),
    ),
    inviteMember: combineResolvers(
      isAuthenticated,
      (_, { email, alias }, { user }) => inviteTeamMember(user, alias, email),
    ),
    joinTeam: combineResolvers(
      isAuthenticated,
      (_, { token }, { user }) => acceptInvitation(token, user),
    ),
    cancelInvitation: combineResolvers(
      isAuthenticated,
      (_, { userId, teamId }) => cancelInvitation(userId, teamId),
    ),
  },
};

export default resolvers;
