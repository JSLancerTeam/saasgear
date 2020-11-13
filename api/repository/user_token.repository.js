import database from '~/config/database.config';

const TABLE = 'user_token';

async function createUserTokenByUser(userId, token, type) {
  return database(TABLE).insert({ token, type, user_id: userId });
}

async function updateUserTokenById(id, token) {
  return database(TABLE).where({ id }).update({ token });
}

async function findRecordByToken(token) {
  return database(TABLE).where({ token }).first();
}

async function activeUserToken(id) {
  return database(TABLE).where({ id }).update({ is_active: true });
}

async function removeUserToken(id) {
  return database(TABLE).where({ id }).delete();
}

export {
  createUserTokenByUser,
  activeUserToken,
  removeUserToken,
  updateUserTokenById,
  findRecordByToken,
};
