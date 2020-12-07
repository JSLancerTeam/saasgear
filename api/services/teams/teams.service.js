import { ApolloError } from 'apollo-server-express';
import { getAllTeam, getTeamById } from '~/repository/team.repository';

/**
 * Function to get all team
 *
 * @param User user User who execute this function
 *
 */
export async function getAllTeams(user) {
  console.log(user);
  return getAllTeam();
}

/**
 * Function to get team by id
 *
 * @param User user   User who execute this function
 * @param int  teamId Id of team want to get
 *
 */
export async function findTeamById(user, teamId) {
  console.log(user);

  if (!teamId) {
    throw new ApolloError('teamId parameter is missing');
  }

  return getTeamById(teamId);
}
