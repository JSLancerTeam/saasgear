require('dotenv').config({ path: '../.env' });

module.exports = (database, host, user, password, port) => ({
  development: {
    client: 'mysql2',
    connection: {
      database: database || process.env.DATABASE_NAME,
      host: host || process.env.DB_HOST_OUTSIZE_DOCKER,
      user: user || process.env.DATABASE_USER,
      password: password || process.env.DATABASE_PASSWORD,
      port: port || process.env.DB_PORT_OUTSIZE_DOCKER,
    },
    migrations: {
      tableName: 'migrations',
      directory: '../migrations',
      loadExtensions: ['.js'],
    },
    seeds: { directory: '../seeds', recursive: true },
  },
});
