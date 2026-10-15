import express from "express";
import helmet from "helmet";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { pool } from "../db/pool.js";
import { HttpError } from "./http.js";
import { adminRouter } from "./routes/admin.js";
import { authRouter, requireAjaxHeader, requireAuth } from "./routes/auth.js";
import { publicRouter } from "./routes/public.js";
import { ConflictError } from "./repo/admin.js";

const PORT = Number(process.env.PORT) || 3001;
const IS_PROD = process.env.NODE_ENV === "production";
const CLIENT_DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");

if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 16) {
  console.error("SESSION_SECRET must be set (16+ characters) in server/.env");
  process.exit(1);
}

const app = express();
if (IS_PROD) app.set("trust proxy", 1); // behind a TLS-terminating proxy: needed for Secure cookies
// CSP is left off so the public page's third-party widgets (reviews) and fonts keep working.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "1mb" }));

app.use("/api", publicRouter);

// Sessions only exist on the admin API.
const PgStore = connectPgSimple(session);
app.use(
  "/api/admin",
  session({
    name: "yazh.sid",
    store: new PgStore({ pool, tableName: "session" }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "strict", secure: IS_PROD, maxAge: 1000 * 60 * 60 * 8 },
  }),
  requireAjaxHeader
);
app.use("/api/admin", authRouter);
app.use("/api/admin", requireAuth, adminRouter);

app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

// Production: serve the built client from the same server.
if (existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get("*", (_req, res) => res.sendFile(path.join(CLIENT_DIST, "index.html")));
}

app.use((err, _req, res, _next) => {
  if (err instanceof HttpError) return res.status(err.status).json({ error: err.message, fields: err.fields });
  if (err instanceof ConflictError) return res.status(409).json({ error: err.message, fields: { slug: err.message } });
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "Invalid JSON" });
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => console.log(`Yazh server listening on http://localhost:${PORT}`));
