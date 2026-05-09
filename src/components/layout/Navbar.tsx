import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '@/data/constants'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'bg-white/95 shadow-card backdrop-blur' : 'bg-white/85 backdrop-blur'}`}>
      <nav className="container-pad flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-cyan to-bright text-lg font-bold text-white">YPL</span>
          <span>
            <span className="block text-xl font-bold text-navy">Yazh Pure Life</span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-bright">RO Sales & Services</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => `text-sm font-semibold transition ${isActive ? 'text-bright' : 'text-navy hover:text-bright'}`}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-pale text-navy lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </nav>
      {open ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[80] bg-navy/95 px-6 py-7 text-white lg:hidden">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">Yazh Pure Life</span>
            <button className="grid h-11 w-11 place-items-center rounded-full border border-white/20" onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <div className="mt-16 grid gap-6">
            {NAV_LINKS.map((link, index) => (
              <motion.div key={link.path} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }}>
                <NavLink to={link.path} onClick={() => setOpen(false)} className="text-4xl font-semibold">{link.label}</NavLink>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}
    </header>
  )
}
