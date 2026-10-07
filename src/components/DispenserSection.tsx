import { DISPENSERS } from "../data";
import { ProductCarousel } from "./ProductCarousel";

export function DispenserSection() {
  return (
    <ProductCarousel sectionId="dispenser" title="Water dispensers" products={DISPENSERS}>
      <div className="px-[var(--space-6)] pb-[var(--space-6)] grid gap-[var(--space-3)]">
        <p className="m-0 opacity-85">
          Hot, cold and normal water on tap — table-top and floor-standing dispensers for homes, and stainless steel
          water coolers for offices, schools and factories, installed and serviced by our own technicians.
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
