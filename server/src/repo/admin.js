import { pool, query } from "../../db/pool.js";

const productOut = (r) => ({
  id: r.id,
  slug: r.slug,
  category: r.category,
  label: r.label,
  spec: r.spec,
  imageUrl: r.image_url,
  points: r.points ?? [],
  sortOrder: r.sort_order,
  isActive: r.is_active,
  updatedAt: r.updated_at,
});

const branchOut = (r) => ({
  id: r.id,
  name: r.name,
  tag: r.tag,
  address: r.address,
  mapsUrl: r.maps_url,
  sortOrder: r.sort_order,
  isActive: r.is_active,
  updatedAt: r.updated_at,
});

const galleryOut = (r) => ({
  id: r.id,
  imageUrl: r.image_url,
  name: r.name,
  sortOrder: r.sort_order,
  isActive: r.is_active,
  updatedAt: r.updated_at,
});

// Postgres unique-violation -> a typed error the routes turn into HTTP 409.
export class ConflictError extends Error {}
const wrapUnique = (e) => {
  if (e.code === "23505") throw new ConflictError("That slug is already used by another product");
  throw e;
};

// ---- Admins ----
export async function findAdminByEmail(email) {
  const { rows } = await query("SELECT id, email, password_hash FROM admins WHERE email = $1", [email.toLowerCase()]);
  return rows[0] ?? null;
}

export async function findAdminById(id) {
  const { rows } = await query("SELECT id, email FROM admins WHERE id = $1", [id]);
  return rows[0] ?? null;
}

// ---- Contact ----
export async function getContact() {
  const { rows } = await query("SELECT * FROM site_settings WHERE id = 1");
  const c = rows[0];
  return {
    phone: c.phone,
    phoneDisplay: c.phone_display,
    whatsapp: c.whatsapp,
    email: c.email,
    address: c.address,
    hours: c.hours,
    mycrd: c.mycrd,
    updatedAt: c.updated_at,
  };
}

export async function updateContact(d) {
  await query(
    `UPDATE site_settings SET phone=$1, phone_display=$2, whatsapp=$3, email=$4, address=$5, hours=$6, mycrd=$7, updated_at=now()
     WHERE id = 1`,
    [d.phone, d.phoneDisplay, d.whatsapp, d.email, d.address, d.hours, d.mycrd]
  );
  return getContact();
}

// ---- Products (domestic / commercial / dispenser) ----
export async function listProducts(category) {
  const { rows } = await query("SELECT * FROM products WHERE category = $1 ORDER BY sort_order, id", [category]);
  return rows.map(productOut);
}

export async function createProduct(d) {
  try {
    const { rows } = await query(
      `INSERT INTO products (slug, category, label, spec, image_url, points, is_active, sort_order)
       VALUES ($1,$2,$3,$4,$5,$6,$7, COALESCE((SELECT MAX(sort_order) + 1 FROM products WHERE category = $2), 0))
       RETURNING *`,
      [d.slug, d.category, d.label, d.spec, d.imageUrl, d.points.length ? d.points : null, d.isActive]
    );
    return productOut(rows[0]);
  } catch (e) {
    wrapUnique(e);
  }
}

// Category is fixed after creation; the slug can change but it is the public share link.
export async function updateProduct(id, d) {
  try {
    const { rows } = await query(
      `UPDATE products SET slug=$2, label=$3, spec=$4, image_url=$5, points=$6, is_active=$7, updated_at=now()
       WHERE id = $1 RETURNING *`,
      [id, d.slug, d.label, d.spec, d.imageUrl, d.points.length ? d.points : null, d.isActive]
    );
    return rows[0] ? productOut(rows[0]) : null;
  } catch (e) {
    wrapUnique(e);
  }
}

export async function deleteProduct(id) {
  return (await query("DELETE FROM products WHERE id = $1", [id])).rowCount > 0;
}

// ---- Branches ----
export async function listBranches() {
  const { rows } = await query("SELECT * FROM branches ORDER BY sort_order, id");
  return rows.map(branchOut);
}

export async function createBranch(d) {
  const { rows } = await query(
    `INSERT INTO branches (name, tag, address, maps_url, is_active, sort_order)
     VALUES ($1,$2,$3,$4,$5, COALESCE((SELECT MAX(sort_order) + 1 FROM branches), 0)) RETURNING *`,
    [d.name, d.tag, d.address, d.mapsUrl, d.isActive]
  );
  return branchOut(rows[0]);
}

