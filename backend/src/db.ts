import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? "postgres://yazh:yazh@localhost:5432/yazh_pure_life",
});

export async function ensureSchema(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_requests (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      complaint TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS customer_id TEXT NOT NULL DEFAULT '';
    ALTER TABLE service_requests ADD COLUMN IF NOT EXISTS address TEXT NOT NULL DEFAULT '';
  `);
}
