require('dotenv').config({ path: '../.env' });

module.exports = (database, host, user, password) => ({
	development: {
		client: 'mysql2',
		connection: {
			database: database ? database : process.env.DATABASE_NAME,
			host: host ? host : process.env.DATABASE_HOST,
			user: user ? user : process.env.DATABASE_USER,
			password: password ? password : process.env.DATABASE_PASSWORD,
		},
		migrations: {
			tableName: 'migrations',
			directory: `../migrations`,
			loadExtensions: ['.js'],
		},
		seeds: { directory: '../seeds', recursive: true },
	},
});
