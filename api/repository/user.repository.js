import union from 'lodash/union';
import database from '~/config/database.config';
import { userTokenColumns } from './user_token.repository';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.users;

const usersColumns = {
  id: 'users.id',
  name: 'users.name',
  email: 'users.email',
  createAt: 'users.created_at',
  updatedAt: 'users.updated_at',
  isActive: 'users.is_active',
};

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
  const users = Object.values(usersColumns);
  const userToken = Object.values(userTokenColumns);
  return database(TABLE)
    .join(TABLES.userToken, usersColumns.id, userTokenColumns.userId)
    .select(union(users, userToken))
    .where({ [usersColumns.id]: id, [userTokenColumns.type]: type })
    .first();
}

async function activeUser(id) {
  return database(TABLE).where({ id }).update({ is_active: true });
}

export {
  usersColumns,
  getUserByEmail,
  getUserById,
  getUserByIdAndJoinUserToken,
  updateUser,
  activeUser,
  createUser,
};
