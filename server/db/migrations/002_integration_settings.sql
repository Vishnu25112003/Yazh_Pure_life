-- Private settings edited in the admin (never exposed by the public API).
-- Secrets inside `value` are encrypted by the server before being stored.
CREATE TABLE integration_settings (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
