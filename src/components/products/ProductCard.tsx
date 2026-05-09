import { Download, MessageCircle, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'
import { downloadProductCard } from '@/utils/downloadCard'
import { buildProductWhatsAppURL } from '@/utils/whatsapp'

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }} className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-card transition-all hover:border-cyan hover:shadow-card-hover">
      {product.isISI ? <span className="absolute right-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-xs font-black text-navy">ISI</span> : null}
      <div className="product-visual grid h-52 place-items-center rounded-xl">
        <div className="product-device" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-navy">{product.name}</h3>
          <p className="mt-1 text-sm font-semibold text-bright">{product.type}</p>
        </div>
        <div className="text-right">
          {product.mrp ? <p className="text-sm text-slate-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</p> : null}
          <p className="text-xl font-black text-ocean">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="mt-3 text-sm text-ocean/70">{product.stages ? `${product.stages} stages` : 'Hot & cold'} | {product.storage}</div>
      <ul className="mt-4 grid gap-2 text-sm text-navy/80">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2"><ShieldCheck size={16} className="shrink-0 text-cyan" /> {feature}</li>
        ))}
      </ul>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Button variant="whatsapp" href={buildProductWhatsAppURL(product.name)} target="_blank" rel="noreferrer" className="px-3"><MessageCircle size={18} /> WhatsApp</Button>
        <Button variant="download" onClick={() => downloadProductCard(product)} className="px-3"><Download size={18} /> Download</Button>
      </div>
    </motion.article>
  )
}
