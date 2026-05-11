"use client";

const partners = [
  { name: "AquaTech", tagline: "Water Technology" },
  { name: "PureFlow", tagline: "Filtration Systems" },
  { name: "HydroMax", tagline: "Industrial Solutions" },
  { name: "ClearWater", tagline: "Home Purifiers" },
  { name: "AquaSafe", tagline: "Safety Standards" },
  { name: "FilterPro", tagline: "Professional Filters" },
  { name: "WaterWise", tagline: "Smart Solutions" },
  { name: "PureTech", tagline: "Advanced RO" },
];

export function PartnerMarquee() {
  return (
    <section className="py-8 bg-secondary/50 overflow-hidden border-y border-border">
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <p className="text-center text-xs text-muted-foreground uppercase tracking-wider font-medium">
          Trusted Technology Partners
        </p>
      </div>
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/50 to-transparent z-10" />

        {/* Marquee */}
        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6 flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded bg-card flex items-center justify-center border border-border">
                <span className="text-primary font-semibold text-sm">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{partner.name}</p>
                <p className="text-[10px] text-muted-foreground">{partner.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
