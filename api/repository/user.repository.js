import union from 'lodash/union';
import database from '~/config/database.config';
import { userTokenColumns } from './user_tokens.repository';
import { TABLES } from '~/constants/database.constant';
import { insertUserPlan } from './user_plans.repository';
import { insertMultiPermission } from './user_permission.repository';
import { PERMISSION_PLAN } from '~/constants/billing.constant';
import { teamMembersColumns } from './team_members.repository';

const TABLE = TABLES.users;

export const usersColumns = {
  id: 'users.id',
  name: 'users.name',
  email: 'users.email',
  createAt: 'users.created_at',
  updatedAt: 'users.updated_at',
  isActive: 'users.is_active',
  avatarUrl: 'users.avatar_url',
  provider: 'users.provider',
  providerId: 'users.provider_id',
  deletedAt: 'users.deleted_at',
};

export async function findUser({ id, email, provider_id, provider, deleted_at = null }) {
  const condition = {
    deleted_at,
  };
  if (id) condition.id = id;
  if (email) condition.email = email;
  if (provider_id) condition.provider_id = provider_id;
  if (provider) condition.provider = provider;
  return database(TABLE).where(condition).first();
}

export async function createUser(userData, userPlanData = null, planType = null) {
  let t;
  try {
    t = await database.transaction();
    const [userId] = await database(TABLE).transacting(t).insert(userData);

    if (userPlanData) {
      const [userPlanId] = await insertUserPlan(
        {
          ...userPlanData,
          user_id: userId,
        },
        t,
      );

      if (planType && PERMISSION_PLAN[planType]) {
        const userPermissionData = PERMISSION_PLAN[planType].map((permission) => ({
          user_id: userId,
          user_plan_id: userPlanId,
          permission,
        }));
        await insertMultiPermission(userPermissionData, t);
      }
    }

    await t.commit();
    return userId;
  } catch (error) {
    if (error) t.rollback();
    return new Error(error);
  }
}

export async function updateUser(id, data) {
  return database(TABLE).where({ id }).update(data);
}

export async function getUserByIdAndJoinUserToken(id, type) {
  const users = Object.values(usersColumns);
  const userToken = Object.values(userTokenColumns);
  return database(TABLE)
    .join(TABLES.userTokens, usersColumns.id, userTokenColumns.userId)
    .select(union(users, userToken))
    .where({ [usersColumns.id]: id, [userTokenColumns.type]: type })
    .first();
}

export async function activeUser(id) {
  return database(TABLE).where({ id }).update({ is_active: true });
}

export async function getUserAndTeamInfo({ email }) {
  return database(TABLE)
    .join(TABLES.teamMembers, usersColumns.id, teamMembersColumns.userId)
    .where({ [usersColumns.email]: email })
    .select({
      id: usersColumns.id,
      email: usersColumns.email,
      name: usersColumns.name,
      teamStatus: teamMembersColumns.status,
    })
    .first();
}
