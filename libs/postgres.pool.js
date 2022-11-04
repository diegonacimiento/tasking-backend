import pg from 'pg';
import { config } from '../config/config.js';
const { Pool } = pg;

const options = {};

if (config.isProd) {
  options.connectionString = config.dbUrl,
    options.ssl = {
      rejectUnauthorized: false,
    };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
  options.connectionString = URI;
}

const pool = new Pool(options);

export default pool;
