import { motion } from 'framer-motion'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  )
}
