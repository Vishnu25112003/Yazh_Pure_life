import { BRANCHES } from '@/data/constants'
import { cn } from '@/utils/cn'

export function BranchTabs({ active, onChange }: { active: number; onChange: (index: number) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {BRANCHES.map((branch, index) => (
        <button key={branch.name} onClick={() => onChange(index)} className={cn('rounded-full border px-5 py-3 text-sm font-semibold transition', active === index ? 'border-bright bg-bright text-white' : 'border-pale bg-white text-ocean hover:border-cyan')}>
          {branch.name}
        </button>
      ))}
    </div>
  )
}
