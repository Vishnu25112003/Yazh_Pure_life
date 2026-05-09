import { useMemo, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { PageBanner } from '@/components/ui/PageBanner'
import { ProductFilter } from '@/components/products/ProductFilter'
import { ProductGrid } from '@/components/products/ProductGrid'
import { Button } from '@/components/ui/Button'
import { products } from '@/data/products'
import type { ProductCategory } from '@/types'
import { buildWhatsAppURL } from '@/utils/whatsapp'

export function Products() {
  const [active, setActive] = useState<ProductCategory>('all')
  const filtered = useMemo(() => active === 'all' ? products : products.filter((product) => product.category === active), [active])

  return (
    <>
      <PageBanner title="Products" subtitle="13 water purifier models for home, commercial and hot & cold usage." />
      <section className="bg-offwhite py-16">
        <div className="container-pad">
          <ProductFilter active={active} onChange={setActive} />
          <div className="mt-10"><ProductGrid products={filtered} /></div>
          <div className="mt-12 rounded-2xl bg-white p-6 shadow-card md:flex md:items-center md:justify-between md:gap-8">
            <p className="text-lg font-semibold text-ocean">All RO Spare Parts Available Here - Pre-filter set included with all YPL models. Stands and covers available for select models (chargeable).</p>
            <Button className="mt-5 shrink-0 md:mt-0" variant="whatsapp" href={buildWhatsAppURL('Hi, I want to enquire about RO spare parts.')} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Enquire on WhatsApp</Button>
          </div>
        </div>
      </section>
    </>
  )
}
