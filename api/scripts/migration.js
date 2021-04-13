const Knex = require('knex');

const databaseName = process.env.DATABASE_NAME;

const connection = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

async function main() {
  let knex = Knex({
    client: 'mysql',
    connection,
  });

  await knex.raw('CREATE DATABASE IF NOT EXISTS ??', databaseName);

  knex = Knex({
    client: 'mysql',
    connection: {
      ...connection,
      database: databaseName,
    },
  });

  await knex.migrate.latest();
}

main().catch(console.log).then(process.exit);
