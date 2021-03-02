import dayjs from 'dayjs';
import formatDateDB from '~/utils/format-date-db';

import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';
// eslint-disable-next-line import/no-cycle
import { teamsColumns } from './team.repository';
import { usersColumns } from './user.repository';
// eslint-disable-next-line import/no-cycle
import { createTeamInvitation, VALID_PERIOD_DAYS } from './team_invitations.repository';

const TABLE = TABLES.teamMembers;

export const teamMembersColumns = {
  userId: 'team_members.user_id',
  teamId: 'team_members.team_id',
  status: 'team_members.status',
  createdAt: 'team_members.created_at',
  updatedAt: 'team_members.updated_at',
  deletedAt: 'team_members.deleted_at',
  invitationToken: 'team_members.invitation_token',
};

export async function getListTeamMemberByAliasTeam({ alias }) {
  return database(TABLES.teams)
    .join(TABLE, teamsColumns.id, teamMembersColumns.teamId)
    .whereIn(teamMembersColumns.teamId, function subQuery() {
      this.select('id').from(TABLES.teams).where({ alias });
    }).join(TABLES.users, teamMembersColumns.userId, usersColumns.id)
    .select({
      userName: usersColumns.name,
      userId: usersColumns.id,
      email: usersColumns.email,
      status: teamMembersColumns.status,
      owner: teamsColumns.createdBy,
    });
}

export async function createTeamMember(data, transaction = null) {
  const query = database(TABLE).insert(data);
  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

export async function createMemberAndInviteToken({ userId, teamId, memberId, email, token }) {
  let transaction;
  try {
    transaction = await database.transaction();
    await createTeamInvitation({
      email,
      invited_by: userId,
      team_id: teamId,
      valid_until: formatDateDB(dayjs().add(VALID_PERIOD_DAYS, 'days')),
      status: 'active',
      token,
    }, transaction);
    await createTeamMember({ user_id: memberId, team_id: teamId, status: 'pending', invitation_token: token }, transaction);
    await transaction.commit();
    return true;
  } catch (error) {
    transaction.rollback();
    throw new Error(error);
  }
}

export async function updateTeamMember(condition, data) {
  return database(TABLE).where(condition).update(data);
}
