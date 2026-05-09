import { ArrowRight, MessageCircle, ShieldCheck, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { COMPANY } from '@/data/constants'

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-navy via-ocean to-[#0a2244] text-white">
      <div className="hero-ocean-stage" aria-hidden="true">
        <div className="hero-ocean-glow" />
        <div className="hero-ocean-sunline" />
        <div className="hero-ocean-splash">
          <span className="splash-jet splash-jet-one" />
          <span className="splash-jet splash-jet-two" />
          <span className="splash-jet splash-jet-three" />
          <span className="foam-ring foam-ring-one" />
          <span className="foam-ring foam-ring-two" />
        </div>
        <div className="hero-droplets hero-droplets-back">
          {Array.from({ length: 10 }).map((_, index) => <span key={`back-${index}`} />)}
        </div>
        <div className="hero-droplets hero-droplets-front">
          {Array.from({ length: 14 }).map((_, index) => <span key={`front-${index}`} />)}
        </div>
        <div className="hero-mist">
          {Array.from({ length: 9 }).map((_, index) => <span key={`mist-${index}`} />)}
        </div>
        <div className="hero-wave hero-wave-back" />
        <div className="hero-wave hero-wave-mid" />
        <div className="hero-wave hero-wave-front" />
        <div className="hero-foam-lines">
          <span />
          <span />
          <span />
        </div>
      </div>
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
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-slow opacity-40"><WaveDivider color="#00bcd4" /></div>
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-mid opacity-30"><WaveDivider color="#42a5f5" /></div>
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-fast opacity-25"><WaveDivider color="#f0f8ff" /></div>
    </section>
  )
}
