-- Optional colour variants per product: [{ "name": "Black", "color": "#1f2937", "imageUrl": "https://..." }].
-- Additive only: every existing product gets an empty list and looks exactly as before.
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS variants jsonb NOT NULL DEFAULT '[]'::jsonb;
