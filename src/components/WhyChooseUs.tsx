import { WHY_CHOOSE_US } from "../data";
import { BadgeIcon, CheckIcon, ClockIcon, ShieldIcon } from "./icons";

const ICONS = [ShieldIcon, CheckIcon, BadgeIcon, ClockIcon];

export function WhyChooseUs() {
  return (
    <section className="grid gap-[var(--space-3)]">
      <h2 className="m-0">Why choose us</h2>
      <div className="grid grid-cols-2 gap-[var(--space-3)]">
        {WHY_CHOOSE_US.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          const isAccent2 = item.tint === "accent2";
          return (
            <div
              key={item.title}
              className="card ypl-card p-[var(--space-3)] gap-1.5"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: isAccent2 ? "var(--color-accent-2-100)" : "var(--color-accent-100)",
                  color: isAccent2 ? "var(--color-accent-2-700)" : "var(--color-accent-700)",
                }}
              >
                <Icon size={16} />
              </div>
              <div className="card-title text-sm">{item.title}</div>
              <div className="card-body m-0 text-xs">{item.body}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
