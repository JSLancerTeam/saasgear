import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';

const TABLE = TABLES.userTokens;
export const userTokenColumns = {
  id: 'user_tokens.id',
  userId: 'user_tokens.user_id',
  token: 'user_tokens.token',
  type: 'user_tokens.type',
  isActive: 'user_tokens.is_active',
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

export async function getToken({ user_id }) {
  return database(TABLE).where({ user_id });
}
