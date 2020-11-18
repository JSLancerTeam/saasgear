import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.userPermissions;

const userPermissionColumns = {
  id: 'user_permissions.id',
  userId: 'user_permissions.user_id',
  permission: 'user_permissions.permission',
  createAt: 'user_permissions.created_at',
  updatedAt: 'user_permissions.updated_at',
};

async function insertMultiPermission(data) {
  return database(TABLE).insert(data);
}

export { userPermissionColumns, insertMultiPermission };
