require('dotenv').config({ path: '../.env' });

module.exports = (database, host, user, password, port) => ({
  development: {
    client: 'mysql2',
    connection: {
      database: database || process.env.DATABASE_NAME,
      host: host || process.env.DATABASE_HOST,
      user: user || process.env.DATABASE_USER,
      password: password || process.env.DATABASE_PASSWORD,
      port: port || process.env.DATABASE_PORT,
    },
    migrations: {
      tableName: 'migrations',
      directory: '../migrations',
      loadExtensions: ['.js'],
    },
    seeds: { directory: '../seeds', recursive: true },
  },
});
