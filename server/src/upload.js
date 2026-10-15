import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { HttpError } from "./http.js";

export const uploadsEnabled = () => Boolean(process.env.CLOUDINARY_URL);

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 20 },
  fileFilter: (_req, file, cb) =>
    ALLOWED.has(file.mimetype) ? cb(null, true) : cb(new HttpError(400, "Only JPG, PNG, WebP, GIF or AVIF images are allowed")),
}).array("files", 20);

const SECTIONS = new Set(["domestic", "commercial", "dispenser", "gallery"]);

// Uploads one in-memory file to Cloudinary and returns an auto-optimised (format + quality) delivery URL.
export function uploadToCloudinary(file, section) {
  const folder = `yazh/${SECTIONS.has(section) ? section : "misc"}`;
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: "image" }, (err, result) => {
        if (err || !result) return reject(new HttpError(502, "Image upload failed. Please try again."));
        resolve(result.secure_url.replace("/upload/", "/upload/f_auto,q_auto/"));
      })
      .end(file.buffer);
  });
}
