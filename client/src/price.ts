// Product price display rules, shared by the home page, the catalogue and the admin preview.
// Prices are whole rupees. Nothing is shown unless admin has entered at least one of them.

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
export const formatINR = (n: number) => inr.format(n);

export interface PriceView {
  /** What the customer pays (the offer price, or the MRP when there is no offer). */
  now: number;
  /** MRP shown struck through, only when there is a real discount. */
  was?: number;
  /** Whole-number percentage saved, only when there is a real discount. */
  off?: number;
  /** "MRP" label in front of a price that has no offer. */
  isMrpOnly?: boolean;
}

export function priceView(mrp?: number | null, price?: number | null): PriceView | null {
  const m = mrp && mrp > 0 ? mrp : undefined;
  const p = price && price > 0 ? price : undefined;
  if (!m && !p) return null;
  if (m && p && p < m) {
    const off = Math.floor(((m - p) / m) * 100);
    return { now: p, was: m, ...(off >= 1 ? { off } : {}) };
  }
  if (p) return { now: p };
  return { now: m!, isMrpOnly: true };
}
