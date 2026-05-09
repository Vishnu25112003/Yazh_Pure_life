export function PageBanner({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-ocean to-bright py-20 text-white">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full border border-cyan/40" />
        <div className="absolute right-8 top-14 h-36 w-36 rounded-full border-8 border-white/10" />
      </div>
      <div className="container-pad relative z-10">
        <h1 className="text-4xl font-bold md:text-6xl">{title}</h1>
        {subtitle ? <p className="mt-4 max-w-2xl text-lg text-pale">{subtitle}</p> : null}
      </div>
    </section>
  )
}
