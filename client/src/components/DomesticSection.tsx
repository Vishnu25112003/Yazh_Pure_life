import { useSite } from "../site";
import { ProductCarousel } from "./ProductCarousel";

export function DomesticSection() {
  const { domesticProducts, contact } = useSite();
  return (
    <ProductCarousel sectionId="domestic" title="Domestic RO water purifiers in Chennai" products={domesticProducts}>
      <div className="px-[var(--space-6)] pb-[var(--space-6)] grid gap-[var(--space-3)]">
        <span className="tag tag-accent justify-self-start">Most popular</span>
        <p className="m-0 opacity-85">
          Looking for the best RO water purifier for your home in Chennai? Choose from RO, RO + UV, RO + UF and
          alkaline water purifiers for safe, healthy drinking water — with expert installation, genuine spares and
          on-time service by our own technicians in Kolathur, Avadi and across Chennai.
        </p>
        <div className="flex gap-[var(--space-3)] items-center flex-wrap">
          <a className="btn btn-primary" href={contact.mycrd} target="_blank" rel="noopener">
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
