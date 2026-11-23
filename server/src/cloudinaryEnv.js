// Must be imported BEFORE the "cloudinary" package: the SDK reads CLOUDINARY_URL when it loads and throws
// (crashing the server) if the value isn't exactly cloudinary://API_KEY:API_SECRET@CLOUD_NAME.
// Hosting dashboards make it easy to paste it with quotes, spaces or the "CLOUDINARY_URL=" prefix, so we
// parse it ourselves and hand the SDK clean credentials instead.
export function parseCloudinaryUrl(raw) {
  let v = String(raw ?? "").trim();
  v = v.replace(/^CLOUDINARY_URL\s*=\s*/i, "").trim();
  v = v.replace(/^["'`]+|["'`]+$/g, "").trim();
  const m = /^cloudinary:\/\/([^:@\s]+):([^@\s]+)@([^/?#\s]+)\/?$/i.exec(v);
  if (!m) return null;
  return { api_key: decodeURIComponent(m[1]), api_secret: decodeURIComponent(m[2]), cloud_name: m[3] };
}

export const cloudinaryCreds = parseCloudinaryUrl(process.env.CLOUDINARY_URL);

if (!cloudinaryCreds && process.env.CLOUDINARY_URL) {
  console.error("CLOUDINARY_URL is set but not in the form cloudinary://API_KEY:API_SECRET@CLOUD_NAME - uploads are disabled.");
}
delete process.env.CLOUDINARY_URL;
