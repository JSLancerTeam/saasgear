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

export function getUserByIdAndJoinUserToken(id) {
	const users = ['users.name', 'users.email', 'users.id', 'users.is_active'];
	const userToken = ['user_token.token', 'user_token.type'];
	return database(TABLE).join('user_token', 'users.id', 'user_token.user_id').select(union(users, userToken)).where({ user_id: id });
}

export function activeUser(id) {
	return database(TABLE).where({ id }).update({ is_active: true });
}
