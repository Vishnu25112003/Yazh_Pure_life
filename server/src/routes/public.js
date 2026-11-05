import { Router } from "express";
import { query } from "../../db/pool.js";
import { HttpError, wrap } from "../http.js";
import { getPublicCatalog } from "../repo/catalog.js";
import { CATALOG_CATEGORIES } from "../catalog.js";
import { buildPublicSite } from "../repo/site.js";

export const publicRouter = Router();

publicRouter.get("/health", wrap(async (_req, res) => {
  await query("SELECT 1");
  res.json({ ok: true });
}));

publicRouter.get("/site", wrap(async (_req, res) => {
  res.set("Cache-Control", "no-cache");
  res.json(await buildPublicSite());
}));

publicRouter.get("/catalog/:category", wrap(async (req, res) => {
  const category = req.params.category;
  const data = CATALOG_CATEGORIES.includes(category) ? await getPublicCatalog(category) : null;
  if (!data) throw new HttpError(404, "This catalogue is not available");
  res.set("Cache-Control", "no-cache");
  res.json(data);
}));
