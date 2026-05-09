import { LogoCloud } from '@/components/ui/logo-cloud'
import { dealerBrandLogos } from '@/data/brandLogos'

export function DealerBrandsStrip() {
  return (
    <section className="relative z-10 bg-offwhite py-8">
      <LogoCloud logos={dealerBrandLogos} />
    </section>
  )
}
