require('dotenv').config({ path: '../.env' });

module.exports = (database, host, user, password) => ({
	development: {
		client: 'mysql2',
		connection: {
			database: database ? database : process.env.DATABASE_NAME,
			host: host ? host : process.env.DB_HOST_OUTSIZE_DOCKER,
			user: user ? user : process.env.DATABASE_USER,
      password: password ? password : process.env.DATABASE_PASSWORD,
      port: process.env.DB_PORT_OUTSIZE_DOCKER
		},
		migrations: {
			tableName: 'migrations',
			directory: `../migrations`,
			loadExtensions: ['.js'],
		},
		seeds: { directory: '../seeds', recursive: true },
	},
});
