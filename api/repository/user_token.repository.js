import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.userToken;
export const userTokenColumns = {
  id: 'user_token.id',
  userId: 'user_token.user_id',
  token: 'user_token.token',
  type: 'user_token.type',
  isActive: 'user_token.is_active',
  createAt: 'users.created_at',
  updatedAt: 'users.updated_at',
};

export async function createToken(userId, token, type) {
  return database(TABLE).insert({ token, type, user_id: userId });
}

export async function updateUserTokenById(id, token) {
  return database(TABLE).where({ id }).update({ token });
}

export async function findToken(token) {
  return database(TABLE).where({ token }).first();
}

export async function changeTokenStatus(id, type, isActive = true) {
  const condition = { type };
  if (id) condition.id = id;
  return database(TABLE).where(condition).update({ is_active: isActive });
}

export async function removeUserToken(id) {
  return database(TABLE).where({ id }).delete();
}
