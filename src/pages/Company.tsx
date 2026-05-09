import { Award, CheckCircle2, Eye, Target } from 'lucide-react'
import { PageBanner } from '@/components/ui/PageBanner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PurificationSteps } from '@/components/company/PurificationSteps'

const blocks = [
  { icon: Target, title: 'Mission', text: 'To be a responsible brand that helps purify water, food and air for healthier daily living.' },
  { icon: Eye, title: 'Vision', text: 'To give customers freedom from water problems through impeccable quality and dependable service.' },
  { icon: Award, title: 'Quality', text: 'Copper enriched RO, mineral care and ISO-certified process thinking for better water confidence.' },
]

export function Company() {
  return (
    <>
      <PageBanner title="Company" subtitle="Responsible purification solutions for domestic and commercial customers." />
      <section className="bg-white py-20">
        <div className="container-pad">
          <SectionHeading title="About Yazh Pure Life" />
          <div className="grid gap-6 md:grid-cols-3">
            {blocks.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-blue-100 bg-offwhite p-6 shadow-card">
                <Icon className="text-bright" size={34} />
                <h2 className="mt-5 text-3xl font-semibold">{title}</h2>
                <p className="mt-3 leading-7 text-ocean/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PurificationSteps />
      <section className="bg-white py-20">
        <div className="container-pad rounded-2xl bg-gradient-to-r from-bright to-cyan p-8 text-white shadow-card-hover md:p-12">
          <CheckCircle2 size={42} />
          <h2 className="mt-5 text-4xl font-bold">100% Satisfaction Guaranteed</h2>
          <p className="mt-3 max-w-2xl text-lg text-white/90">Make installation easier with verified professionals and industry experts in repair, maintenance, installation and servicing.</p>
        </div>
      </section>
    </>
  )
}
