import database from '../config/database.config.js';

const TABLE = 'user_token';

export function createUserTokenByUser(userId, token, type) {
	return database(TABLE).insert({ token, type, user_id: userId });
}

export function findRecordByToken(token) {
	return database(TABLE).where({ token }).first();
}
export function activeUserToken(id) {
	return database(TABLE).where({ id }).update({ is_active: true });
}
