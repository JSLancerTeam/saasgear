import { combineResolvers } from 'graphql-resolvers';
import { getAllTeams, findTeamByAlias, createTeam, inviteTeamMember } from '~/services/teams/teams.service';
import { isAuthenticated } from './authorization.resolver';

const resolvers = {
  Query: {
    teams: combineResolvers(
      isAuthenticated,
      (_, arg, { user }) => getAllTeams(user),
    ),
    getTeamDetail: combineResolvers(
      isAuthenticated,
      (_, { alias }, { user }) => findTeamByAlias(alias),
    ),
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
  },
};

export default resolvers;
