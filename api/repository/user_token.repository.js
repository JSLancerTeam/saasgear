import database from '~/config/database.config';

const TABLE = 'user_token';

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
  createToken,
  changeTokenStatus,
  removeUserToken,
  updateUserTokenById,
  findToken,
};
