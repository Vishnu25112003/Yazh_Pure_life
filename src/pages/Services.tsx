import * as Icons from 'lucide-react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ElementType } from 'react'
import { PageBanner } from '@/components/ui/PageBanner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { LogoCloud } from '@/components/ui/logo-cloud'
import { dealerBrandLogos } from '@/data/brandLogos'
import { services } from '@/data/services'
import { buildWhatsAppURL } from '@/utils/whatsapp'

export function Services() {
  return (
    <>
      <PageBanner title="Services" subtitle="Authorized water purifier service center for installation, maintenance and AMC." />
      <section className="bg-offwhite py-20">
        <div className="container-pad">
          <SectionHeading title="Service Support" subtitle="We undertake all type brands Water purifier AMC service in Chennai." />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = (Icons as unknown as Record<string, ElementType>)[service.icon] || Icons.Circle
              return (
                <motion.article key={service.id} whileHover={{ y: -8 }} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-card">
                  <Icon className="text-bright" size={36} />
                  <h2 className="mt-5 text-2xl font-semibold">{service.title}</h2>
                  <p className="mt-3 leading-7 text-ocean/75">{service.description}</p>
                  <Button className="mt-5" variant="whatsapp" href={buildWhatsAppURL(`Hi, I want service details for ${service.title}.`)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp CTA</Button>
                </motion.article>
              )
            })}
          </div>
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-card">
            <h2 className="text-3xl font-semibold">Annual Maintenance Contract</h2>
            <p className="mt-4 leading-8 text-ocean/80">We offer a various range of affordable Annual maintenance contract packages for a vast range of water purifier models. Our AMC packages include periodically servicing and replacing faulty spare parts. We undertake all type brands Water purifier AMC service in Chennai. Yazh Pure Life is the one-stop solution - our Pros are verified and industry experts in repair, maintenance, installation, up-gradation and servicing of all kinds of water purifier.</p>
            <Button className="mt-6" href={buildWhatsAppURL('Hi, I want to book AMC service.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Book AMC</Button>
          </div>
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-ocean to-bright p-8 text-white shadow-card-hover">
            <h2 className="text-4xl font-bold">Need a Service?</h2>
            <p className="mt-3 text-pale">Reach Yazh Pure Life directly on WhatsApp for fast service support.</p>
          </div>
          <div className="mt-12">
            <p className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-ocean/60">Brands We Service</p>
            <LogoCloud logos={dealerBrandLogos} />
          </div>
        </div>
      </section>
    </>
  )
}
