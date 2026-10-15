CREATE TABLE admins (
  id            serial PRIMARY KEY,
  email         text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Single-row table (id is always 1).
CREATE TABLE site_settings (
  id            smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  phone         text NOT NULL,
  phone_display text NOT NULL,
  whatsapp      text NOT NULL,
  email         text NOT NULL,
  address       text NOT NULL,
  hours         text NOT NULL,
  mycrd         text NOT NULL,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE branches (
  id         serial PRIMARY KEY,
  name       text NOT NULL,
  tag        text NOT NULL DEFAULT 'Branch',
  address    text NOT NULL,
  maps_url   text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Domestic, commercial and dispenser products share one table.
CREATE TABLE products (
  id         serial PRIMARY KEY,
  slug       text NOT NULL UNIQUE,
  category   text NOT NULL CHECK (category IN ('domestic', 'commercial', 'dispenser')),
  label      text NOT NULL,
  spec       text NOT NULL,
  image_url  text NOT NULL,
  points     text[],
  sort_order integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX products_category_sort_idx ON products (category, sort_order);

CREATE TABLE gallery_images (
  id         serial PRIMARY KEY,
  image_url  text NOT NULL,
  name       text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_active  boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX gallery_sort_idx ON gallery_images (sort_order);

-- Free-form content not (yet) edited in admin: ownBrand, serviceBrands, whyChooseUs.
CREATE TABLE site_content (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- connect-pg-simple session store.
CREATE TABLE "session" (
  "sid"    varchar NOT NULL PRIMARY KEY,
  "sess"   json NOT NULL,
  "expire" timestamp(6) NOT NULL
);
CREATE INDEX "IDX_session_expire" ON "session" ("expire");
