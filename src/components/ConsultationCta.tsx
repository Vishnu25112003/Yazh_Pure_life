import { waLink } from "../data";

export function ConsultationCta() {
  return (
    <div
      id="consultation"
      className="text-white"
      style={{ background: "linear-gradient(135deg, var(--color-accent-2-700), var(--color-accent-2-500))" }}
    >
      <div className="max-w-[640px] dsk:max-w-[1240px] mx-auto pt-[calc(var(--space-8)*1.2)] pb-[calc(var(--space-8)*1.2)] px-[var(--space-4)] text-center grid gap-[var(--space-3)] justify-items-center">
        <h2 className="m-0 text-[26px]">Still not sure which system you need?</h2>
        <p className="m-0 opacity-90 max-w-[480px]">
          Tell us your water quality and daily requirement — we will recommend the right system.
        </p>
        <div className="flex gap-[var(--space-2)] justify-center flex-wrap">
          <a className="btn" href="tel:+919876543210" style={{ background: "#ffffff", color: "var(--color-accent-2-800)" }}>
            Call now
          </a>
          <a
            className="btn"
            href={waLink(
              "Hi Yazh Pure Life, I would like a consultation to choose the right water purifier for my home."
            )}
            target="_blank"
            rel="noopener"
            style={{ background: "rgba(255,255,255,0.15)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.5)" }}
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}
