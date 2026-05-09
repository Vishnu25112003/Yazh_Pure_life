import CountUp from 'react-countup'
import { STATS } from '@/data/constants'

export function StatsSection() {
  return (
    <section className="relative z-10 bg-ocean py-16 text-white">
      <div className="container-pad grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-6 text-center backdrop-blur">
            <div className="text-4xl font-bold text-cyan"><CountUp end={stat.value} suffix={stat.suffix} duration={2.5} enableScrollSpy scrollSpyOnce /></div>
            <p className="mt-2 text-pale">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
