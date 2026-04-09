import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://onair:onair_studio_2024@localhost:5432/onair',
  max: 10,
});

export const query = (text, params) => pool.query(text, params);
export default pool;
