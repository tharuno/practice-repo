const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'devopshub',
  user: process.env.DB_USER || 'devopshub_user',
  password: process.env.DB_PASSWORD,
});

pool.on('connect', () => {
  console.log('PostgreSQL database connected');
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL error:', err);
});

module.exports = pool;
