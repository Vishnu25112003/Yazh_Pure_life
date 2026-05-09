import { AboutSection } from '@/components/home/AboutSection'
import { DealerBrandsStrip } from '@/components/home/DealerBrandsStrip'
import { HeroSection } from '@/components/home/HeroSection'
import { ProductsPreview } from '@/components/home/ProductsPreview'
import { ServicesHighlight } from '@/components/home/ServicesHighlight'
import { StatsSection } from '@/components/home/StatsSection'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'

export function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <ProductsPreview />
      <WhyChooseUs />
      <ServicesHighlight />
      <DealerBrandsStrip />
    </>
  )
}
