import { Mail, MapPin, Phone } from 'lucide-react'
import type { Branch } from '@/types'
import { COMPANY } from '@/data/constants'

export function ContactCard({ branch }: { branch: Branch }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h2 className="text-3xl font-semibold">{branch.name}</h2>
        <div className="mt-6 grid gap-4 leading-7 text-ocean/80">
          <p className="flex gap-3"><MapPin className="mt-1 shrink-0 text-bright" /> {branch.address}</p>
          <p className="flex gap-3"><Phone className="mt-1 shrink-0 text-bright" /> {COMPANY.phone1} / {COMPANY.phone2}</p>
          <p className="flex gap-3"><Mail className="mt-1 shrink-0 text-bright" /> {COMPANY.email}</p>
        </div>
      </div>
      <iframe
        title="Yazh Pure Life Google Map"
        className="min-h-[320px] w-full rounded-2xl border-0 shadow-card"
        loading="lazy"
        src="https://www.google.com/maps?q=No.19%20Venkateshwara%20Nagar%20Teachers%20Colony%20Kolathur%20Chennai%20600099&output=embed"
      />
    </div>
  )
}
