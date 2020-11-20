import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';

const TABLE = TABLES.userPermissions;

export const userPermissionColumns = {
  id: 'user_permissions.id',
  userId: 'user_permissions.user_id',
  permission: 'user_permissions.permission',
  createAt: 'user_permissions.created_at',
  updatedAt: 'user_permissions.updated_at',
};

export async function insertMultiPermission(data) {
  return database(TABLE).insert(data);
}
