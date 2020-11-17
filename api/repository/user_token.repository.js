import database from '~/config/database.config';

const TABLE = 'user_token';

export function createUserTokenByUser(userId, token, type) {
  return database(TABLE).insert({ token, type, user_id: userId });
}

export function updateUserTokenById(id, token) {
  return database(TABLE).where({ id }).update({ token });
}

export function findRecordByToken(token) {
  return database(TABLE).where({ token }).first();
}

export function activeUserToken(id) {
  return database(TABLE).where({ id }).update({ is_active: true });
}

export function removeUserToken(id) {
  return database(TABLE).where({ id }).delete();
}
