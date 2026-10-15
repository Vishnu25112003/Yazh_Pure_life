import { query } from "../../db/pool.js";
import { resolveSite } from "../resolve.js";

export const PRODUCT_SECTION_KEYS = {
  domestic: "domesticProducts",
  commercial: "commercial",
  dispenser: "dispensers",
};

// Builds the exact JSON shape the public client expects (see client/src/types.ts SiteData).
export async function buildPublicSite() {
  const [contact, branches, products, gallery, content] = await Promise.all([
    query("SELECT * FROM site_settings WHERE id = 1"),
    query("SELECT name, tag, address, maps_url FROM branches WHERE is_active ORDER BY sort_order, id"),
    query(
      "SELECT slug, category, label, spec, image_url, points FROM products WHERE is_active ORDER BY category, sort_order, id"
    ),
    query("SELECT image_url, name FROM gallery_images WHERE is_active ORDER BY sort_order, id"),
    query("SELECT key, value FROM site_content"),
  ]);

  const c = contact.rows[0];
  const site = {
    contact: {
      phone: c.phone,
      phoneDisplay: c.phone_display,
      whatsapp: c.whatsapp,
      email: c.email,
      address: c.address,
      hours: c.hours,
      mycrd: c.mycrd,
    },
    branches: branches.rows.map((b) => ({ name: b.name, tag: b.tag, address: b.address, mapsUrl: b.maps_url })),
    domesticProducts: [],
    commercial: [],
    dispensers: [],
    gallery: gallery.rows.map((g) => ({ src: g.image_url, name: g.name })),
  };
  for (const p of products.rows) {
    site[PRODUCT_SECTION_KEYS[p.category]].push({
      id: p.slug,
      label: p.label,
      spec: p.spec,
      src: p.image_url,
      ...(p.points?.length ? { points: p.points } : {}),
    });
  }
  for (const row of content.rows) site[row.key] = row.value;

  return resolveSite(site);
}
