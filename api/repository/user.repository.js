import database from '../config/database.config.js';

const TABLE = 'users';

export const getUserByEmail = (email) => {
	return database(TABLE).where({ email }).first();
};

export const getUserById = (id) => {
	return database(TABLE).where({ id }).first();
};

const User = {
	create: function (...arg) {
		return database(TABLE).insert(...arg);
	},
};

export default User;
