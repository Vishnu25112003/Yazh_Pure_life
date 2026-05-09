import type { ProductCategory } from '@/types'
import { cn } from '@/utils/cn'

const tabs: { label: string; value: ProductCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Home Use', value: 'home' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Hot & Cold', value: 'hotcold' },
]

export function ProductFilter({ active, onChange }: { active: ProductCategory; onChange: (value: ProductCategory) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {tabs.map((tab) => (
        <button key={tab.value} onClick={() => onChange(tab.value)} className={cn('rounded-full border px-5 py-3 text-sm font-semibold transition', active === tab.value ? 'border-bright bg-bright text-white shadow-card' : 'border-pale bg-white text-ocean hover:border-cyan')}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}
