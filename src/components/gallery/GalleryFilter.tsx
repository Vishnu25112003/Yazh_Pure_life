import type { ProductCategory } from '@/types'
import { ProductFilter } from '@/components/products/ProductFilter'

export function GalleryFilter({ active, onChange }: { active: ProductCategory; onChange: (value: ProductCategory) => void }) {
  return <ProductFilter active={active} onChange={onChange} />
}
