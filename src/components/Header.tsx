import { useEffect, useRef, useState } from "react";
import { CONTACT, telLink } from "../data";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Home", current: true },
  { href: "https://mycrd.in/yazh-pure-life-1", label: "Domestic", external: true },
  { href: "#commercial", label: "Commercial" },
  { href: "#iron-remover", label: "Iron Remover" },
  { href: "#water-softener", label: "Water Softener" },
  { href: "#spares", label: "Spares" },
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
      <header
        className="sticky top-0 z-40 bg-[var(--color-bg)] border-b border-[var(--color-divider)] transition-transform duration-[250ms] ease-in-out"
        style={{ transform: hidden ? "translateY(-100%)" : "translateY(0)" }}
      >
        {/* Desktop */}
        <div className="hidden dsk:flex flex-col">
          <div className="flex justify-center items-center py-[var(--space-4)] px-[var(--space-6)]">
            <a href="/">
              <img src="/assets/logo.png" alt="Yazh Pure Life — RO Water Purifier" className="h-[150px] block" />
            </a>
          </div>
          <nav className="nav flex justify-center gap-[var(--space-6)] py-[var(--space-2)] px-[var(--space-6)] border-t border-[var(--color-divider)]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener" : undefined}
              >
                {link.label}
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
        <div className="relative flex dsk:hidden items-center justify-center py-[var(--space-8)] px-[var(--space-4)]">
          <a href="/" className="mx-auto">
            <img
              src="/assets/logo.png"
              alt="Yazh Pure Life"
              className="w-[85%] max-w-[420px] h-auto block mx-auto"
            />
          </a>
          <button
            type="button"
            className="btn btn-icon absolute right-[var(--space-3)] top-[var(--space-3)]"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[var(--color-bg)] flex flex-col">
          <div className="flex items-center justify-between py-[var(--space-3)] px-[var(--space-4)] border-b border-[var(--color-divider)]">
            <img src="/assets/logo.png" alt="Yazh Pure Life" className="h-7" />
            <button
              type="button"
              className="btn btn-icon"
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
                {link.label}
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
