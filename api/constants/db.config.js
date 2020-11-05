import knex from 'knex';
import config from './knexfile.cjs';

const enviroment = process.env.NODE_ENV === 'production' ? 'production' : 'development';

export default knex(config[enviroment]);
