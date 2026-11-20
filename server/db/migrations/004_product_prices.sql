-- Optional product prices in whole rupees. NULL means "no price shown"; existing rows are untouched.
-- mrp = printed maximum retail price (shown struck through); price = the offer price customers pay.
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS mrp integer CHECK (mrp IS NULL OR mrp > 0),
  ADD COLUMN IF NOT EXISTS price integer CHECK (price IS NULL OR price > 0);
