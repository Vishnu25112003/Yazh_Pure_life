import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import bcrypt from "bcryptjs";
import { pool } from "./pool.js";

const SITE_JSON = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/site.json");

const PRODUCT_SECTIONS = [
  ["domestic", "domesticProducts"],
  ["commercial", "commercial"],
  ["dispenser", "dispensers"],
];

// Idempotent and non-destructive: never overwrites or duplicates rows that already exist,
// so re-running after edits in the admin panel is safe.
export async function seed() {
  const site = JSON.parse(await fs.readFile(SITE_JSON, "utf8"));
  const client = await pool.connect();
  const added = {};
  try {
    await client.query("BEGIN");

    const c = site.contact;
    added.contact = (
      await client.query(
        `INSERT INTO site_settings (id, phone, phone_display, whatsapp, email, address, hours, mycrd)
         VALUES (1, $1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
        [c.phone, c.phoneDisplay, c.whatsapp, c.email, c.address, c.hours, c.mycrd]
      )
    ).rowCount;

    // Tables without a natural key are only seeded when empty.
    const isEmpty = async (table) => (await client.query(`SELECT 1 FROM ${table} LIMIT 1`)).rowCount === 0;

    added.branches = 0;
    if (await isEmpty("branches")) {
      for (const [i, b] of site.branches.entries()) {
        await client.query(
          `INSERT INTO branches (name, tag, address, maps_url, sort_order) VALUES ($1, $2, $3, $4, $5)`,
          [b.name, b.tag, b.address, b.mapsUrl, i]
        );
        added.branches++;
      }
    }

    added.products = 0;
    for (const [category, key] of PRODUCT_SECTIONS) {
      for (const [i, p] of site[key].entries()) {
        added.products += (
          await client.query(
            `INSERT INTO products (slug, category, label, spec, image_url, points, sort_order)
             VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (slug) DO NOTHING`,
            [p.id, category, p.label, p.spec, p.src, p.points ?? null, i]
          )
        ).rowCount;
      }
    }

    added.gallery = 0;
    if (await isEmpty("gallery_images")) {
      for (const [i, g] of site.gallery.entries()) {
        await client.query(`INSERT INTO gallery_images (image_url, name, sort_order) VALUES ($1, $2, $3)`, [g.src, g.name, i]);
        added.gallery++;
      }
    }

    added.content = 0;
    for (const key of ["ownBrand", "serviceBrands", "whyChooseUs"]) {
      added.content += (
        await client.query(`INSERT INTO site_content (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING`, [
          key,
          JSON.stringify(site[key]),
        ])
      ).rowCount;
    }

    const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    added.admin = 0;
    if (ADMIN_EMAIL && ADMIN_PASSWORD) {
      const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
      added.admin = (
        await client.query(`INSERT INTO admins (email, password_hash) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING`, [
          ADMIN_EMAIL.toLowerCase(),
          hash,
        ])
      ).rowCount;
    } else {
      console.warn("ADMIN_EMAIL / ADMIN_PASSWORD not set - no admin account created.");
    }

    await client.query("COMMIT");
    console.log("seeded (rows newly added):", added);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  seed()
    .then(() => pool.end())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
