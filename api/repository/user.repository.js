import union from 'lodash/union';
import database from '~/config/database.config';
import { userTokenTable, usersTable } from '~/constants/table-name.constant';

const TABLE = 'users';

async function getUserByEmail(email) {
  return database(TABLE).where({ email }).first();
}

async function getUserById(id) {
  return database(TABLE).where({ id }).first();
}

async function createUser(...arg) {
  return database(TABLE).insert(...arg);
}

async function updateUser(id, data) {
  return database(TABLE).where({ id }).update(data);
}

async function getUserByIdAndJoinUserToken(id, type) {
  const tableJoin = 'user_token';
  const users = Object.values(usersTable);
  const userToken = Object.values(userTokenTable);
  return database(TABLE)
    .join(tableJoin, usersTable.id, userTokenTable.userId)
    .select(union(users, userToken))
    .where({ [usersTable.id]: id, [userTokenTable.type]: type })
    .first();
}

async function activeUser(id) {
  return database(TABLE).where({ id }).update({ is_active: true });
}

export {
  getUserByEmail,
  getUserById,
  getUserByIdAndJoinUserToken,
  updateUser,
  activeUser,
  createUser,
};
