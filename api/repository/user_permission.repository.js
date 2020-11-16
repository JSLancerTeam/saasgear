import database from '~/config/database.config';

const TABLE = 'user_permissions';

async function insertMultiPermission(data) {
  return database(TABLE).insert(data);
}

export { insertMultiPermission };
