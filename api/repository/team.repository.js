import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';
// eslint-disable-next-line import/no-cycle
import { createTeamMember, teamMembersColumns } from './team_members.repository';

const TABLE = TABLES.teams;

export const teamsColumns = {
  id: 'teams.id',
  name: 'teams.name',
  alias: 'teams.alias',
  createAt: 'teams.created_at',
  updatedAt: 'teams.updated_at',
  deletedAt: 'teams.deleted_at',
  createdBy: 'teams.created_by',
};

/**
 * Function to create Team
 *
 * @param object      data        Object contains data of team. Example: {name, alias, created_by}
 * @param Transaction transaction Transaction object want to use within query
 *
 */
export async function insertTeam(data, transaction = null) {
  const query = database(TABLE).insert(data);
  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

/**
 * Function to update team
 *
 * @param int         teamId      Id of team want to update
 * @param object      data        Object contains update data of team. Example: {name, alias, create_by}
 * @param Transaction transaction Transaction object want to use within query
 *
 */
export async function updateTeam(teamId, data, transaction = null) {
  const query = database(TABLE).where({ id: teamId }).update(data);

  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

/**
 * Function to get all team
 *
 */
export async function getAllTeam({ teamId, userId }) {
  const condition = {
    [teamMembersColumns.status]: 'active',
  };
  if (teamId) condition[teamMembersColumns.teamId] = teamId;
  if (userId) condition[teamMembersColumns.userId] = userId;

  return database(TABLE)
    .join(TABLES.teamMembers, teamsColumns.id, teamMembersColumns.teamId)
    .where(condition);
}

/**
 * This function is used to get team by search data
 *
 * @param object searchData Object contains search data. Example: {name, alias, created_by}
 */
export async function getTeam(searchData) {
  return database(TABLE).where(searchData).first();
}

export async function createNewTeamAndMember({ name, alias, userid }) {
  let transaction;
  try {
    transaction = await database.transaction();
    const [teamId] = await insertTeam({ name, alias, created_by: userid }, transaction);
    await createTeamMember({ user_id: userid, team_id: teamId, status: 'active' }, transaction);
    await transaction.commit();
    return teamId;
  } catch (error) {
    transaction.rollback();
    return new Error(error);
  }
}
