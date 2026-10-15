import crypto from "node:crypto";

// AES-256-GCM with a key derived from SESSION_SECRET (or ENCRYPTION_KEY if set).
// Changing that secret makes stored values undecryptable; callers treat that as "not configured".
const key = () =>
  crypto.scryptSync(process.env.ENCRYPTION_KEY || process.env.SESSION_SECRET, "yazh-integration-settings", 32);

export function encrypt(plain) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return ["v1", iv, cipher.getAuthTag(), data].map((p) => (Buffer.isBuffer(p) ? p.toString("base64") : p)).join(":");
}

export function decrypt(payload) {
  try {
    const [version, iv, tag, data] = payload.split(":");
    if (version !== "v1") return null;
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "base64"));
    decipher.setAuthTag(Buffer.from(tag, "base64"));
    return Buffer.concat([decipher.update(Buffer.from(data, "base64")), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}
