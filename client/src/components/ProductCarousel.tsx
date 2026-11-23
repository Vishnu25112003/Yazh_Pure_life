import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { telLink, waLink } from "../data";
import { useSite } from "../site";
import type { Product } from "../types";
import { ChevronRightIcon, CloseIcon, PhoneIcon, ShareIcon, WhatsAppIcon } from "./icons";
import { ColorSwatches, variantImage } from "./ColorSwatches";
import { OffBadge, PriceTag } from "./PriceTag";
import { ProductImage } from "./ProductImage";

function productUrl(id: string) {
  return `${window.location.origin}/?product=${encodeURIComponent(id)}`;
}

async function shareProduct(p: Product): Promise<"shared" | "copied" | "failed"> {
  const url = productUrl(p.id);
  try {
    if (navigator.share) {
      await navigator.share({ title: `${p.label} — Yazh Pure Life`, text: `${p.label} (${p.spec})`, url });
      return "shared";
    }
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch (e) {
    if ((e as DOMException)?.name === "AbortError") return "shared";
    try {
      await navigator.clipboard.writeText(url);
      return "copied";
    } catch {
      window.prompt("Copy this link:", url);
      return "failed";
    }
  }
}

function ShareButton({ product, className = "" }: { product: Product; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Share ${product.label}`}
      className={`inline-flex items-center justify-center gap-1.5 cursor-pointer ${className}`}
      onClick={async (e) => {
        e.stopPropagation();
        if ((await shareProduct(product)) === "copied") {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }
      }}
    >
      <ShareIcon />
      {copied ? "Link copied" : "Share"}
    </button>
  );
}

function ProductModal({
  product,
  color,
  onColor,
  onClose,
}: {
  product: Product;
  color: number;
  onColor: (index: number) => void;
  onClose: () => void;
}) {
  const colorName = product.variants?.[color]?.name;
  const { contact: CONTACT } = useSite();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/55 flex items-center justify-center p-[var(--space-4)]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.label}
    >
      <div
        className="relative bg-[var(--color-bg)] rounded-lg w-full max-w-[460px] max-h-full overflow-y-auto grid gap-[var(--space-3)] p-[var(--space-4)]"
        style={{ boxShadow: "var(--shadow-lg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="btn btn-icon absolute right-3 top-3 z-10" aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
        <div className="relative">
          <ProductImage
            label={colorName ? `${product.label} in ${colorName}` : product.label}
            src={variantImage(product.src, product.variants, color)}
            className="w-full h-[280px] rounded-md !object-contain bg-white border border-[var(--color-divider)]"
          />
          <OffBadge mrp={product.mrp} price={product.price} />
        </div>
        <div>
          <h3 className="m-0">{product.label}</h3>
          <p className="m-0 mt-1 opacity-80">{product.spec}</p>
          <PriceTag mrp={product.mrp} price={product.price} size="lg" className="mt-3" />
          <ColorSwatches
            variants={product.variants}
            value={color}
            onChange={onColor}
            size="lg"
            productLabel={product.label}
            className="mt-3"
          />
          {product.points && (
            <ul className="m-0 mt-3 pl-5 grid gap-1 text-sm list-disc marker:text-[var(--color-accent-600)]">
              {product.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid gap-[var(--space-2)]">
          <a
            className="btn btn-primary btn-block"
            href={waLink(
              CONTACT,
              `Hi, I am interested in ${product.label}${colorName ? ` in ${colorName}` : ""} (${product.spec}). Please share more details.`,
            )}
            target="_blank"
            rel="noopener"
          >
            <WhatsAppIcon /> Enquire on WhatsApp
          </a>
          <div className="grid grid-cols-2 gap-[var(--space-2)]">
            <a className="btn btn-secondary" href={telLink(CONTACT)}>
              <PhoneIcon /> Call {CONTACT.phoneDisplay}
            </a>
            <ShareButton product={product} className="btn btn-secondary" />
          </div>
        </div>
      </div>
    </div>
  );
}

const COPIES = 3;
const SPEED = 45;

export function ProductCarousel({
  sectionId,
  title,
  products,
  direction = "left",
  children,
}: {
  sectionId: string;
  title: string;
  products: Product[];
  direction?: "left" | "right";
  children?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [selectedId, setSelectedId] = useState<string | null>(() =>
    new URLSearchParams(window.location.search).get("product"),
  );
  const selected = products.find((p) => p.id === selectedId) ?? null;
  // Chosen colour per product, shared by every copy of its card and by the popup.
  const [colors, setColors] = useState<Record<string, number>>({});
  const colorOf = (id: string) => colors[id] ?? 0;
  const setColor = (id: string, index: number) => setColors((c) => ({ ...c, [id]: index }));

  const select = (id: string | null) => {
    setSelectedId(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("product", id);
    else url.searchParams.delete("product");
    window.history.replaceState(null, "", url);
  };

  const setWidth = (el: HTMLElement) => {
    const first = el.children[0] as HTMLElement | undefined;
    const next = el.children[products.length] as HTMLElement | undefined;
    return first && next ? next.offsetLeft - first.offsetLeft : 0;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (selected) {
      document.getElementById(sectionId)?.scrollIntoView();
      const card = el.querySelectorAll<HTMLElement>(`[data-product="${selected.id}"]`)[1];
      if (card) el.scrollLeft = card.offsetLeft - el.offsetLeft - 16;
    } else {
      el.scrollLeft = setWidth(el);
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sign = direction === "right" ? -1 : 1;
    let pos = el.scrollLeft;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
      if (!paused.current && document.body.style.overflow !== "hidden") {
        pos += (sign * SPEED * dt) / 1000;
        el.scrollLeft = pos;
      }
      const w = setWidth(el);
      if (w) {
        if (pos >= 2 * w) {
          pos -= w;
          el.scrollLeft = pos;
        } else if (pos < w) {
          pos += w;
          el.scrollLeft = pos;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };
  const scrollByCards = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <section id={sectionId} className="grid gap-[var(--space-3)] scroll-mt-[var(--space-4)]">
      <h2 className="m-0">{title}</h2>
      <div className="card ypl-card !p-0 overflow-hidden" style={{ boxShadow: "var(--shadow-lg)" }}>
        <div className="relative" onMouseEnter={pause} onMouseLeave={resume} onTouchStart={pause} onTouchEnd={resume}>
          <div ref={trackRef} className="ypl-marquee-track flex gap-[var(--space-3)] overflow-x-auto p-[var(--space-4)]">
            {Array.from({ length: COPIES }).flatMap((_, copy) => products.map((p) => ({ p, copy }))).map(({ p, copy }) => (
              <div
                key={`${copy}-${p.id}`}
                data-product={p.id}
                className="shrink-0 grow-0 w-[170px] dsk:w-[210px] flex flex-col gap-1.5 box-border cursor-pointer"
                onClick={() => select(p.id)}
              >
                <div className="relative">
                  <ProductImage
                    label={p.variants?.length ? `${p.label} in ${p.variants[colorOf(p.id)]?.name ?? p.variants[0].name}` : p.label}
                    src={variantImage(p.src, p.variants, colorOf(p.id))}
                    className="w-full h-[150px] dsk:h-[190px] rounded-md !object-contain bg-white border border-[var(--color-divider)]"
                  />
                  <OffBadge mrp={p.mrp} price={p.price} />
                </div>
                <div className="text-sm text-center font-semibold whitespace-normal break-words leading-tight">
                  {p.label}
                </div>
                <div className="text-xs text-center opacity-70 leading-tight">{p.spec}</div>
                <PriceTag mrp={p.mrp} price={p.price} className="mt-1" />
                <ColorSwatches
                  variants={p.variants}
                  value={colorOf(p.id)}
                  onChange={(i) => setColor(p.id, i)}
                  productLabel={p.label}
                />
                <div className="mt-auto pt-1 flex justify-center">
                  <ShareButton product={p} className="chip-link" />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Scroll products left"
            onClick={() => scrollByCards(-1)}
            className="hidden dsk:flex absolute left-2 top-[95px] w-10 h-10 rounded-full items-center justify-center bg-white border border-[var(--color-divider)] text-[var(--color-accent-800)] cursor-pointer"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <ChevronRightIcon className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Scroll products right"
            onClick={() => scrollByCards(1)}
            className="hidden dsk:flex absolute right-2 top-[95px] w-10 h-10 rounded-full items-center justify-center bg-white border border-[var(--color-divider)] text-[var(--color-accent-800)] cursor-pointer"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <ChevronRightIcon />
          </button>
        </div>
        {children}
      </div>
      {selected && (
        <ProductModal
          product={selected}
          color={colorOf(selected.id)}
          onColor={(i) => setColor(selected.id, i)}
          onClose={() => select(null)}
        />
      )}
    </section>
  );
}
