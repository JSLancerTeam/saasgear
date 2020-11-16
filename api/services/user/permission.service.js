import { insertMultiPermission } from '~/repository/user_permission.repository';

/**
 * Add user permission
 *
 * @param {number} userId
 * @param {array} permissions
 *
 * @returns {Promise<any>}
 */
export async function addMultiPermissions(userId, permissions) {
  const data = permissions.map((permission) => ({
    user_id: userId,
    permission,
  }));

  return insertMultiPermission(data);
}
