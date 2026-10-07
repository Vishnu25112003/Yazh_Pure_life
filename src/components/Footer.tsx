import { BRANCHES, CONTACT, telLink } from "../data";
import { ClockOutlineIcon, MailIcon, PhoneIcon } from "./icons";

export function Footer() {
  return (
    <footer
      className="ypl-footer text-white pb-20 dsk:pb-0"
      style={{ background: "linear-gradient(160deg, var(--color-accent-900), var(--color-accent-2-900))" }}
    >
      <div className="max-w-[640px] dsk:max-w-[1240px] mx-auto py-[var(--space-6)] px-[var(--space-4)] grid gap-[var(--space-4)]">
        <div className="grid gap-1">
          <div className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Yazh Pure Life
          </div>
          <div className="text-[13px] opacity-75">Clean water for your home and business — since 2009.</div>
        </div>

        <div className="grid gap-[var(--space-3)]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          {BRANCHES.map((branch, i) => (
            <div
              key={branch.name}
              className="p-[var(--space-3)] grid gap-1.5 rounded-lg border-l-[3px]"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderLeftColor: i % 2 === 0 ? "var(--color-accent-2-400)" : "var(--color-accent-400)",
              }}
            >
              <div className="font-semibold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                {branch.name}
              </div>
              <div className="text-xs opacity-80">{branch.address}</div>
              <a href={branch.mapsUrl} target="_blank" rel="noopener" className="text-xs">
                Get directions →
              </a>
            </div>
          ))}
        </div>

        <div className="flex gap-[var(--space-4)] flex-wrap text-[13px]">
          <a href={telLink()} className="flex items-center gap-1.5">
            <PhoneIcon /> {CONTACT.phoneDisplay}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5">
            <MailIcon /> {CONTACT.email}
          </a>
          <span className="flex items-center gap-1.5 opacity-80">
            <ClockOutlineIcon /> {CONTACT.hours}
          </span>
        </div>

        <div
          className="flex gap-[var(--space-3)] flex-wrap text-[13px] pt-[var(--space-4)]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          <a href="/">Home</a>
          <a href="/commercial">Commercial</a>
          <a href="/iron-remover">Iron Remover</a>
          <a href="/water-softener">Water Softener</a>
          <a href="/spares">Spares</a>
          <a href={CONTACT.mycrd} target="_blank" rel="noopener">
            Digital card
          </a>
        </div>

        <div className="opacity-60 text-[11px]">© 2026 Yazh Pure Life. All rights reserved.</div>
      </div>
    </footer>
  );
}
