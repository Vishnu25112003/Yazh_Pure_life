import { query } from "../../db/pool.js";
import { mergeCatalog } from "../catalog.js";

// Site-wide inputs a catalogue falls back to. The client's resolveCatalog() turns catalogue + these
// into what is shown, so the public page and the admin live preview always agree.
async function catalogInputs(category, { includeHidden = false } = {}) {
  const [settings, branch, products, gallery] = await Promise.all([
    query("SELECT phone, phone_display, whatsapp, email, address, hours FROM site_settings WHERE id = 1"),
    query("SELECT maps_url FROM branches WHERE is_active ORDER BY sort_order, id LIMIT 1"),
    query(
      `SELECT id, slug, label, spec, image_url, points, is_active FROM products
       WHERE category = $1 ${includeHidden ? "" : "AND is_active"} ORDER BY sort_order, id`,
      [category]
    ),
    query("SELECT image_url, name FROM gallery_images WHERE is_active ORDER BY sort_order, id"),
  ]);
  const c = settings.rows[0];
  return {
    siteContact: {
      phone: c.phone,
      phoneDisplay: c.phone_display,
      whatsapp: c.whatsapp,
      email: c.email,
      address: c.address,
      hours: c.hours,
      mapsUrl: branch.rows[0]?.maps_url ?? "",
    },
    products: products.rows.map((p) => ({
      dbId: p.id,
      id: p.slug,
      label: p.label,
      spec: p.spec,
      src: p.image_url,
      points: p.points ?? [],
      isActive: p.is_active,
    })),
    gallery: gallery.rows.map((g) => ({ src: g.image_url, name: g.name })),
  };
}

async function getRow(category) {
  const { rows } = await query("SELECT data, is_published, updated_at FROM catalogs WHERE category = $1", [category]);
  return rows[0] ?? null;
}

// Public page: null when the catalogue is missing or unpublished.
export async function getPublicCatalog(category) {
  const row = await getRow(category);
  if (!row?.is_published) return null;
  return { category, catalog: mergeCatalog(row.data, category), ...(await catalogInputs(category)) };
}

// Admin editor: the full merged catalogue plus every product (hidden ones too) for the picker.
export async function getAdminCatalog(category) {
  const row = await getRow(category);
  return {
    category,
    isPublished: row ? row.is_published : true,
    updatedAt: row?.updated_at ?? null,
    catalog: mergeCatalog(row?.data, category),
    ...(await catalogInputs(category, { includeHidden: true })),
  };
}

export async function updateCatalog(category, { isPublished, catalog }) {
  await query(
    `INSERT INTO catalogs (category, data, is_published, updated_at) VALUES ($1, $2, $3, now())
     ON CONFLICT (category) DO UPDATE SET data = EXCLUDED.data, is_published = EXCLUDED.is_published, updated_at = now()`,
    [category, JSON.stringify(catalog), isPublished]
  );
  return getAdminCatalog(category);
}

// Home page buttons: label + whether to show each one.
export async function catalogSummaries() {
  const { rows } = await query("SELECT category, data, is_published FROM catalogs");
  const out = {};
  for (const r of rows) out[r.category] = { label: mergeCatalog(r.data, r.category).buttonLabel, published: r.is_published };
  return out;
}
