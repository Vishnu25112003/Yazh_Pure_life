import { DOMESTIC_PRODUCTS } from "../data";
import { ProductCarousel } from "./ProductCarousel";

export function DomesticSection() {
  return (
    <ProductCarousel sectionId="domestic" title="Domestic water purifiers" products={DOMESTIC_PRODUCTS}>
      <div className="px-[var(--space-6)] pb-[var(--space-6)] grid gap-[var(--space-3)]">
        <span className="tag tag-accent justify-self-start">Most popular</span>
        <p className="m-0 opacity-85">
          Clean, safe drinking water for your home — RO, UV and alkaline systems, installed and serviced by our own
          technicians.
        </p>
        <div className="flex gap-[var(--space-3)] items-center flex-wrap">
          <a className="btn btn-primary" href="https://mycrd.in/yazh-pure-life-1" target="_blank" rel="noopener">
            View our purifiers
          </a>
          <a href="#consultation" className="text-link text-[14px]">
            <span className="ypl-shine">Not sure which one? Get a free consultation →</span>
          </a>
        </div>
      </div>
    </ProductCarousel>
  );
}
