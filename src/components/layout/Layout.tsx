import type { ReactNode } from 'react'
import { BubbleCanvas } from '@/components/ui/BubbleCanvas'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { TopBar } from './TopBar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <BubbleCanvas />
      <TopBar />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  )
}
