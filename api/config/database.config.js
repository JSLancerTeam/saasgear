import knex from 'knex';
import dotenv from 'dotenv';
import config from './knexfile.cjs';

dotenv.config({ path: '.env' });

const enviroment =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default knex(
  config(
    process.env.DATABASE_NAME,
    process.env.DATABASE_HOST,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_PORT,
  )[enviroment],
);
