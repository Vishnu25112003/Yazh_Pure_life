import { useEffect, useRef, useState } from "react";
import { CONTACT, telLink } from "../data";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Home", current: true },
  { href: "https://mycrd.in/yazh-pure-life-1", label: "Domestic", external: true },
  { href: "#commercial", label: "Commercial" },
  { href: "#dispenser", label: "Dispenser" },
  { href: "#gallery", label: "Gallery" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const upDistance = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const UP_THRESHOLD = 96;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      if (delta > 4 && y > 80) {
        setHidden(true);
        upDistance.current = 0;
      } else if (delta < 0) {
        upDistance.current -= delta;
        if (upDistance.current >= UP_THRESHOLD || y <= 80) setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop logo — not sticky, so it scrolls away with the page */}
      <div className="desktop-logo-bar">
        <a href="/">
          <img src="/assets/logo.png" alt="Yazh Pure Life — RO water purifier for healthy water" className="h-[150px] block" />
        </a>
      </div>

      {/* Sticky header: on desktop the navbar always stays pinned; on mobile it hides on scroll down */}
      <header className={`site-header${hidden ? " is-hidden" : ""}`}>
        {/* Desktop */}
        <div className="hidden dsk:flex flex-col">
          <nav className="nav flex justify-center gap-[var(--space-6)] py-[var(--space-2)] px-[var(--space-6)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener" : undefined}
              >
                <span className="ypl-shine">{link.label}</span>
              </a>
            ))}
            <span className="ml-auto flex gap-[var(--space-2)]">
              <a className="btn btn-secondary" href={telLink()}>
                <PhoneIcon /> {CONTACT.phoneDisplay}
              </a>
              <a className="btn btn-primary" href="#service">
                Book service
              </a>
            </span>
          </nav>
        </div>

        {/* Mobile */}
        <div className="mobile-header dsk:hidden">
          <a href="/" className="mobile-header-logo-link">
            <img src="/assets/logo.png" alt="Yazh Pure Life" className="mobile-header-logo" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--color-bg)] flex flex-col">
          <div className="menu-logo-bar">
            <img src="/assets/logo.png" alt="Yazh Pure Life" className="menu-logo" />
            <button
              type="button"
              className="menu-toggle menu-close"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <nav
            className="flex flex-col gap-[var(--space-4)] py-[var(--space-6)] px-[var(--space-6)] text-[22px]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span className="ypl-shine">{link.label}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto p-[var(--space-6)] flex flex-col gap-[var(--space-2)]">
            <a className="btn btn-primary btn-block" href={telLink()}>
              Call {CONTACT.phoneDisplay}
            </a>
            <a className="btn btn-secondary btn-block" href="#service" onClick={() => setMenuOpen(false)}>
              Book a service
            </a>
          </div>
        </div>
      )}
    </>
  );
}
