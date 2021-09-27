// import { getUserByIdAndJoinUserToken } from '~/repository/user.repository';
import { insertMultiPermission } from '~/repository/user_permission.repository';

/**
 * Add user permission
 *
 * @param {number} userId
 * @param {array} permissions
 *
 * @returns {Promise<any>}
 */
export async function addMultiPermissions(userId: number, permissions: string[]): Promise<number[]> {
  const data = permissions.map((permission: string) => ({
    user_id: userId,
    permission,
  }));

  return insertMultiPermission(data);
}
