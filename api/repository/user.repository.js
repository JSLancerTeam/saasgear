import union from 'lodash/union';
import database from '~/config/database.config';
import { userTokenColumns } from './user_tokens.repository';
import { TABLES } from '~/constants/table-name.constant';
import { insertUserPlan } from './user_plans.repository';

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
};

export async function findUser(condition) {
  return database(TABLE).where(condition).first();
}

export async function createUser(userData, userPlanData = null) {
  let t;
  try {
    t = await database.transaction();
    const [userId] = await database(TABLE).transacting(t).insert(userData);

    if (userPlanData) {
      await insertUserPlan({
        ...userPlanData,
        user_id: userId,
      }, t);
    }

    await t.commit();
    return userId;
  } catch (error) {
    if (t) t.rollback();
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
    .join(TABLES.userToken, usersColumns.id, userTokenColumns.userId)
    .select(union(users, userToken))
    .where({ [usersColumns.id]: id, [userTokenColumns.type]: type })
    .first();
}

export async function activeUser(id) {
  return database(TABLE).where({ id }).update({ is_active: true });
}
