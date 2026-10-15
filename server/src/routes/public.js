import { Router } from "express";
import { query } from "../../db/pool.js";
import { wrap } from "../http.js";
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
