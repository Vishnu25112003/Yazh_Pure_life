import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set. Copy server/.env.example to server/.env and fill it in.");
  process.exit(1);
}

// Local databases connect without TLS; any remote host (Neon, etc.) gets a verified TLS connection.
// sslmode / channel_binding are removed from the URL so the explicit `ssl` option below is the single source of truth.
const url = new URL(process.env.DATABASE_URL);
const isLocal = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(url.hostname);
url.searchParams.delete("sslmode");
url.searchParams.delete("channel_binding");

const useSsl = process.env.DATABASE_SSL ? process.env.DATABASE_SSL !== "false" : !isLocal;

export const pool = new pg.Pool({
  connectionString: url.toString(),
  ssl: useSsl ? { rejectUnauthorized: true } : false,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000, // Neon can take a few seconds to wake from idle
});

export const query = (text, params) => pool.query(text, params);
