export function SparesSection() {
  return (
    <section id="spares" className="grid gap-[var(--space-3)]">
      <h2 className="m-0">Water purifier spares</h2>
      <div className="card ypl-card p-[var(--space-4)] gap-[var(--space-2)]">
        <p className="m-0 opacity-85">
          RO membrane, filters, pumps, valves — tell us what you need and we'll quote it on WhatsApp.
        </p>
        <a className="btn btn-primary justify-self-start" href="/spares">
          Request spares
        </a>
      </div>
    </section>
  );
}
