import { Mail, Phone } from 'lucide-react'
import { COMPANY, SOCIAL_LINKS } from '@/data/constants'

export function TopBar() {
  return (
    <div className="relative z-40 hidden bg-navy py-2 text-sm text-pale md:block">
      <div className="container-pad flex items-center justify-between">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-2"><Phone size={14} /> {COMPANY.phone1} / {COMPANY.phone2}</span>
          <span className="inline-flex items-center gap-2"><Mail size={14} /> {COMPANY.email}</span>
        </div>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((item) => (
            <a key={item.platform} href={item.url} target="_blank" rel="noreferrer" className="hover:text-cyan">{item.platform}</a>
          ))}
        </div>
      </div>
    </div>
  )
}
