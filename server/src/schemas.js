import { z } from "zod";
import { SECTION_KEYS } from "./catalog.js";

// Hidden characters used to disguise text: controls, zero-width, bidi overrides, BOM. Newlines and tabs are kept.
const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u00AD\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;
// HTML tags, script links and inline event handlers have no place in any text field of this site.
const CODE_LIKE = /<\s*\/?\s*[a-z!?]|javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|\bon[a-z]+\s*=/i;
const CODE_MSG = "Remove code-like text (HTML tags or scripts)";
const scrub = (v) => v.replace(INVISIBLE, "");

const text = (label, max) =>
  z
    .string({ error: `${label} is required` })
    .transform(scrub)
    .pipe(
      z
        .string()
        .trim()
        .min(1, `${label} is required`)
        .max(max, `${label} must be at most ${max} characters`)
        .refine((v) => !CODE_LIKE.test(v), `${label}: ${CODE_MSG}`)
    );

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
});

export const branchSchema = z.object({
  name: text("Name", 100),
  tag: text("Tag", 40),
  address: text("Address", 400),
  mapsUrl: httpUrl("Google Maps link"),
  isActive,
});

// Whole rupees. null clears the price; leaving the field out keeps what is stored.
const rupees = (label) =>
  z
    .number({ error: `${label} must be a number` })
    .int(`${label} must be in whole rupees`)
    .positive(`${label} must be more than 0`)
    .max(10_000_000, `${label} looks too large`)
    .nullable()
    .optional();

// Colour variants: each colour has its own swatch and photo. Leaving the field out keeps what is stored.
const variant = z.object({
  name: text("Colour name", 40),
  color: z.string().trim().regex(/^#[0-9a-f]{6}$/i, "Pick a swatch colour"),
  imageUrl,
});
const variants = z
  .array(variant)
  .max(12, "At most 12 colours")
  .superRefine((list, ctx) => {
    const seen = new Set();
    list.forEach((v, i) => {
      const k = v.name.toLowerCase();
      if (seen.has(k)) ctx.addIssue({ code: "custom", path: [i, "name"], message: "Each colour needs a different name" });
      seen.add(k);
    });
  })
  .optional();

const productFields = z.object({
  slug: text("Slug", 80).refine((v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v), "Use lowercase letters, numbers and hyphens only"),
  label: text("Name", 120),
  spec: text("Spec line", 200),
  imageUrl,
  points: z
    .array(text("Point", 160))
    .max(12, "At most 12 key points")
    .default([]),
  isActive,
  mrp: rupees("MRP"),
  price: rupees("Offer price"),
  variants,
});

const offerNotAboveMrp = (d, ctx) => {
  if (d.mrp != null && d.price != null && d.price > d.mrp)
    ctx.addIssue({ code: "custom", path: ["price"], message: "Offer price can't be more than the MRP" });
};

export const productSchema = productFields.superRefine(offerNotAboveMrp);

export const productCreateSchema = productFields
  .extend({ category: z.enum(["domestic", "commercial", "dispenser"]) })
  .superRefine(offerNotAboveMrp);

export const galleryItemSchema = z.object({
  imageUrl,
  name: text("Name", 120),
  isActive,
});

export const reorderSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1).max(500),
});

// ---- Catalogue (per-category digital card) ----
// Optional text: empty string means "not set" (and, for contact fields, "use the site-wide value").
const opt = (label, max) =>
  z
    .string()
    .transform(scrub)
    .pipe(
      z
        .string()
        .trim()
        .max(max, `${label} must be at most ${max} characters`)
        .refine((v) => !CODE_LIKE.test(v), `${label}: ${CODE_MSG}`)
    )
    .default("");
const optUrl = (label) => opt(label, 2000).refine((v) => v === "" || /^https?:\/\/\S+$/i.test(v), `${label} must be a full http(s) link`);
const optImage = (label) =>
  opt(label, 2000).refine((v) => v === "" || /^\/assets\/\S+$/.test(v) || /^https?:\/\/\S+$/i.test(v), `${label} must be an uploaded file or a valid link`);
const hex = (label) => z.string().trim().regex(/^#[0-9a-f]{6}$/i, `${label} must be a colour like #035eb2`);
const youtube = text("YouTube link", 2000).refine(
  (v) => /^https?:\/\/(www\.|m\.)?(youtube\.com|youtu\.be)\/\S+$/i.test(v),
  "Use a YouTube link, e.g. https://youtu.be/…"
);

export const catalogSchema = z.object({
  isPublished: z.boolean(),
  catalog: z.object({
    buttonLabel: text("Button text", 40),
    theme: z.object({
      primary: hex("Main colour"),
      accent: hex("Second colour"),
      background: z.enum(["texture", "light", "brand"]),
    }),
    header: z.object({
      logoUrl: optImage("Logo"),
      businessName: text("Business name", 80),
      personName: opt("Person name", 80),
      personTitle: opt("Person title", 60),
      tagline: opt("Tagline", 160),
    }),
    contact: z.object({
      phone: opt("Phone", 20).refine((v) => v === "" || /^\+?[\d\s-]{8,20}$/.test(v), "Enter a valid phone number, e.g. +91 98765 43210"),
      whatsapp: opt("WhatsApp number", 15).refine((v) => v === "" || /^\d{10,15}$/.test(v), "Digits only with country code, e.g. 919876543210"),
      email: opt("Email", 200).refine((v) => v === "" || z.email().safeParse(v).success, "Enter a valid email address"),
      address: opt("Address", 400),
      mapsUrl: optUrl("Google Maps link"),
      website: optUrl("Website"),
    }),
    sections: z
      .array(z.object({ key: z.enum(SECTION_KEYS), enabled: z.boolean() }))
      .refine((a) => a.length === SECTION_KEYS.length && new Set(a.map((s) => s.key)).size === SECTION_KEYS.length, "Every section must appear once"),
    links: z
      .array(
        z.object({
          type: z.enum(["facebook", "instagram", "youtube", "x", "website", "other"]),
          label: text("Link name", 60),
          sub: opt("Link note", 80),
          url: httpUrl("Link"),
        })
      )
      .max(12, "At most 12 links"),
    about: z.object({
      companyName: opt("Company name", 100),
      yearEst: opt("Year established", 10),
      nature: opt("Nature of business", 120),
      specialities: z.array(text("Speciality", 160)).max(15, "At most 15 specialities"),
      description: opt("Description", 1500),
    }),
    documents: z.array(z.object({ title: text("Document name", 80), url: httpUrl("Document link") })).max(10, "At most 10 documents"),
    products: z.object({
      mode: z.enum(["all", "selected"]),
      productIds: z.array(z.number().int().positive()).max(200),
      showSpec: z.boolean(),
      showPoints: z.boolean(),
      showPrice: z.boolean().default(true),
    }),
    payment: z.object({
      phonePe: opt("PhonePe number", 20),
      gpay: opt("Google Pay number", 20),
      upiId: opt("UPI ID", 80),
      qrImageUrl: optImage("Payment QR"),
      bankName: opt("Bank name", 80),
      ifsc: opt("IFSC code", 20),
      accountName: opt("Account name", 100),
      accountNumber: opt("Account number", 30),
      accountType: opt("Account type", 40),
    }),
    gallery: z.object({ mode: z.enum(["all", "custom"]), images: z.array(imageUrl).max(40, "At most 40 photos") }),
    videos: z.array(z.object({ title: opt("Video title", 80), youtubeUrl: youtube })).max(10, "At most 10 videos"),
    enquiry: z.object({ heading: text("Form heading", 60), buttonLabel: text("Form button text", 40) }),
  }),
});
