import express from "express";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { readSite, resolveSite, validateSection, validateSite, writeSite } from "./store.js";

const PORT = Number(process.env.PORT) || 3001;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";
const CLIENT_DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../client/dist");

const app = express();
app.use(express.json({ limit: "2mb", strict: false }));

const wrap = (fn) => (req, res, next) => fn(req, res).catch(next);

function requireAdmin(req, res, next) {
  if (!ADMIN_TOKEN) return res.status(503).json({ error: "ADMIN_TOKEN is not configured; updates are disabled" });
  if (req.get("authorization") !== `Bearer ${ADMIN_TOKEN}`) return res.status(401).json({ error: "Unauthorized" });
  next();
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/site", wrap(async (_req, res) => res.json(resolveSite(await readSite()))));

// Raw (unresolved) data, for editing.
app.get("/api/site/raw", requireAdmin, wrap(async (_req, res) => res.json(await readSite())));

// Replace the whole site document.
app.put("/api/site", requireAdmin, wrap(async (req, res) => {
  const err = validateSite(req.body);
  if (err) return res.status(400).json({ error: err });
  await writeSite(req.body);
  res.json({ ok: true });
}));

// Replace one section, e.g. PUT /api/site/contact or /api/site/branches.
app.put("/api/site/:section", requireAdmin, wrap(async (req, res) => {
  const err = validateSection(req.params.section, req.body);
  if (err) return res.status(400).json({ error: err });
  const site = await readSite();
  site[req.params.section] = req.body;
  await writeSite(site);
  res.json({ ok: true });
}));

app.use("/api", (_req, res) => res.status(404).json({ error: "Not found" }));

// Production: serve the built client from the same server.
if (existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get("*", (_req, res) => res.sendFile(path.join(CLIENT_DIST, "index.html")));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.status ? err.message : "Internal server error" });
});

app.listen(PORT, () => console.log(`Yazh server listening on http://localhost:${PORT}`));
