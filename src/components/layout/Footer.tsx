import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { COMPANY, DEALER_BRANDS, NAV_LINKS, SOCIAL_LINKS } from '@/data/constants'

export function Footer() {
  return (
    <footer className="relative z-10 bg-navy py-14 text-pale">
      <div className="container-pad grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Yazh Pure Life</h3>
          <p className="mt-3 leading-7">{COMPANY.tagline}. {COMPANY.sub}. {COMPANY.cert}.</p>
          <p className="mt-4 text-gold">{COMPANY.rating} Star Google Rated ({COMPANY.reviews} reviews)</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <div className="mt-4 grid gap-2">
            {NAV_LINKS.map((link) => <Link key={link.path} to={link.path} className="hover:text-cyan">{link.label}</Link>)}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white">Dealer Brands</h4>
          <p className="mt-4 leading-8">{DEALER_BRANDS.join(' | ')}</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <div className="mt-4 grid gap-3 text-sm leading-6">
            <span className="flex gap-2"><MapPin size={18} /> {COMPANY.address}</span>
            <span className="flex gap-2"><Phone size={18} /> {COMPANY.phone1}, {COMPANY.phone2}</span>
            <span className="flex gap-2"><Mail size={18} /> {COMPANY.email}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {SOCIAL_LINKS.map((item) => <a key={item.platform} href={item.url} target="_blank" rel="noreferrer" className="text-cyan hover:text-white">{item.platform}</a>)}
          </div>
        </div>
      </div>
      <div className="container-pad mt-10 border-t border-white/10 pt-6 text-sm text-white/60">© 2026 Yazh Pure Life. All rights reserved.</div>
    </footer>
  )
}
