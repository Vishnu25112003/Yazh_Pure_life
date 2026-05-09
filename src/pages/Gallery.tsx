import { useMemo, useState } from 'react'
import { GalleryFilter } from '@/components/gallery/GalleryFilter'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { PageBanner } from '@/components/ui/PageBanner'
import type { GalleryImage, ProductCategory } from '@/types'

const gallery: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=900&q=80', width: 900, height: 1200, alt: 'Pure drinking water', category: 'home' },
  { src: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80', width: 900, height: 650, alt: 'Water purifier service', category: 'home' },
  { src: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=900&q=80', width: 900, height: 1100, alt: 'Commercial plant work', category: 'commercial' },
  { src: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80', width: 900, height: 650, alt: 'Clean water glass', category: 'hotcold' },
  { src: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80', width: 900, height: 1200, alt: 'Water bottle', category: 'home' },
  { src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=900&q=80', width: 900, height: 700, alt: 'Water surface', category: 'commercial' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80', width: 900, height: 700, alt: 'Water freshness', category: 'home' },
  { src: 'https://images.unsplash.com/photo-1616161617451-49750416f3f5?auto=format&fit=crop&w=900&q=80', width: 900, height: 1100, alt: 'Kitchen water use', category: 'hotcold' },
]

export function Gallery() {
  const [active, setActive] = useState<ProductCategory>('all')
  const images = useMemo(() => active === 'all' ? gallery : gallery.filter((image) => image.category === active), [active])

  return (
    <>
      <PageBanner title="Gallery" subtitle="The Sure Way to Safe Drinking Water" />
      <section className="bg-offwhite py-16">
        <div className="container-pad">
          <GalleryFilter active={active} onChange={setActive} />
          <div className="mt-10"><GalleryGrid images={images} /></div>
        </div>
      </section>
    </>
  )
}
