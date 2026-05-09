import { Link } from 'react-router-dom'
import { Droplets, Factory, Home } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

const items = [
  { icon: Droplets, title: 'Reverse Osmosis System', desc: 'Installation and maintenance.' },
  { icon: Factory, title: 'Industrial Treatment', desc: 'Large-scale purification plants.' },
  { icon: Home, title: 'Domestic RO Plant', desc: 'Home RO repair and upgrades.' },
]

export function ServicesHighlight() {
  return (
    <section className="relative z-10 bg-white py-20">
      <div className="container-pad">
        <SectionHeading title="Services" subtitle="Authorized service support for water purifiers across homes, businesses and plant installations." />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-blue-100 bg-offwhite p-6 shadow-card">
              <Icon className="text-bright" size={34} />
              <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 text-ocean/75">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center"><Link to="/services" className="font-semibold text-bright hover:text-cyan">Explore services</Link></div>
      </div>
    </section>
  )
}
