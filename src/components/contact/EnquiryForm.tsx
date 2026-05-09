import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { EnquiryFormData } from '@/types'
import { buildWhatsAppURL } from '@/utils/whatsapp'

export function EnquiryForm() {
  const [form, setForm] = useState<EnquiryFormData>({ name: '', mobile: '', email: '', message: '' })
  const [error, setError] = useState('')

  const update = (field: keyof EnquiryFormData, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!form.name.trim() || !/^\d{10}$/.test(form.mobile.trim()) || !form.email.trim()) {
      setError('Please enter name, 10-digit mobile number and email.')
      return
    }
    setError('')
    const msg = `Name: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email}\nMessage: ${form.message}`
    window.open(buildWhatsAppURL(msg), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-card">
      <h2 className="text-3xl font-semibold">Send Enquiry</h2>
      <div className="mt-6 grid gap-4">
        <input required placeholder="Your Name *" value={form.name} onChange={(e) => update('name', e.target.value)} className="rounded-lg border border-pale px-4 py-3 outline-none focus:border-cyan" />
        <input required placeholder="Your Mobile *" value={form.mobile} onChange={(e) => update('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} className="rounded-lg border border-pale px-4 py-3 outline-none focus:border-cyan" />
        <input required type="email" placeholder="Your Email *" value={form.email} onChange={(e) => update('email', e.target.value)} className="rounded-lg border border-pale px-4 py-3 outline-none focus:border-cyan" />
        <textarea placeholder="Tell Us Something..." value={form.message} onChange={(e) => update('message', e.target.value)} rows={5} className="rounded-lg border border-pale px-4 py-3 outline-none focus:border-cyan" />
      </div>
      {error ? <p className="mt-3 text-sm font-semibold text-red-600">{error}</p> : null}
      <Button className="mt-5" variant="primary" type="submit"><Send size={18} /> Send Message</Button>
    </form>
  )
}
