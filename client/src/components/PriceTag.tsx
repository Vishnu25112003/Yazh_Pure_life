import { formatINR, priceView } from "../price";

/** Offer price in bold with the MRP struck through. `lg` adds the saving, for the product popup. */
export function PriceTag({ mrp, price, size = "sm", className = "" }: { mrp?: number; price?: number; size?: "sm" | "lg"; className?: string }) {
  const v = priceView(mrp, price);
  if (!v) return null;
  return (
    <div className={`ypl-price ypl-price-${size} ${className}`}>
      <div className="ypl-price-row">
        <span className="ypl-price-now">
          {v.isMrpOnly ? <span className="ypl-price-label">MRP </span> : v.was && <span className="sr-only">Offer price </span>}
          {formatINR(v.now)}
        </span>
        {v.was && (
          <s className="ypl-price-was">
            <span className="sr-only">MRP </span>
            {formatINR(v.was)}
          </s>
        )}
        {size === "lg" && v.off ? <span className="ypl-price-off">{v.off}% off</span> : null}
      </div>
      {size === "lg" && v.was && (
        <div className="ypl-price-save">
          You save <strong>{formatINR(v.was - v.now)}</strong>
        </div>
      )}
    </div>
  );
}

/** "30% OFF" corner badge for a product photo; renders nothing without a real discount. */
export function OffBadge({ mrp, price }: { mrp?: number; price?: number }) {
  const off = priceView(mrp, price)?.off;
  return off ? <span className="ypl-off-badge">{off}% OFF</span> : null;
}
