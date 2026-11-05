import { useSite } from "../site";
import { ProductCarousel } from "./ProductCarousel";

export function CommercialSection() {
  const { commercial, catalogs } = useSite();
  return (
    <ProductCarousel sectionId="commercial" title="Commercial RO plants in Chennai" products={commercial} direction="right">
      <div className="px-[var(--space-6)] pb-[var(--space-6)] grid gap-[var(--space-3)]">
        <p className="m-0 opacity-85">
          Commercial RO plants in Chennai from 250 to 1000 LPH — reliable water purification for restaurants,
          offices, hostels, schools, hospitals and industries. Designed, installed and maintained by our own
          technicians, with AMC support.
        </p>
        <div className="flex gap-[var(--space-3)] items-center flex-wrap">
          {catalogs?.commercial?.published && (
            <a className="btn btn-primary" href="/catalog/commercial">
              {catalogs.commercial.label}
            </a>
          )}
          <a href="#consultation" className="text-link text-[14px]">
            <span className="ypl-shine">Not sure which one? Get a free consultation →</span>
          </a>
        </div>
      </div>
    </ProductCarousel>
  );
}
