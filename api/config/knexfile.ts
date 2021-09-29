import { config } from 'dotenv';

config({ path: '../.env' });

type Config = {
  client: string;
  connection: {
    database: string;
    host: string;
    user: string;
    password: string;
    port: number;
  },
  migrations: {
    tableName: string;
    directory: string;
    loadExtensions: string[];
  },
  seeds: {
    directory: string;
    recursive: boolean;
  }
};

export default (database: string, host: string, user: string, password: string, port: number): Config => ({
  client: 'mysql2',
  connection: {
    database: database || process.env.DATABASE_NAME,
    host: host || process.env.DATABASE_HOST,
    user: user || process.env.DATABASE_USER,
    password: password || process.env.DATABASE_PASSWORD,
    port: port || Number(process.env.DATABASE_PORT),
  },
  migrations: {
    tableName: 'migrations',
    directory: '../migrations',
    loadExtensions: ['.js'],
  },
  seeds: { directory: '../seeds', recursive: true },
});
