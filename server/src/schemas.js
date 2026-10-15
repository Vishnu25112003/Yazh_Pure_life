import { z } from "zod";

const text = (label, max) =>
  z
    .string({ error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be at most ${max} characters`);

const httpUrl = (label) =>
  text(label, 2000).refine((v) => /^https?:\/\/\S+$/i.test(v), `${label} must be a full http(s) link`);

// Images are either a site path (existing /assets/... files) or an uploaded/https URL.
const imageUrl = text("Image", 2000).refine(
  (v) => /^\/assets\/\S+$/.test(v) || /^https?:\/\/\S+$/i.test(v),
  "Image must be an uploaded file or a valid link"
);

const isActive = z.boolean().default(true);

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  password: z.string().min(1).max(200),
});

export const contactSchema = z.object({
  phone: text("Phone", 20).refine((v) => /^\+?[\d\s-]{8,20}$/.test(v), "Enter a valid phone number, e.g. +91 98765 43210"),
  phoneDisplay: text("Display phone", 30),
  whatsapp: text("WhatsApp number", 15).refine((v) => /^\d{10,15}$/.test(v), "Digits only with country code, e.g. 919876543210"),
  email: text("Email", 200).refine((v) => z.email().safeParse(v).success, "Enter a valid email address"),
  address: text("Address", 400),
  hours: text("Opening hours", 120),
  mycrd: httpUrl("Catalogue link"),
});

export const branchSchema = z.object({
  name: text("Name", 100),
  tag: text("Tag", 40),
  address: text("Address", 400),
  mapsUrl: httpUrl("Google Maps link"),
  isActive,
});

export const productSchema = z.object({
  slug: text("Slug", 80).refine((v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v), "Use lowercase letters, numbers and hyphens only"),
  label: text("Name", 120),
  spec: text("Spec line", 200),
  imageUrl,
  points: z
    .array(z.string().trim().min(1, "Point cannot be empty").max(160, "Point must be at most 160 characters"))
    .max(12, "At most 12 key points")
    .default([]),
  isActive,
});

export const productCreateSchema = productSchema.extend({
  category: z.enum(["domestic", "commercial", "dispenser"]),
});

export const galleryItemSchema = z.object({
  imageUrl,
  name: text("Name", 120),
  isActive,
});

export const reorderSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1).max(500),
});

export const cloudinarySchema = z.object({
  cloudName: text("Cloud name", 60).refine((v) => /^[A-Za-z0-9_-]{2,60}$/.test(v), "Letters, numbers, - and _ only"),
  apiKey: text("API key", 30).refine((v) => /^\d{6,30}$/.test(v), "The API key is a number, e.g. 123456789012345"),
  // Blank means "keep the saved secret"; the route enforces it is present on first save.
  apiSecret: z.string().trim().max(100, "API secret is too long").refine((v) => !/\s/.test(v), "API secret has no spaces").default(""),
});
