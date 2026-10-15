import { DISPENSERS } from "../data";
import { ProductCarousel } from "./ProductCarousel";

export function DispenserSection() {
  return (
    <ProductCarousel sectionId="dispenser" title="Water dispensers & coolers in Chennai" products={DISPENSERS}>
      <div className="px-[var(--space-6)] pb-[var(--space-6)] grid gap-[var(--space-3)]">
        <p className="m-0 opacity-85">
          Looking for a water dispenser in Chennai? Yazh Pure Life offers quality water dispensers and coolers for
          homes, offices, schools, hostels and factories — with expert installation and on-time service by our own
          technicians.
        </p>
        <div className="flex gap-[var(--space-3)] items-center flex-wrap">
          <a href="#consultation" className="text-link text-[14px]">
            <span className="ypl-shine">Not sure which one? Get a free consultation →</span>
          </a>
        </div>
      </div>
    </ProductCarousel>
  );
}
