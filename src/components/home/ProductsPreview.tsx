import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { products } from '@/data/products'
import { ProductCard } from '@/components/products/ProductCard'

export function ProductsPreview() {
  return (
    <section className="relative z-10 bg-white py-20">
      <div className="container-pad">
        <SectionHeading title="Popular Products" subtitle="Explore domestic, commercial and hot & cold purifier models with direct WhatsApp enquiry." />
        <Swiper spaceBetween={24} breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
          {products.slice(0, 6).map((product) => (
            <SwiperSlide key={product.id} className="pb-10"><ProductCard product={product} /></SwiperSlide>
          ))}
        </Swiper>
        <div className="text-center"><Link to="/products" className="font-semibold text-bright hover:text-cyan">View all products</Link></div>
      </div>
    </section>
  )
}
