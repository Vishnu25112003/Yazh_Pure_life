import { useSite } from "../site";
import { BadgeIcon, CheckIcon, ClockIcon, ShieldIcon } from "./icons";

const ICONS = [ShieldIcon, CheckIcon, BadgeIcon, ClockIcon];

export function WhyChooseUs() {
  const { whyChooseUs: WHY_CHOOSE_US } = useSite();
  return (
    <section className="grid gap-[var(--space-3)]">
      <h2 className="m-0">Why choose us</h2>
      <div className="grid grid-cols-1 dsk:grid-cols-2 auto-rows-fr gap-[var(--space-3)]">
        {WHY_CHOOSE_US.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={item.title}
              className="card ypl-card h-full content-start p-[var(--space-4)] gap-2"
              style={{ boxShadow: "var(--shadow-sm)", borderLeftColor: "var(--color-accent-600)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--color-accent-100)",
                  color: "var(--color-accent-700)",
                }}
              >
                <Icon size={16} />
              </div>
              <div className="card-title text-sm">{item.title}</div>
              <div className="card-body m-0 text-sm">{item.body}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
