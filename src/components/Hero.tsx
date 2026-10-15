import { BrandMarquee } from "./BrandMarquee";

export function Hero() {
  return (
    <div
      className="text-white"
      style={{ background: "linear-gradient(135deg, var(--color-accent-800), var(--color-accent-500))" }}
    >
      <div className="max-w-[640px] dsk:max-w-[1240px] mx-auto pt-[calc(var(--space-8)*1.4)] px-[var(--space-4)] pb-[var(--space-8)] text-center grid gap-[var(--space-3)] justify-items-center">
        <h1 className="text-[34px] mt-[var(--space-2)] mb-0 max-w-[640px]">
          Yazh RO - for healthy water
        </h1>
        <p className="opacity-90 max-w-[720px] grid gap-[var(--space-1)]">
          <span>
            Yazh Pure Life is one of Chennai's trusted RO water purifier dealers, bringing high-quality, innovative
            purification to homes, schools, colleges, corporates and commercial businesses.
          </span>
          <span>
            From easy installation and periodic maintenance to on-time after-sales service at affordable prices, we
            are built on 100% customer satisfaction.
          </span>
        </p>
        <BrandMarquee />
      </div>
    </div>
  );
}
