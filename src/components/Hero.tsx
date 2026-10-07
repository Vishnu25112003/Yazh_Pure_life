export function Hero() {
  return (
    <div
      className="text-white"
      style={{ background: "linear-gradient(135deg, var(--color-accent-800), var(--color-accent-500))" }}
    >
      <div className="max-w-[640px] dsk:max-w-[1240px] mx-auto pt-[calc(var(--space-8)*1.4)] px-[var(--space-4)] pb-[var(--space-8)] text-center grid gap-[var(--space-3)] justify-items-center">
        <h1 className="text-[34px] mt-[var(--space-2)] mb-0 max-w-[640px]">
          Healthy water, sorted — for your home and business
        </h1>
        <p className="opacity-90 max-w-[520px]">
          RO, UV and alkaline water purifiers for healthy drinking water — sales, installation, service and spares,
          from a technician who answers the phone.
        </p>
      </div>
    </div>
  );
}
