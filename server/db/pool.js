import pg from "pg";

const fail = (message) => {
  console.error(`\n[database] ${message}\n`);
  process.exit(1);
};

if (!process.env.DATABASE_URL) {
  fail("DATABASE_URL is not set. Copy server/.env.example to server/.env (or set it in your host's environment) and fill it in.");
}

let url;
try {
  url = new URL(process.env.DATABASE_URL.trim());
} catch {
  fail("DATABASE_URL is not a valid URL. It must look like postgresql://USER:PASSWORD@HOST/DBNAME - no quotes, no spaces, and not the 'psql ...' command.");
}
if (!/^postgres(ql)?:$/.test(url.protocol) || !url.hostname) {
  fail("DATABASE_URL must start with postgresql:// and include a host name (copy the full connection string from Neon).");
}

// Local databases connect without TLS; any remote host (Neon, etc.) gets a verified TLS connection.
// sslmode / channel_binding are removed from the URL so the explicit `ssl` option below is the single source of truth.
const isLocal = ["localhost", "127.0.0.1", "::1", "[::1]"].includes(url.hostname);
if (isLocal && process.env.NODE_ENV === "production") {
  fail(
    `DATABASE_URL points to "${url.hostname}", which is the hosting server itself - there is no database there. ` +
      "Set DATABASE_URL to your Neon connection string (the host looks like ep-xxxx-pooler.<region>.aws.neon.tech)."
  );
}
url.searchParams.delete("sslmode");
url.searchParams.delete("channel_binding");

const useSsl = process.env.DATABASE_SSL ? process.env.DATABASE_SSL !== "false" : !isLocal;

// Log where we connect (host and database name only - never the password).
console.log(`[database] ${url.hostname}${url.pathname} (TLS ${useSsl ? "on" : "off"})`);

export const pool = new pg.Pool({
  connectionString: url.toString(),
  ssl: useSsl ? { rejectUnauthorized: true } : false,
  max: 10,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 10_000, // Neon can take a few seconds to wake from idle
});

export const query = (text, params) => pool.query(text, params);
