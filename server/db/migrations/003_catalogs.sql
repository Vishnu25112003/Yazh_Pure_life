-- Per-category digital catalogue (mycrd-style card) content, edited from the admin panel.
-- Additive only: no existing table is changed. Empty `data` means "use the defaults"
-- (see server/src/catalog.js), so the three catalogues work before anyone edits them.
CREATE TABLE IF NOT EXISTS catalogs (
  category     text PRIMARY KEY CHECK (category IN ('domestic', 'commercial', 'dispenser')),
  data         jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_published boolean NOT NULL DEFAULT true,
  updated_at   timestamptz NOT NULL DEFAULT now()
);

INSERT INTO catalogs (category) VALUES ('domestic'), ('commercial'), ('dispenser')
ON CONFLICT (category) DO NOTHING;
