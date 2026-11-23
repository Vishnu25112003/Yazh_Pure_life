import type { CSSProperties, KeyboardEvent } from "react";
import type { ProductVariant } from "../types";

/** The photo to show for a product: the chosen colour's photo, else the main photo. */
export function variantImage(src: string, variants: ProductVariant[] | undefined, index: number): string {
  return variants?.[index]?.imageUrl || variants?.[0]?.imageUrl || src;
}

/**
 * Colour picker for a product with colour variants: round swatches that switch the product photo.
 * A radio group, so arrow keys move between colours. `sm` for cards, `lg` for the product popup.
 */
export function ColorSwatches({
  variants,
  value,
  onChange,
  size = "sm",
  productLabel,
  className = "",
}: {
  variants: ProductVariant[] | undefined;
  value: number;
  onChange: (index: number) => void;
  size?: "sm" | "lg";
  productLabel: string;
  className?: string;
}) {
  if (!variants || variants.length === 0) return null;
  const current = variants[value] ?? variants[0];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (value + step + variants.length) % variants.length;
    onChange(next);
    (e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=radio]")[next])?.focus();
  };

  return (
    <div className={`ypl-swatches ypl-swatches-${size} ${className}`} onClick={(e) => e.stopPropagation()}>
      {size === "lg" && (
        <div className="ypl-swatches-label">
          Colour: <strong>{current.name}</strong>
        </div>
      )}
      <div className="ypl-swatches-row" role="radiogroup" aria-label={`${productLabel} colours`} onKeyDown={onKey}>
        {variants.map((v, i) => (
          <button
            key={v.name}
            type="button"
            role="radio"
            aria-checked={i === value}
            aria-label={v.name}
            title={v.name}
            tabIndex={i === value ? 0 : -1}
            className="ypl-swatch"
            style={{ "--swatch": v.color } as CSSProperties}
            onClick={() => onChange(i)}
          />
        ))}
      </div>
      {size === "sm" && <div className="ypl-swatches-name">{current.name}</div>}
    </div>
  );
}
