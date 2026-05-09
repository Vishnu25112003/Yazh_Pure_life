import { DEALER_BRANDS } from '@/data/constants'

export function DealerBrandsStrip() {
  return (
    <section className="relative z-10 overflow-hidden bg-pale py-8">
      <div className="flex w-max animate-marquee gap-6 whitespace-nowrap">
        {[...DEALER_BRANDS, ...DEALER_BRANDS, ...DEALER_BRANDS].map((brand, index) => (
          <span key={`${brand}-${index}`} className="rounded-full bg-white px-8 py-3 font-semibold text-ocean shadow-card">{brand}</span>
        ))}
      </div>
    </section>
  )
}
