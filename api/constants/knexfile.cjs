require('dotenv').config({ path: '../.env' });

module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			database: process.env.DATABASE_NAME,
			host: process.env.DATABASE_HOST,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
		},
		migrations: {
			tableName: 'migrations',
			directory: `../migrations`,
		},
		seeds: { directory: '../seeds', recursive: true },
	},
};
