import { useState } from 'react'
import { BranchTabs } from '@/components/contact/BranchTabs'
import { ContactCard } from '@/components/contact/ContactCard'
import { EnquiryForm } from '@/components/contact/EnquiryForm'
import { PaymentSection } from '@/components/contact/PaymentSection'
import { PageBanner } from '@/components/ui/PageBanner'
import { BRANCHES } from '@/data/constants'

export function Contact() {
  const [active, setActive] = useState(0)
  return (
    <>
      <PageBanner title="Contact Us" subtitle="Head Office: Kolathur. Branch Offices: Kolathur, Avadi and Tada." />
      <section className="bg-offwhite py-16">
        <div className="container-pad">
          <BranchTabs active={active} onChange={setActive} />
          <div className="mt-10"><ContactCard branch={BRANCHES[active]} /></div>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <EnquiryForm />
            <PaymentSection />
          </div>
        </div>
      </section>
    </>
  )
}
