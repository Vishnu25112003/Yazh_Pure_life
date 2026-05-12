"use client";

const partners = [
  {
    name: "Aquaguard",
    tagline: "Water Purifiers",
    mark: "AG",
    className: "text-[#0b72b9]",
  },
  {
    name: "KENT",
    tagline: "RO Systems",
    mark: "K",
    className: "text-[#0b62a4]",
  },
  {
    name: "Blue Star",
    tagline: "Water Solutions",
    mark: "BS",
    className: "text-[#1358a8]",
  },
  {
    name: "Whirlpool",
    tagline: "Home Appliances",
    mark: "W",
    className: "text-[#111827]",
  },
  {
    name: "LG",
    tagline: "Appliances",
    mark: "LG",
    className: "text-[#a50034]",
  },
  {
    name: "Genpure",
    tagline: "Purification",
    mark: "GP",
    className: "text-[#0f766e]",
  },
  {
    name: "Prolife",
    tagline: "RO Technology",
    mark: "PL",
    className: "text-[#166534]",
  },
];

export function PartnerMarquee() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/20 via-secondary/45 to-background py-8 shadow-[inset_0_28px_45px_rgba(255,255,255,0.65),inset_0_-28px_45px_rgba(255,255,255,0.72)] lg:py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-background via-background/70 to-transparent blur-sm sm:w-36" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-background via-background/70 to-transparent blur-sm sm:w-36" />
      <div className="pointer-events-none absolute left-0 top-1/2 z-10 h-24 w-24 -translate-y-1/2 rounded-full bg-white/45 blur-2xl sm:w-36" />
      <div className="pointer-events-none absolute right-0 top-1/2 z-10 h-24 w-24 -translate-y-1/2 rounded-full bg-white/45 blur-2xl sm:w-36" />

      <div className="relative z-10 max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 mb-5">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Trusted Technologies
        </p>
      </div>

      <div className="relative z-10 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_14%,black_86%,transparent)]">
        <div className="flex w-max animate-marquee items-center">
          <div className="flex items-center gap-14 pr-14 xl:gap-20 xl:pr-20">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="group flex min-w-36 flex-shrink-0 items-center gap-3 opacity-80 blur-[0.15px] transition-all duration-300 hover:opacity-100 hover:blur-0"
              >
                <div className="relative flex h-11 w-11 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-white/55 blur-md transition-opacity group-hover:opacity-100 opacity-70" />
                  <span
                    className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-background/55 font-bold text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_rgba(15,23,42,0.08)] ${partner.className}`}
                  >
                    {partner.mark}
                  </span>
                </div>
                <div className="min-w-24">
                  <p className={`font-bold text-base leading-none ${partner.className}`}>
                    {partner.name}
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground/60 blur-[0.2px] group-hover:text-muted-foreground group-hover:blur-0">
                    {partner.tagline}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-14 pr-14 xl:gap-20 xl:pr-20" aria-hidden="true">
            {partners.map((partner) => (
            <div
              key={`duplicate-${partner.name}`}
              className="group flex min-w-36 flex-shrink-0 items-center gap-3 opacity-80 blur-[0.15px] transition-all duration-300 hover:opacity-100 hover:blur-0"
            >
              <div className="relative flex h-11 w-11 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-white/55 blur-md transition-opacity group-hover:opacity-100 opacity-70" />
                <span
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-background/55 font-bold text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_rgba(15,23,42,0.08)] ${partner.className}`}
                >
                  {partner.mark}
                </span>
              </div>
              <div className="min-w-24">
                <p className={`font-bold text-base leading-none ${partner.className}`}>
                  {partner.name}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground/60 blur-[0.2px] group-hover:text-muted-foreground group-hover:blur-0">
                  {partner.tagline}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
