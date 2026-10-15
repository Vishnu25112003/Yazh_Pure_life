import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { HttpError } from "./http.js";
import { getStoredCloudinary } from "./repo/settings.js";

// Credentials come from the admin Settings page (database); CLOUDINARY_URL in .env is a fallback.
// `source` is what is currently applied to the SDK; cleared whenever settings change.
let applied = null;

export function resetCloudinaryConfig() {
  applied = null;
}

// Applies the active credentials to the SDK. Returns the source ("database" | "env") or null.
export async function configureCloudinary() {
  if (applied !== null) return applied || null;
  const stored = await getStoredCloudinary();
  if (stored) {
    cloudinary.config({ cloud_name: stored.cloudName, api_key: stored.apiKey, api_secret: stored.apiSecret, secure: true });
    applied = "database";
  } else if (process.env.CLOUDINARY_URL) {
    cloudinary.config(true); // re-read CLOUDINARY_URL
    applied = "env";
  } else {
    applied = "";
  }
  return applied || null;
}

// Checks candidate credentials against Cloudinary without saving anything.
export async function testCloudinary({ cloudName, apiKey, apiSecret }) {
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true });
  try {
    await cloudinary.api.ping();
    return true;
  } catch {
    return false;
  } finally {
    resetCloudinaryConfig(); // go back to the saved credentials on next use
  }
}

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 20 },
  fileFilter: (_req, file, cb) =>
    ALLOWED.has(file.mimetype) ? cb(null, true) : cb(new HttpError(400, "Only JPG, PNG, WebP, GIF or AVIF images are allowed")),
}).array("files", 20);

const SECTIONS = new Set(["domestic", "commercial", "dispenser", "gallery"]);

// Uploads one in-memory file to Cloudinary and returns an auto-optimised (format + quality) delivery URL.
export async function uploadToCloudinary(file, section) {
  if (!(await configureCloudinary())) throw new HttpError(503, "Image upload is not set up yet. Add Cloudinary details in Settings.");
  const folder = `yazh/${SECTIONS.has(section) ? section : "misc"}`;
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: "image" }, (err, result) => {
        if (err || !result) return reject(new HttpError(502, "Image upload failed. Check the Cloudinary details in Settings."));
        resolve(result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"));
      })
      .end(file.buffer);
  });
}
