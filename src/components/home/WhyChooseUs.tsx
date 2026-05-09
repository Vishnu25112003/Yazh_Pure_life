import { Droplets, Headphones, ShieldCheck, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

const items = [
  { icon: Droplets, title: '100% Pure Water', desc: 'RO + UV + UF multi-stage purification.' },
  { icon: Wrench, title: 'Expert Installation', desc: 'Professional setup at your doorstep.' },
  { icon: ShieldCheck, title: '1 Year Guarantee', desc: 'Products backed by warranty.' },
  { icon: Headphones, title: '24/7 Support', desc: 'Available when you need service help.' },
]

export function WhyChooseUs() {
  return (
    <section className="relative z-10 bg-offwhite py-20">
      <div className="container-pad">
        <SectionHeading title="Why Choose Us" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} whileHover={{ y: -8 }} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-pale text-bright"><Icon /></span>
              <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-7 text-ocean/75">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
