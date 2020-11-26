import union from 'lodash/union';
import database from '~/config/database.config';
import { userTokenColumns } from './user_token.repository';
import { TABLES } from '~/constants/table-name.constant';

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

export async function findUser({ id, email, provider_id, provider }) {
  const condition = {};
  if (id) condition.id = id;
  if (email) condition.email = email;
  if (provider_id) condition.provider_id = provider_id;
  if (provider) condition.provider = provider;
  return database(TABLE).where(condition).first();
}

export async function createUser({ name, email, password = 'null', provider, provider_id, is_active, avatar_url }) {
  const data = { name, email, password };
  if (is_active) data.is_active = is_active;
  if (provider) data.provider = provider;
  if (provider_id) data.provider_id = provider_id;
  if (avatar_url) data.avatar_url = avatar_url;
  return database(TABLE).insert(data);
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
