import { getAllTeams, findTeamById, createTeam, inviteTeamMember } from '~/services/teams/teams.service';

const resolvers = {
  Query: {
    teams: (_, arg, { user }) => getAllTeams(user),
    getTeamById: (_, { teamId }, { user }) => findTeamById(user, teamId),
  },
  Mutation: {
    createTeam: (_, { name, alias }, { user }) => createTeam(user, name, alias),
    inviteMember: (_, { email, teamId }, { user }) => inviteTeamMember(user, teamId, email),
  },
};

export default resolvers;
