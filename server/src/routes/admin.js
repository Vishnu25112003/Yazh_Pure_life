import { Router } from "express";
import { HttpError, idParam, parse, wrap } from "../http.js";
import * as repo from "../repo/admin.js";
import {
  branchSchema,
  contactSchema,
  galleryItemSchema,
  productCreateSchema,
  productSchema,
  reorderSchema,
} from "../schemas.js";
import { uploadMiddleware, uploadToCloudinary, uploadsEnabled } from "../upload.js";

export const adminRouter = Router();

const CATEGORIES = new Set(["domestic", "commercial", "dispenser"]);
const category = (req) => {
  if (!CATEGORIES.has(req.params.category)) throw new HttpError(404, "Not found");
  return req.params.category;
};
const found = (row) => {
  if (!row) throw new HttpError(404, "Not found");
  return row;
};

adminRouter.get("/dashboard", wrap(async (_req, res) => res.json(await repo.getDashboard())));

// ---- Contact ----
adminRouter.get("/contact", wrap(async (_req, res) => res.json(await repo.getContact())));
adminRouter.put("/contact", wrap(async (req, res) => res.json(await repo.updateContact(parse(contactSchema, req.body)))));

// ---- Branches ----
adminRouter.get("/branches", wrap(async (_req, res) => res.json(await repo.listBranches())));
adminRouter.post("/branches", wrap(async (req, res) => res.status(201).json(await repo.createBranch(parse(branchSchema, req.body)))));
adminRouter.put("/branches/reorder", wrap(async (req, res) => {
  await repo.reorder("branches", parse(reorderSchema, req.body).ids);
  res.json({ ok: true });
}));
adminRouter.put("/branches/:id", wrap(async (req, res) =>
  res.json(found(await repo.updateBranch(idParam(req), parse(branchSchema, req.body))))));
adminRouter.delete("/branches/:id", wrap(async (req, res) => {
  found(await repo.deleteBranch(idParam(req)));
  res.json({ ok: true });
}));

// ---- Gallery ----
adminRouter.get("/gallery", wrap(async (_req, res) => res.json(await repo.listGallery())));
adminRouter.post("/gallery", wrap(async (req, res) => res.status(201).json(await repo.createGalleryItem(parse(galleryItemSchema, req.body)))));
adminRouter.put("/gallery/reorder", wrap(async (req, res) => {
  await repo.reorder("gallery", parse(reorderSchema, req.body).ids);
  res.json({ ok: true });
}));
adminRouter.put("/gallery/:id", wrap(async (req, res) =>
  res.json(found(await repo.updateGalleryItem(idParam(req), parse(galleryItemSchema, req.body))))));
adminRouter.delete("/gallery/:id", wrap(async (req, res) => {
  found(await repo.deleteGalleryItem(idParam(req)));
  res.json({ ok: true });
}));

// ---- Products: /products/:category (domestic | commercial | dispenser) ----
adminRouter.get("/products/:category", wrap(async (req, res) => res.json(await repo.listProducts(category(req)))));
adminRouter.post("/products/:category", wrap(async (req, res) => {
  const cat = category(req);
  const data = parse(productCreateSchema, { ...req.body, category: cat });
  res.status(201).json(await repo.createProduct(data));
}));
adminRouter.put("/products/:category/reorder", wrap(async (req, res) => {
  await repo.reorder("products", parse(reorderSchema, req.body).ids, category(req));
  res.json({ ok: true });
}));
adminRouter.put("/products/:category/:id", wrap(async (req, res) => {
  category(req);
  res.json(found(await repo.updateProduct(idParam(req), parse(productSchema, req.body))));
}));
adminRouter.delete("/products/:category/:id", wrap(async (req, res) => {
  category(req);
  found(await repo.deleteProduct(idParam(req)));
  res.json({ ok: true });
}));

// ---- Image upload (Cloudinary). Accepts 1-20 files in the "files" field; ?section= picks the folder. ----
adminRouter.post("/upload", (req, res, next) => {
  if (!uploadsEnabled()) {
    return next(new HttpError(503, "Image upload is not configured (CLOUDINARY_URL). Paste an image link instead."));
  }
  uploadMiddleware(req, res, (err) => {
    if (!err) return next();
    if (err.code === "LIMIT_FILE_SIZE") return next(new HttpError(400, "Each image must be 5 MB or smaller"));
    next(err);
  });
}, wrap(async (req, res) => {
  if (!req.files?.length) throw new HttpError(400, "Choose at least one image");
  const urls = await Promise.all(req.files.map((f) => uploadToCloudinary(f, req.query.section)));
  res.json({ urls });
}));

adminRouter.get("/config", (_req, res) => res.json({ uploadsEnabled: uploadsEnabled() }));
