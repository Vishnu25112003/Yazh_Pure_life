import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function SectionHeading({ title, subtitle, align = 'center' }: { title: string; subtitle?: string; align?: 'left' | 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      className={cn('mb-10', align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}
    >
      <h2 className="text-3xl font-semibold text-navy md:text-5xl">{title}</h2>
      <div className={cn('mt-4 h-1 w-24 rounded-full bg-cyan', align === 'center' && 'mx-auto')} />
      {subtitle ? <p className="mt-5 text-base leading-7 text-ocean/80 md:text-lg">{subtitle}</p> : null}
    </motion.div>
  )
}
