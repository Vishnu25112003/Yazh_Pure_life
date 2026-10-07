import { useState } from "react";
import { BRANCHES, CONTACT, telLink } from "../data";
import { ClockOutlineIcon, DropletIcon, MailIcon, MapPinIcon, PhoneIcon, PlusIcon } from "./icons";

type Branch = (typeof BRANCHES)[number];

function MapButton({ branch }: { branch: Branch }) {
  return (
    <a
      href={branch.mapsUrl}
      target="_blank"
      rel="noopener"
      className="btn btn-ghost-light btn-sm"
      aria-label={`Open ${branch.name} branch in Google Maps`}
    >
      <MapPinIcon size={15} /> View on map
    </a>
  );
}

function BranchSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-[var(--space-3)]">
      <div className="flex items-center gap-[var(--space-2)]">
        <h3 className="m-0 text-[22px] text-white">Our branches</h3>
        <span className="branch-count">{BRANCHES.length}</span>
      </div>

      {/* Desktop: card grid */}
      <div className="hidden dsk:grid grid-cols-4 gap-[var(--space-3)]">
        {BRANCHES.map((branch) => (
          <div key={branch.name} className="branch-card">
            <div className="flex items-start gap-[var(--space-2)]">
              <span className="branch-pin">
                <MapPinIcon size={18} />
              </span>
              <div className="grid gap-0.5">
                <div className="branch-name">{branch.name}</div>
                <span className="branch-tag">{branch.tag}</span>
              </div>
            </div>
            <p className="branch-address">{branch.address}</p>
            <MapButton branch={branch} />
          </div>
        ))}
      </div>

      {/* Mobile: FAQ-style accordion */}
      <div className="grid gap-[var(--space-2)] dsk:hidden">
        {BRANCHES.map((branch, i) => {
          const open = openIndex === i;
          const panelId = `branch-panel-${i}`;
          return (
            <div key={branch.name} className={`branch-acc${open ? " is-open" : ""}`}>
              <button
                type="button"
                className="branch-acc-head"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span className="branch-pin">
                  <MapPinIcon size={16} />
                </span>
                <span className="grid text-left flex-1 min-w-0">
                  <span className="branch-name">{branch.name}</span>
                  <span className="branch-tag-text">{branch.tag}</span>
                </span>
                <span className="branch-acc-toggle" aria-hidden="true">
                  <PlusIcon size={18} />
                </span>
              </button>
              <div id={panelId} className="branch-acc-panel" role="region" hidden={!open}>
                <p className="branch-address">{branch.address}</p>
                <MapButton branch={branch} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="ypl-footer text-white pb-20 dsk:pb-0"
      style={{ background: "linear-gradient(160deg, var(--color-accent-900), var(--color-accent-2-900))" }}
    >
      <div className="max-w-[640px] dsk:max-w-[1240px] mx-auto py-[var(--space-6)] px-[var(--space-4)] grid gap-[var(--space-4)]">
        <div className="footer-hero">
          <div className="footer-hero-rule" aria-hidden="true">
            <span />
            <DropletIcon size={22} />
            <span />
          </div>
          <h2 className="footer-hero-title">Healthy Water</h2>
          <p className="footer-hero-sub">For your home and business — since 2009.</p>
        </div>

        <BranchSection />

        <div className="flex gap-[var(--space-4)] flex-wrap text-[13px]">
          <a href={telLink()} className="flex items-center gap-1.5">
            <PhoneIcon /> <span className="ypl-shine">{CONTACT.phoneDisplay}</span>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5">
            <MailIcon /> <span className="ypl-shine">{CONTACT.email}</span>
          </a>
          <span className="flex items-center gap-1.5 opacity-80">
            <ClockOutlineIcon /> {CONTACT.hours}
          </span>
        </div>

        <div className="footer-bottom">
          <nav className="footer-links" aria-label="Footer">
            <a href="#top"><span className="ypl-shine">Home</span></a>
            <a href="#commercial"><span className="ypl-shine">Commercial</span></a>
            <a href="#dispenser"><span className="ypl-shine">Dispenser</span></a>
            <a href="#gallery"><span className="ypl-shine">Gallery</span></a>
            <a href={CONTACT.mycrd} target="_blank" rel="noopener">
              <span className="ypl-shine">Digital card</span>
            </a>
          </nav>
          <div className="footer-copy">© 2026 Yazh Pure Life. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
