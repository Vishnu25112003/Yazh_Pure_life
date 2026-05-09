import { Award, CheckCircle2, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

const badges = [
  { icon: Award, label: 'ISO 9001:2015 Certified' },
  { icon: Star, label: '4.8 Google Rated (1,014 Reviews)' },
  { icon: CheckCircle2, label: '10+ Years of Excellence' },
]

export function AboutSection() {
  return (
    <section className="relative z-10 bg-offwhite py-20">
      <div className="container-pad grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" title="Cleaner Water for Every Home and Workplace" subtitle="Yazh Pure Life supplies and services RO water purifiers for domestic and commercial customers, with a focus on reliable purification, quick support and practical product guidance." />
          <div className="grid gap-4">
            {badges.map(({ icon: Icon, label }) => (
              <motion.div key={label} whileHover={{ x: 8 }} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-pale text-bright"><Icon size={22} /></span>
                <span className="font-semibold">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="product-visual grid min-h-[420px] place-items-center rounded-[32px]">
          <div className="product-device scale-150" />
        </div>
      </div>
    </section>
  )
}
