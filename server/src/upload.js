import { cloudinaryCreds } from "./cloudinaryEnv.js"; // keep first: cleans the env before the SDK loads
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { HttpError } from "./http.js";

const creds = cloudinaryCreds;
if (creds) cloudinary.config({ ...creds, secure: true });

export const uploadsEnabled = () => Boolean(creds);

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 20 },
  fileFilter: (_req, file, cb) =>
    ALLOWED.has(file.mimetype) ? cb(null, true) : cb(new HttpError(400, "Only JPG, PNG, WebP, GIF or AVIF images are allowed")),
}).array("files", 20);

const SECTIONS = new Set(["domestic", "commercial", "dispenser", "gallery", "catalog"]);

// Turns a Cloudinary error into a message the admin can act on (never includes the secret).
function uploadErrorMessage(err) {
  const msg = String(err?.message || "");
  if (/api_key|api key|signature|cloud_name|cloud name|unknown api|disabled account|401|403/i.test(msg) ||
      [401, 403].includes(err?.http_code)) {
    return `Image storage (Cloudinary) rejected the server's login: ${msg || "invalid credentials"}. Check CLOUDINARY_URL on the server.`;
  }
  if (/timeout|ETIMEDOUT|ECONNRESET|ENOTFOUND/i.test(msg)) return "Image storage didn't respond in time. Please try again.";
  return `Image upload failed${msg ? `: ${msg}` : ""}. Please try again.`;
}

// Uploads one in-memory file to Cloudinary and returns an auto-optimised (format + quality) delivery URL.
export function uploadToCloudinary(file, section) {
  const folder = `yazh/${SECTIONS.has(section) ? section : "misc"}`;
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: "image", timeout: 60_000 }, (err, result) => {
        if (err || !result) {
          console.error("Cloudinary upload error:", err?.http_code ?? "", err?.message ?? err);
          return reject(new HttpError(502, uploadErrorMessage(err)));
        }
        resolve(result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"));
      })
      .end(file.buffer);
  });
}
