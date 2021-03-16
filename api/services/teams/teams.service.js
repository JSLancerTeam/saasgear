import { ApolloError } from 'apollo-server-express';
import dayjs from 'dayjs';

import { getAllTeam, createNewTeamAndMember, getTeam } from '~/repository/team.repository';
import { createTeamInvitation, VALID_PERIOD_DAYS } from '~/repository/team_invitations.repository';
import formatDateDB from '~/utils/format-date-db';
import compileEmailTemplate from '~/helpers/compile-email-template';
import generateRandomKey from '~/helpers/genarateRandomkey';
import { normalizeEmail, stringToSlug } from '~/helpers/string.helper';
import logger from '~/utils/logger';
import sendMail from '~/libs/mail';
import { createMemberAndInviteToken, getListTeamMemberByAliasTeam } from '../../repository/team_members.repository';
import { findUser } from '../../repository/user.repository';

/**
 * Function to get all team
 *
 * @param User user User who execute this function
 *
 */
export async function getAllTeams(user) {
  const allTeams = await getAllTeam({ userId: user.id });
  return allTeams;
}

/**
 * Function to get team by id
 *
 * @param User user   User who execute this function
 * @param int  teamId Id of team want to get
 *
 */
export async function findTeamByAlias(alias) {
  const members = await getListTeamMemberByAliasTeam({ alias });
  return members.map((member) => ({
    userName: member.userName,
    userId: member.userId,
    email: member.email,
    status: member.status,
    isOwner: member.userId === member.owner,
  }));
}

/**
 * Function to create team
 *
 * @param User   user      User who create team
 * @param string teamName  Name of new team
 * @param string teamAlias Alias of new team
 */
export async function createTeam(user, teamName, teamAlias) {
  const alias = stringToSlug(teamAlias);

  const team = await getTeam({ alias });
  if (team) {
    throw new ApolloError('Team exist');
  }
  const teamId = createNewTeamAndMember({ name: teamName, alias, userid: user.id });

  return {
    id: teamId,
    name: teamName,
    alias,
  };
}

/**
 * Function to invite team member
 *
 * @param User   user         User who create invitation
 * @param int    alias       alias of team you want to invite to join
 * @param string inviteeEmail Email of who you want to send invitation to
 */
export async function inviteTeamMember(user, alias, inviteeEmail) {
  // TODO: Hardcode here created_by is 1, later need to take from user when implement frontend
  // const invitation = await getTeamInvitation(inviteeEmail, teamId, 1);

  // if (invitation) {
  //   throw new ApolloError(`You have send invitation to ${inviteeEmail} at ${formatDateDB(invitation.valid_until)} and it is still active`);
  // }

  // // TODO: Find team member by email. Need to do later when check whether this email belong to any team's member

  if (inviteeEmail === user.email) {
    throw new ApolloError('Email invalid');
  }

  try {
    let member = null;
    const team = await getTeam({ alias });
    if (!team) {
      throw new ApolloError('Team not found');
    }

    member = await findUser({ email: inviteeEmail });

    const token = await generateRandomKey();
    const subject = 'Team invitation';
    const template = await compileEmailTemplate({
      fileName: 'inviteTeamMember.mjml',
      data: {
        teamName: team.name,
        url: `${process.env.FRONTEND_URL}/teams/invitation/${token}`,
      },
    });

    const queries = [sendMail(normalizeEmail(inviteeEmail), subject, template)];
    if (member) {
      queries.push(createMemberAndInviteToken({
        email: inviteeEmail,
        token,
        teamId: team.id,
        memberId: member.id,
        userId: user.id,
      }));
    } else {
      queries.push(createTeamInvitation({
        email: inviteeEmail,
        token,
        invited_by: user.id,
        team_id: team.id,
        valid_until: formatDateDB(dayjs().add(VALID_PERIOD_DAYS, 'days')),
        status: 'active',
      }));
    }
    await Promise.all(queries);
    return {
      userName: member.name,
      userId: member.id,
      email: member.email,
      status: 'pending',
      isOwner: false,
    };
  } catch (error) {
    logger.error(error);
    throw new ApolloError('Something went wrong!');
  }
}
