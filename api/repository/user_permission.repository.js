import database from '~/config/database.config';
import { TABLES } from '~/constants/table-name.constant';
import formatDateDB from '~/utils/format-date-db';

const TABLE = TABLES.userPermissions;

export const userPermissionColumns = {
  id: 'user_permissions.id',
  userId: 'user_permissions.user_id',
  userPlanId: 'user_permissions.user_plan_id',
  permission: 'user_permissions.permission',
  createAt: 'user_permissions.created_at',
  updatedAt: 'user_permissions.updated_at',
  deletedAt: 'user_permissions.deleted_at',
};

export async function insertMultiPermission(data, transaction = null) {
  const query = database(TABLE).insert(data);
  if (!transaction) {
    return query;
  }
  return query.transacting(transaction);
}

export function deletePermissionByUserPlanId(userPlanId, dateDeleted = null) {
  const deleteAt = dateDeleted || formatDateDB();
  return database(TABLE).where({ [userPermissionColumns.userPlanId]: userPlanId }).update({ deleted_at: deleteAt });
}

export function deletePermissionByUserPlanIds(userPlanIds) {
  return database(TABLE).whereIn({ [userPermissionColumns.userPlanId]: userPlanIds }).update({ deleted_at: formatDateDB() });
}
