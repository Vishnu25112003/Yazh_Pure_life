import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { Layout } from '@/components/layout/Layout'
import { Company } from '@/pages/Company'
import { Contact } from '@/pages/Contact'
import { Gallery } from '@/pages/Gallery'
import { Home } from '@/pages/Home'
import { Products } from '@/pages/Products'
import { Services } from '@/pages/Services'

const variants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
}

function Page({ children }: { children: ReactNode }) {
  return <motion.div variants={variants} initial="initial" animate="animate" exit="exit">{children}</motion.div>
}

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/company" element={<Page><Company /></Page>} />
          <Route path="/products" element={<Page><Products /></Page>} />
          <Route path="/services" element={<Page><Services /></Page>} />
          <Route path="/gallery" element={<Page><Gallery /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
