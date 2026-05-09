import { ArrowRight, MessageCircle, ShieldCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WaterRippleImage } from '@/components/ui/water-ripple-image'
import { COMPANY } from '@/data/constants'

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-navy via-ocean to-[#0a2244] text-white">
      <WaterRippleImage
        blueish={0.4}
        scale={7}
        illumination={0.15}
        surfaceDistortion={0.03}
        waterDistortion={0.02}
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1600"
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-navy/85 via-navy/55 to-navy/10" aria-hidden="true" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-navy/20 via-transparent to-navy/45" aria-hidden="true" />
      <div className="container-pad grid min-h-[calc(100vh-80px)] items-center py-16">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-white/10 px-4 py-2 text-sm text-pale backdrop-blur">
            <ShieldCheck size={18} className="text-cyan" /> {COMPANY.cert}
          </div>
          <h1 className="text-5xl font-bold leading-tight md:text-7xl">Pure Water, Pure Life</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-pale md:text-xl">{COMPANY.tagline} for {COMPANY.sub.toLowerCase()} needs in Chennai, backed by expert installation and trusted service.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/products" size="lg" className="group">
              Explore Products <ArrowRight className="transition group-hover:translate-x-1" size={20} />
            </Button>
            <Button variant="outline" size="lg" href="/contact">
              Contact Us <MessageCircle size={20} />
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-sm text-pale">
            <span className="inline-flex items-center gap-2 text-gold"><Star size={18} fill="currentColor" /> {COMPANY.rating} Google Rating</span>
            <span>{COMPANY.reviews.toLocaleString('en-IN')} reviews</span>
            <span>Branches: Kolathur | Avadi | Tada</span>
          </div>
        </div>
      </div>
    </section>
  )
}
