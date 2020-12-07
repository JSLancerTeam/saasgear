import { getAllTeams, findTeamById } from '~/services/teams/teams.service';

const resolvers = {
  Query: {
    teams: (_, arg, { user }) => getAllTeams(user),
    getTeamById: (_, { teamId }, { user }) => findTeamById(user, teamId),
  },
};

export default resolvers;
