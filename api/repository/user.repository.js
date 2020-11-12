import database from '../config/database.config.js';
import union from 'lodash/union.js';

const TABLE = 'users';

export function getUserByEmail(email) {
	return database(TABLE).where({ email }).first();
}

export function getUserById(id) {
	return database(TABLE).where({ id }).first();
}

export function createUser(...arg) {
	return database(TABLE).insert(...arg);
}

export function updateUser(id, data) {
  return database(TABLE).where({ id }).update(data);
}

export function getUserByIdAndJoinUserToken(id, type) {
	const users = ['users.name', 'users.email', 'users.id'];
	const userToken = ['user_token.token', 'user_token.type', 'user_token.id as token_id'];
	return database(TABLE)
		.join('user_token', 'users.id', 'user_token.user_id')
		.select(union(users, userToken))
		.where({ user_id: id, 'user_token.type': type}).first();
}

export function activeUser(id) {
	return database(TABLE).where({ id }).update({ is_active: true });
}
