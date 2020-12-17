import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';

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
 * @param object      data        Object contains data of team. Example: {name, alias, created_by}
 * @param Transaction transaction Transaction object want to use within query
 *
 */
export async function insertTeam(data) {
  const res = await database(TABLE).returning(['id', 'name', 'alias', 'createdBy']).insert(data);
  const newId = res.shift();
  return getTeam({ id: newId });
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
export async function getAllTeam() {
  return database(TABLE).select('*');
}

/**
 * This function is used to get team by search data
 *
 * @param object searchData Object contains search data. Example: {name, alias, created_by}
 */
export async function getTeam(searchData) {
  return database(TABLE).where(searchData).first();
}
