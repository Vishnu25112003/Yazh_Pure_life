import { COMMERCIAL } from "../data";
import { ProductCarousel } from "./ProductCarousel";

export function CommercialSection() {
  return (
    <ProductCarousel sectionId="commercial" title="Commercial water purifiers" products={COMMERCIAL} direction="right">
      <div className="px-[var(--space-6)] pb-[var(--space-6)] grid gap-[var(--space-3)]">
        <p className="m-0 opacity-85">
          Healthy water at scale — plants for restaurants, offices, hostels, schools, hospitals and industry,
          designed, installed and serviced by our own technicians.
        </p>
        <div className="flex gap-[var(--space-3)] items-center flex-wrap">
          <a className="btn btn-primary" href="#consultation">
            Get a free quote
          </a>
        </div>
      </div>
    </ProductCarousel>
  );
}
