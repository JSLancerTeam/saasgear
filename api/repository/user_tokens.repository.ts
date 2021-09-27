import database from '~/config/database.config';
import { TABLES } from '~/constants/database.constant';

type Condition = {
  type: 'verify_email' | 'forgot_password';
  id?: number;
}

type GetToken = {
  user_id: number;
}

export type UserToken = {
  id?: number;
  user_id?: number;
  token?: string;
  type?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

const TABLE = TABLES.userTokens;

export const userTokenColumns = {
  id: 'user_tokens.id',
  userId: 'user_tokens.user_id',
  token: 'user_tokens.token',
  type: 'user_tokens.type',
  isActive: 'user_tokens.is_active',
  createAt: 'users.created_at',
  updatedAt: 'users.updated_at',
};

export async function createToken(userId: number, token: string, type: 'verify_email' | 'forgot_password'): Promise<number[]> {
  return database(TABLE).insert({ token, type, user_id: userId });
}

export async function updateUserTokenById(id: number, token: string): Promise<number> {
  return database(TABLE).where({ id }).update({ token });
}

export async function findToken(token: string): Promise<UserToken> {
  return database(TABLE).where({ token }).first();
}

export async function changeTokenStatus(id: number, type: 'verify_email' | 'forgot_password', isActive = true): Promise<number> {
  const condition: Condition = { type };
  if (id) condition.id = id;
  return database(TABLE).where(condition).update({ is_active: isActive });
}

export async function removeUserToken(id: number): Promise<number> {
  return database(TABLE).where({ id }).delete();
}

export async function getToken({ user_id }: GetToken): Promise<UserToken[]> {
  return database(TABLE).where({ user_id });
}
