import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.userToken;
const userTokenColumns = {
  id: 'user_token.id',
  userId: 'user_token.user_id',
  token: 'user_token.token',
  type: 'user_token.type',
  isActive: 'user_token.is_active',
  createAt: 'users.created_at',
  updatedAt: 'users.updated_at',
};

async function createToken(userId, token, type) {
  return database(TABLE).insert({ token, type, user_id: userId });
}

async function updateUserTokenById(id, token) {
  return database(TABLE).where({ id }).update({ token });
}

async function findToken(token) {
  return database(TABLE).where({ token }).first();
}

async function changeTokenStatus(id, type, isActive = true) {
  const condition = { type };
  if (id) condition.id = id;
  return database(TABLE).where(condition).update({ is_active: isActive });
}

async function removeUserToken(id) {
  return database(TABLE).where({ id }).delete();
}

export {
  userTokenColumns,
  createToken,
  changeTokenStatus,
  removeUserToken,
  updateUserTokenById,
  findToken,
};
