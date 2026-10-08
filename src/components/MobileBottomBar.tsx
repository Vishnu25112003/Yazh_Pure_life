import { CONTACT } from "../data";
import { PhoneIcon, WhatsAppIcon, WrenchIcon } from "./icons";

export function MobileBottomBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-bg)] border-t border-[var(--color-divider)] grid grid-cols-3 dsk:hidden"
    >
      <a
        href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
        className="bar-btn flex flex-col items-center gap-0.5 py-[var(--space-2)] text-[11px] font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        <PhoneIcon size={18} />
        Call
      </a>
      <a
        href={`https://wa.me/${CONTACT.whatsapp}`}
        target="_blank"
        rel="noopener"
        className="bar-btn flex flex-col items-center gap-0.5 py-[var(--space-2)] text-[11px] font-semibold border-x border-[var(--color-divider)]"
        style={{ color: "var(--color-text)" }}
      >
        <WhatsAppIcon size={18} />
        WhatsApp
      </a>
      <a
        href="#service"
        className="bar-btn flex flex-col items-center gap-0.5 py-[var(--space-2)] text-[11px] font-semibold"
        style={{ color: "var(--color-accent-800)", background: "var(--color-accent-100)" }}
      >
        <WrenchIcon size={20} />
        Book service
      </a>
    </div>
  );
}
