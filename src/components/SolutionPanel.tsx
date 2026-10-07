import type { ReactNode } from "react";
import { telLink, waLink } from "../data";
import { PhoneIcon, RefreshIcon, WhatsAppIcon, WrenchIcon } from "./icons";

type Option = {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
};

type SolutionPanelProps = {
  id: string;
  title: string;
  intro: string;
  icon: ReactNode;
  options: Option[];
  tint: "accent" | "accent2";
};

export function SolutionPanel({ id, title, intro, icon, options, tint }: SolutionPanelProps) {
  return (
    <section id={id} className={`solution-panel solution-${tint} scroll-mt-[var(--space-4)]`}>
      <header className="solution-head">
        <span className="solution-head-icon">{icon}</span>
        <div className="grid gap-0.5">
          <h2 className="m-0 text-[26px]">{title}</h2>
          <p className="solution-head-intro">{intro}</p>
          <span className="solution-head-sub">{options.length} options · Automatic &amp; Manual</span>
        </div>
      </header>

      <div className="solution-list">
        {options.map((option) => {
          const isAuto = option.name.toLowerCase().startsWith("auto");
          return (
            <div key={option.id} className="solution-option">
              <span className={`solution-option-icon${isAuto ? " is-auto" : ""}`}>
                {isAuto ? <RefreshIcon size={20} /> : <WrenchIcon size={20} />}
              </span>

              <div className="solution-option-info">
                <div className="solution-option-name">{option.name}</div>
                <p className="solution-option-desc">{option.description}</p>
              </div>

              <div className="solution-option-price">
                <span className="solution-price-label">Starting from</span>
                <span className="solution-price-value">{option.startingPrice}</span>
              </div>

              <div className="solution-option-actions">
                <a
                  className={`btn btn-sm ${tint === "accent2" ? "btn-accent-2" : "btn-primary"}`}
                  href={waLink(`Hi, I am interested in the ${option.name} ${title} (starting from ${option.startingPrice}). Please share more details.`)}
                  target="_blank"
                  rel="noopener"
                >
                  <WhatsAppIcon size={15} /> Enquire
                </a>
                <a className="btn btn-secondary btn-sm" href={telLink()}>
                  <PhoneIcon size={14} /> Call
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
