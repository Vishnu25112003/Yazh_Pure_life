import { OWN_BRAND, SERVICE_BRANDS } from "../data";
import { ServiceIcon, WrenchIcon } from "./icons";

// Repeat a short list until one half of the loop is long enough to fill a wide row without a gap.
const MIN_HALF = 12;

function fillHalf(brands: string[]): string[] {
  const half = [...brands];
  while (half.length < MIN_HALF) half.push(...brands);
  return half;
}

// Every brand in one list — own brand first — for a single continuous row.
const ALL_BRANDS = [OWN_BRAND, ...SERVICE_BRANDS.flatMap((group) => group.brands).filter((b) => b !== OWN_BRAND)];

export function BrandMarquee() {
  const half = fillHalf(ALL_BRANDS);
  // Two copies of the half make the loop seamless; only the first real list is read by screen readers.
  const loop = [...half, ...half];

  return (
    <div className="brand-marquee">
      <div className="brand-marquee-head">
        <span className="brand-marquee-tag">
          <WrenchIcon size={20} /> Service for every brand
        </span>
        <p className="brand-marquee-sub">
          We repair and service our own Yazh Pure Life purifiers and every other major brand — RO, UV, UF and alkaline.
        </p>
      </div>

      <div className="brand-row">
        <div className="brand-viewport">
          <ul className="brand-track" style={{ animationDuration: `${half.length * 2.6}s` }}>
            {loop.map((brand, i) => {
              const isCopy = i >= ALL_BRANDS.length;
              const isOwn = brand === OWN_BRAND;
              return (
                <li key={i} className={`brand-chip${isOwn ? " is-own" : ""}`} aria-hidden={isCopy || undefined}>
                  {brand}
                  {isOwn && <span className="brand-chip-badge">Our brand</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <a className="btn btn-light" href="#service">
        <ServiceIcon size={24} />
        <span className="ypl-shine">Book a service for any brand</span>
      </a>
    </div>
  );
}
