import { MessageCircle } from 'lucide-react'
import { COMPANY } from '@/data/constants'

export function WhatsAppFloat() {
  return (
    <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer" className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-card-hover">
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" />
      <MessageCircle className="relative z-10" />
      <span className="sr-only">WhatsApp</span>
    </a>
  )
}
