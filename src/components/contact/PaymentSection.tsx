import { CreditCard } from 'lucide-react'
import { COMPANY } from '@/data/constants'

const methods = ['Paytm', 'Google Pay', 'PhonePe']

export function PaymentSection() {
  return (
    <section className="mt-12 rounded-2xl bg-ocean p-6 text-white shadow-card">
      <h2 className="text-3xl font-semibold">Payment</h2>
      <p className="mt-2 text-pale">Paytm / Google Pay / PhonePe: {COMPANY.phone1}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {methods.map((method) => (
          <div key={method} className="rounded-2xl border border-white/15 bg-white/10 p-5">
            <CreditCard className="text-cyan" />
            <h3 className="mt-4 text-xl font-semibold">{method}</h3>
            <div className="mt-4 grid aspect-square max-w-36 place-items-center rounded-xl bg-white p-3 text-center text-xs font-bold text-ocean">QR Placeholder<br />{COMPANY.phone1}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
