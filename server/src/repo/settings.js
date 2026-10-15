import { query } from "../../db/pool.js";
import { decrypt, encrypt } from "../crypto.js";

// Returns { cloudName, apiKey, apiSecret } saved in the database, or null.
export async function getStoredCloudinary() {
  const { rows } = await query("SELECT value FROM integration_settings WHERE key = 'cloudinary'");
  if (!rows[0]) return null;
  const { cloudName, apiKey, secretEnc } = rows[0].value;
  const apiSecret = decrypt(secretEnc);
  return apiSecret ? { cloudName, apiKey, apiSecret } : null;
}

export async function saveCloudinary({ cloudName, apiKey, apiSecret }) {
  const value = { cloudName, apiKey, secretEnc: encrypt(apiSecret) };
  await query(
    `INSERT INTO integration_settings (key, value) VALUES ('cloudinary', $1)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [JSON.stringify(value)]
  );
}

export async function deleteCloudinary() {
  await query("DELETE FROM integration_settings WHERE key = 'cloudinary'");
}
