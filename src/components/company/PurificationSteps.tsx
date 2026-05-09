import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'

const steps = [
  ['PP Sediment Filter (5 Micron)', 'Removes sand, dust, rust, silt'],
  ['Inline Sediment Cartridge', 'Protects RO membrane from fine particles'],
  ['Pre Carbon Filter', 'Removes color, odour, chlorine, pesticides'],
  ['RO Membrane Filter', 'Eliminates TDS, toxins, viruses, bacteria'],
  ['Post Carbon Filter', 'Restores natural taste of water'],
  ['UV Filtration', 'Deactivates remaining bacteria & viruses'],
  ['Mineral Guard / Alkaline', 'Adds essential minerals back into water'],
]

export function PurificationSteps() {
  return (
    <section className="bg-offwhite py-20">
      <div className="container-pad">
        <SectionHeading title="7 Stage Purification Process" />
        <div className="grid gap-4 lg:grid-cols-7">
          {steps.map(([title, desc], index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="relative rounded-2xl bg-white p-5 shadow-card">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-bright font-bold text-white">{index + 1}</span>
              <h3 className="mt-4 font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ocean/75">{desc}</p>
              {index < steps.length - 1 ? <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden text-cyan lg:block" /> : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
