import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';
import { teamsColumns } from './team.repository';
import { usersColumns } from './user.repository';

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
    });
}

export async function createTeamMember(data, transaction = null) {
  const query = database(TABLE).insert(data);
  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

// select * 
// from teams
// inner join team_members on teams.id = team_members.team_id
// where team_members.team_id in(select id from teams where alias = 'jslancer-a-asd-asd')