import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.teams;

export const teamsColumns = {
  id: 'teams.id',
  userId: 'teams.created_by',
  name: 'teams.name',
  alias: 'teams.alias',
  createAt: 'teams.created_at',
  updatedAt: 'teams.updated_at',
  deletedAt: 'teams.deleted_at',
};

/**
 * Function to create Team
 *
 * @param object      data        Object contains data of team. Example: {name, alias, createdBy}
 * @param Transaction transaction Transaction object want to use within query
 *
 */
export async function createTeam(data, transaction = null) {
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
 * @param object      data        Object contains update data of team. Example: {name, alias, createdBy}
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
export async function getAllTeam() {
  return database(TABLE).select('*');
}

/**
 * Function to get team by Id
 *
 * @param int id Id of team want to find
 *
 */
export async function getTeamById(id) {
  return database(TABLE).where({ id }).first();
}

/**
 * Function to get team by name
 *
 * @param string name Name of team want to get
 *
 */
export async function getTeamByName(name) {
  return database(TABLE).where({ name }).first();
}

/**
 * Function to get team by alias
 *
 * @param string alias Alias of team want to get
 *
 */
export async function getTeamByAlias(alias) {
  return database(TABLE).where({ alias }).first();
}
