import { ApolloError } from 'apollo-server-express';
import dayjs from 'dayjs';

import { getAllTeam, getTeam, insertTeam } from '~/repository/team.repository';
import { createTeamInvitation, getTeamInvitation, VALID_PERIOD_DAYS } from '~/repository/team_invitations.repository';
import formatDateDB from '~/utils/format-date-db';
import compileEmailTemplate from '~/helpers/compile-email-template';
import generateRandomKey from '~/helpers/genarateRandomkey';
import { normalizeEmail } from '~/helpers/string.helper';
import logger from '~/utils/logger';
import sendMail from '~/libs/mail';

/**
 * Function to get all team
 *
 * @param User user User who execute this function
 *
 */
export async function getAllTeams(user) {
  console.log(user);
  const allTeams = await getAllTeam();
  return allTeams;
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

  const team = await getTeam({ id: teamId });

  return team;
}

/**
 * Function to create team
 *
 * @param User   user      User who create team
 * @param string teamName  Name of new team
 * @param string teamAlias Alias of new team
 */
export async function createTeam(user, teamName, teamAlias) {
  console.log(user);

  let team = await getTeam({ name: teamName });

  if (team) {
    throw new ApolloError('Name is not available');
  }

  team = await getTeam({ alias: teamAlias });

  if (team) {
    throw new ApolloError('Alias is not available');
  }

  // TODO: Hardcode here created_by is 1, later need to take from user when implement frontend

  const newTeam = await insertTeam({ name: teamName, alias: teamAlias, created_by: 1 });
  return newTeam;
}

/**
 * Function to invite team member
 *
 * @param User   user         User who create invitation
 * @param int    teamId       Id of team you want to invite to join
 * @param string inviteeEmail Email of who you want to send invitation to
 */
export async function inviteTeamMember(user, teamId, inviteeEmail) {
  console.log(user);

  // TODO: Hardcode here created_by is 1, later need to take from user when implement frontend
  const invitation = await getTeamInvitation(inviteeEmail, teamId, 1);

  if (invitation) {
    throw new ApolloError(`You have send invitation to ${inviteeEmail} at ${formatDateDB(invitation.valid_until)} and it is still active`);
  }

  // TODO: Find team member by email. Need to do later when check whether this email belong to any team's member

  const team = await getTeam({ id: teamId });

  if (!team) {
    throw new ApolloError('Team not found');
  }

  try {
    const token = await generateRandomKey();
    const subject = 'Team invitation';
    const template = await compileEmailTemplate({
      fileName: 'inviteTeamMember.mjml',
      data: {
        teamName: team.name,
        url: `${process.env.FRONTEND_URL}/team/join?token=${token}`,
      },
    });

    await sendMail(normalizeEmail(inviteeEmail), subject, template);

    // TODO: Hardcode here created_by is 1, later need to take from user when implement frontend
    await createTeamInvitation({
      email: inviteeEmail,
      team_id: teamId,
      invited_by: 1,
      send_at: formatDateDB(),
      valid_until: formatDateDB(dayjs().add(VALID_PERIOD_DAYS, 'days')),
      token,
    });

    return true;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