export async function updateBranch(id, d) {
  const { rows } = await query(
    `UPDATE branches SET name=$2, tag=$3, address=$4, maps_url=$5, is_active=$6, updated_at=now() WHERE id=$1 RETURNING *`,
    [id, d.name, d.tag, d.address, d.mapsUrl, d.isActive]
  );
  return rows[0] ? branchOut(rows[0]) : null;
}

export async function deleteBranch(id) {
  return (await query("DELETE FROM branches WHERE id = $1", [id])).rowCount > 0;
}

// ---- Gallery ----
export async function listGallery() {
  const { rows } = await query("SELECT * FROM gallery_images ORDER BY sort_order, id");
  return rows.map(galleryOut);
}

export async function createGalleryItem(d) {
  const { rows } = await query(
    `INSERT INTO gallery_images (image_url, name, is_active, sort_order)
     VALUES ($1,$2,$3, COALESCE((SELECT MAX(sort_order) + 1 FROM gallery_images), 0)) RETURNING *`,
    [d.imageUrl, d.name, d.isActive]
  );
  return galleryOut(rows[0]);
}

export async function updateGalleryItem(id, d) {
  const { rows } = await query(
    `UPDATE gallery_images SET image_url=$2, name=$3, is_active=$4, updated_at=now() WHERE id=$1 RETURNING *`,
    [id, d.imageUrl, d.name, d.isActive]
  );
  return rows[0] ? galleryOut(rows[0]) : null;
}

export async function deleteGalleryItem(id) {
  return (await query("DELETE FROM gallery_images WHERE id = $1", [id])).rowCount > 0;
}

// ---- Reorder: ids in the new order; only rows that belong to the scope are touched ----
const REORDER_SQL = {
  products: `UPDATE products t SET sort_order = x.ord, updated_at = now()
             FROM unnest($1::int[]) WITH ORDINALITY AS x(id, ord) WHERE t.id = x.id AND t.category = $2`,
  branches: `UPDATE branches t SET sort_order = x.ord, updated_at = now()
             FROM unnest($1::int[]) WITH ORDINALITY AS x(id, ord) WHERE t.id = x.id`,
  gallery: `UPDATE gallery_images t SET sort_order = x.ord, updated_at = now()
            FROM unnest($1::int[]) WITH ORDINALITY AS x(id, ord) WHERE t.id = x.id`,
};

export async function reorder(table, ids, category) {
  const params = table === "products" ? [ids, category] : [ids];
  await pool.query(REORDER_SQL[table], params);
}

// ---- Dashboard ----
export async function getDashboard() {
  const [counts, recent, noPoints] = await Promise.all([
    query(`
      SELECT 'domestic' AS section, count(*)::int AS total, count(*) FILTER (WHERE is_active)::int AS active FROM products WHERE category='domestic'
      UNION ALL SELECT 'commercial', count(*)::int, count(*) FILTER (WHERE is_active)::int FROM products WHERE category='commercial'
      UNION ALL SELECT 'dispenser', count(*)::int, count(*) FILTER (WHERE is_active)::int FROM products WHERE category='dispenser'
      UNION ALL SELECT 'gallery', count(*)::int, count(*) FILTER (WHERE is_active)::int FROM gallery_images
      UNION ALL SELECT 'branches', count(*)::int, count(*) FILTER (WHERE is_active)::int FROM branches`),
    query(`
      SELECT * FROM (
        SELECT 'product' AS type, category AS section, id, label AS title, updated_at FROM products
        UNION ALL SELECT 'gallery', 'gallery', id, name, updated_at FROM gallery_images
        UNION ALL SELECT 'branch', 'branches', id, name, updated_at FROM branches
        UNION ALL SELECT 'contact', 'contact', 1, 'Contact details', updated_at FROM site_settings
      ) u ORDER BY updated_at DESC LIMIT 10`),
    query(`SELECT id, label FROM products WHERE category = 'domestic' AND (points IS NULL OR cardinality(points) = 0) ORDER BY id`),
  ]);

  const sections = Object.fromEntries(counts.rows.map((r) => [r.section, { total: r.total, active: r.active }]));
  return {
    sections,
    recent: recent.rows.map((r) => ({
      type: r.type,
      section: r.section,
      id: r.id,
      title: r.title,
      updatedAt: r.updated_at,
    })),
    attention: [
      ...Object.entries(sections)
        .filter(([, s]) => s.total > s.active)
        .map(([section, s]) => ({ section, message: `${s.total - s.active} hidden item(s) not shown on the site` })),
      ...noPoints.rows.map((r) => ({ section: "domestic", message: `"${r.label}" has no key points` })),
    ],
  };
}
