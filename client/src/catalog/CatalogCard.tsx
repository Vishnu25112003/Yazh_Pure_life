import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import { I, LINK_ICON } from "./icons";
import { buildVCard, telHref, waHref, youtubeId, type ResolvedCatalog } from "./resolve";
import { SECTION_LABEL, type CatalogCategory, type SectionKey } from "./types";
import "./catalog.css";

const NAV_ICON: Record<SectionKey | "home", typeof I.home> = {
  home: I.home,
  links: I.link,
  about: I.about,
  documents: I.file,
  products: I.box,
  payment: I.wallet,
  gallery: I.image,
  videos: I.video,
  enquiry: I.chat,
  share: I.share,
};

interface Props {
  data: ResolvedCatalog;
  category: CatalogCategory;
  pageUrl: string;
  /** "preview" renders inside the admin editor: no fixed positioning, scroll stays in its frame. */
  mode?: "page" | "preview";
}

export function CatalogCard({ data, category, pageUrl, mode = "page" }: Props) {
  const { catalog, sections } = data;
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("home");
  const [note, setNote] = useState<string | null>(null);
  const noteTimer = useRef<number>();

  const flash = (text: string) => {
    setNote(text);
    window.clearTimeout(noteTimer.current);
    noteTimer.current = window.setTimeout(() => setNote(null), 2200);
  };
  const copy = async (text: string, what: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flash(`${what} copied`);
    } catch {
      flash("Copy is blocked in this browser");
    }
  };

  // Highlight the bottom-bar item for the section in view.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scroller = mode === "preview" ? root.closest<HTMLElement>("[data-cat-scroll]") : null;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive((hit.target as HTMLElement).dataset.sec!);
      },
      { root: scroller, rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );
    root.querySelectorAll("[data-sec]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode, sections.join(",")]);

  const go = (key: string) => {
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rootRef.current?.querySelector(`[data-sec="${key}"]`)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    setActive(key);
  };

  const saveContact = () => {
    const blob = new Blob([buildVCard(data, pageUrl)], { type: "text/vcard" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${catalog.header.businessName.replace(/[^\w]+/g, "-")}.vcf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const style = { "--cat-primary": catalog.theme.primary, "--cat-accent": catalog.theme.accent } as CSSProperties;
  const nav = ["home", ...sections] as (SectionKey | "home")[];

  return (
    <div ref={rootRef} className={`cat cat-bg-${catalog.theme.background} cat-${mode}`} style={style}>
      <div className="cat-col">
        <Header data={data} category={category} pageUrl={pageUrl} />

        {sections.map((key) => (
          <section key={key} className="cat-panel" data-sec={key} id={mode === "page" ? key : undefined} aria-labelledby={`cat-h-${key}`}>
            <h2 className="cat-h2" id={`cat-h-${key}`}>
              {key === "enquiry" ? catalog.enquiry.heading : SECTION_LABEL[key]}
            </h2>
            {key === "links" && <Links data={data} />}
            {key === "about" && <About data={data} />}
            {key === "documents" && <Documents data={data} />}
            {key === "products" && <Products data={data} pageUrl={pageUrl} onCopy={copy} />}
            {key === "payment" && <Payment data={data} onCopy={copy} />}
            {key === "gallery" && <Gallery data={data} />}
            {key === "videos" && <Videos data={data} />}
            {key === "enquiry" && <Enquiry data={data} />}
            {key === "share" && <Share data={data} pageUrl={pageUrl} onCopy={copy} flash={flash} onSave={saveContact} />}
          </section>
        ))}

        <footer className="cat-foot">
          <span>© {new Date().getFullYear()} {catalog.header.businessName}</span>
          <a href={`/#${category}`}>Visit our website</a>
        </footer>
      </div>

      <nav className="cat-nav" aria-label="Catalogue sections">
        <div className="cat-nav-track">
          {nav.map((key) => {
            const Icon = NAV_ICON[key];
            return (
              <button key={key} type="button" className="cat-nav-btn" aria-current={active === key ? "true" : undefined} onClick={() => go(key)}>
                <Icon />
                <span>{key === "home" ? "Home" : SECTION_LABEL[key]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="cat-note" role="status" aria-live="polite">
        {note && <span>{note}</span>}
      </div>
    </div>
  );
}

/* ---------------- header: shop signboard ---------------- */
function useQr(text: string, size: number, dark: string) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let live = true;
    if (text)
      import("qrcode").then((QR) => {
        if (live && canvas.current) QR.toCanvas(canvas.current, text, { width: size, margin: 1, color: { dark, light: "#ffffff" } });
      });
    return () => {
      live = false;
    };
  }, [text, size, dark]);
  return canvas;
}

// Google Maps share links carry tracking parameters that make the QR denser and harder to scan; drop them.
function shortMapsUrl(url: string) {
  if (!url) return "";
  try {
    const u = new URL(url);
    ["entry", "g_ep", "g_st", "utm_source", "utm_medium"].forEach((k) => u.searchParams.delete(k));
    return u.toString();
  } catch {
    return url;
  }
}

function Header({ data, category, pageUrl }: { data: ResolvedCatalog; category: CatalogCategory; pageUrl: string }) {
  const { header } = data.catalog;
  const c = data.contact;
  // The board's QR takes people to the shop; without a map link it opens this catalogue instead.
  const qrTarget = shortMapsUrl(c.mapsUrl) || pageUrl;
  const qr = useQr(qrTarget, 200, "#17123f");
  const line = [
    c.phone && { key: "phone", href: telHref(c.phone), text: c.phoneDisplay || c.phone, Icon: I.phone },
    c.whatsapp && { key: "wa", href: waHref(c.whatsapp, `Hi ${header.businessName}, I'd like to know more.`), text: "WhatsApp", Icon: I.whatsapp, ext: true },
    c.email && { key: "mail", href: `mailto:${c.email}`, text: c.email, Icon: I.mail },
    c.website && { key: "web", href: c.website, text: c.website.replace(/^https?:\/\//, "").replace(/\/$/, ""), Icon: I.globe, ext: true },
  ].filter(Boolean) as { key: string; href: string; text: string; Icon: typeof I.phone; ext?: boolean }[];

  return (
    <header className="cat-hero" data-sec="home">
      <a className="cat-back" href={`/#${category}`}>
        <I.back /> Website
      </a>
      <div className="cat-board">
        <div className="cat-board-frame">
          <div className="cat-board-title">
            {/* The logo carries the business name, so it is the heading; without one, the name is set in type. */}
            <h1 className={header.logoUrl ? "cat-board-logo" : "cat-name"}>
              {header.logoUrl ? <img src={header.logoUrl} alt={header.businessName} /> : header.businessName}
            </h1>
            {header.personName && (
              <p className="cat-person">
                {header.personName}
                {header.personTitle && <span> · {header.personTitle}</span>}
              </p>
            )}
            {header.tagline && <p className="cat-tagline">{header.tagline}</p>}
          </div>
        </div>

        <figure className="cat-board-qr">
          <a href={qrTarget} target="_blank" rel="noopener" aria-label={c.mapsUrl ? "Open our location in Google Maps" : "Open this catalogue"}>
            <canvas ref={qr} width={200} height={200} role="img" aria-label={c.mapsUrl ? "QR code for our location" : "QR code for this catalogue"} />
          </a>
          <figcaption>
            <strong>Scan here</strong>
            <span>{c.mapsUrl ? "For direct location" : "To open this catalogue"}</span>
          </figcaption>
        </figure>

        {line.length > 0 && (
          <ul className="cat-board-line">
            {line.map(({ key, href, text, Icon, ext }) => (
              <li key={key}>
                <a href={href} {...(ext ? { target: "_blank", rel: "noopener" } : {})}>
                  <span className="cat-board-ic">
                    <Icon />
                  </span>
                  <span>{text}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}

/* ---------------- sections ---------------- */
function Links({ data }: { data: ResolvedCatalog }) {
  return (
    <ul className="cat-rows">
      {data.catalog.links.map((l, i) => {
        const Icon = LINK_ICON[l.type];
        return (
          <li key={i}>
            <a className="cat-row" href={l.url} target="_blank" rel="noopener">
              <span className={`cat-row-ic is-${l.type}`}><Icon /></span>
              <span className="cat-row-text">
                <strong>{l.label}</strong>
                {l.sub && <small>{l.sub}</small>}
              </span>
              <I.external className="cat-row-end" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function About({ data }: { data: ResolvedCatalog }) {
  const a = data.catalog.about;
  const facts = [
    ["Company name", a.companyName],
    ["Established", a.yearEst],
    ["Nature of business", a.nature],
    ["Address", data.contact.address],
  ].filter(([, v]) => v);
  return (
    <div className="cat-about">
      <div>
      {facts.length > 0 && (
        <dl className="cat-facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {a.description && <p className="cat-desc">{a.description}</p>}
      </div>
      {a.specialities.length > 0 && (
        <div>
          <h3 className="cat-h3">Our specialities</h3>
          <ul className="cat-ticks">
            {a.specialities.map((s, i) => (
              <li key={i}>
                <I.check />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Documents({ data }: { data: ResolvedCatalog }) {
  return (
    <ul className="cat-rows">
      {data.catalog.documents.map((d, i) => (
        <li key={i}>
          <a className="cat-row" href={d.url} target="_blank" rel="noopener">
            <span className="cat-row-ic"><I.file /></span>
            <span className="cat-row-text">
              <strong>{d.title}</strong>
              <small>Open document</small>
            </span>
            <I.download className="cat-row-end" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Products({ data, pageUrl, onCopy }: { data: ResolvedCatalog; pageUrl: string; onCopy: (t: string, w: string) => void }) {
  const { showSpec, showPoints } = data.catalog.products;
  const share = async (slug: string, label: string) => {
    const url = `${pageUrl}#p-${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: label, url });
        return;
      } catch {
        /* cancelled: fall through to copy */
      }
    }
    onCopy(url, "Product link");
  };
  return (
    <ul className="cat-products">
      {data.products.map((p) => (
        <li key={p.id} id={`p-${p.id}`} className="cat-product">
          <h3 className="cat-product-name">{p.label}</h3>
          <div className="cat-product-img">
            <img src={p.src} alt={p.label} loading="lazy" />
          </div>
          {showSpec && p.spec && <p className="cat-product-spec">{p.spec}</p>}
          {showPoints && p.points.length > 0 && (
            <ul className="cat-ticks cat-ticks-sm">
              {p.points.map((pt, i) => (
                <li key={i}>
                  <I.check />
                  {pt}
                </li>
              ))}
            </ul>
          )}
          <div className="cat-product-actions">
            <button type="button" className="cat-btn cat-btn-quiet" onClick={() => share(p.id, p.label)}>
              <I.share /> Share
            </button>
            {data.contact.whatsapp && (
              <a className="cat-btn" href={waHref(data.contact.whatsapp, `Hi, I'm interested in ${p.label}. Please share the price and details.`)} target="_blank" rel="noopener">
                <I.whatsapp /> Enquiry
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Payment({ data, onCopy }: { data: ResolvedCatalog; onCopy: (t: string, w: string) => void }) {
  const p = data.catalog.payment;
  const quick = [
    ["PhonePe", p.phonePe],
    ["Google Pay", p.gpay],
    ["UPI ID", p.upiId],
  ].filter(([, v]) => v);
  const bank = [
    ["Bank name", p.bankName],
    ["IFSC code", p.ifsc],
    ["Account name", p.accountName],
    ["Account number", p.accountNumber],
    ["Account type", p.accountType],
  ].filter(([, v]) => v);
  const Row = ({ k, v }: { k: string; v: string }) => (
    <div className="cat-pay-row">
      <dt>{k}</dt>
      <dd>
        <span>{v}</span>
        <button type="button" className="cat-icon-btn" onClick={() => onCopy(v, k)} aria-label={`Copy ${k}`}>
          <I.copy />
        </button>
      </dd>
    </div>
  );
  return (
    <div className="cat-pay">
      {p.qrImageUrl && (
        <figure className="cat-pay-qr">
          <img src={p.qrImageUrl} alt="Payment QR code" loading="lazy" />
          <figcaption>Scan to pay</figcaption>
        </figure>
      )}
      <div className="cat-pay-main">
      {quick.length > 0 && (
        <dl className="cat-pay-list">
          {quick.map(([k, v]) => <Row key={k} k={k} v={v} />)}
        </dl>
      )}
      {bank.length > 0 && (
        <>
          <h3 className="cat-h3">Account details</h3>
          <dl className="cat-pay-list">
            {bank.map(([k, v]) => <Row key={k} k={k} v={v} />)}
          </dl>
        </>
      )}
      </div>
    </div>
  );
}

function Gallery({ data }: { data: ResolvedCatalog }) {
  const [open, setOpen] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (open === null) dlg.current?.close();
    else if (!dlg.current?.open) dlg.current?.showModal();
  }, [open]);
  const pics = data.gallery;
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + pics.length) % pics.length));
  return (
    <>
      <ul className="cat-gallery">
        {pics.map((g, i) => (
          <li key={g.src + i}>
            <button type="button" onClick={() => setOpen(i)} aria-label={`Open photo: ${g.name}`}>
              <img src={g.src} alt={g.name} loading="lazy" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dlg}
        className="cat-lightbox"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
      >
        {open !== null && pics[open] && (
          <figure>
            <img src={pics[open].src} alt={pics[open].name} />
            <figcaption>
              <button type="button" className="cat-icon-btn" onClick={() => step(-1)} aria-label="Previous photo"><I.back /></button>
              <span>{open + 1} / {pics.length}</span>
              <button type="button" className="cat-icon-btn cat-flip" onClick={() => step(1)} aria-label="Next photo"><I.back /></button>
              <button type="button" className="cat-icon-btn" onClick={() => setOpen(null)} aria-label="Close"><I.close /></button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

function Videos({ data }: { data: ResolvedCatalog }) {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <ul className="cat-videos">
      {data.catalog.videos.map((v, i) => {
        const id = youtubeId(v.youtubeUrl);
        const title = v.title || `Video ${i + 1}`;
        return (
          <li key={i}>
            <div className="cat-video">
              {id && playing === id ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                  title={title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : id ? (
                <button type="button" onClick={() => setPlaying(id)} aria-label={`Play: ${title}`}>
                  <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" />
                  <span className="cat-play"><I.play /></span>
                </button>
              ) : (
                <a href={v.youtubeUrl} target="_blank" rel="noopener" className="cat-video-link">
                  <I.external /> Open video
                </a>
              )}
            </div>
            {v.title && <p className="cat-video-title">{v.title}</p>}
          </li>
        );
      })}
    </ul>
  );
}

function Enquiry({ data }: { data: ResolvedCatalog }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const number = data.contact.whatsapp;
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name";
    if (form.phone.trim() && !/^[+\d\s-]{8,16}$/.test(form.phone.trim())) next.phone = "Enter a valid phone number";
    if (!form.message.trim()) next.message = "Tell us what you need";
    setErr(next);
    if (Object.keys(next).length) return;
    const text = `Enquiry from ${form.name.trim()}${form.phone.trim() ? ` (${form.phone.trim()})` : ""}:\n${form.message.trim()}`;
    window.open(waHref(number, text), "_blank", "noopener");
  };
  const field = (k: "name" | "phone" | "message", label: string, node: ReactNode) => (
    <label className="cat-field">
      <span>{label}</span>
      {node}
      {err[k] && <em role="alert">{err[k]}</em>}
    </label>
  );
  if (!number) return <p className="cat-desc">Enquiries open once a WhatsApp number is set.</p>;
  const c = data.contact;
  return (
    <div className="cat-enq">
      <div className="cat-enq-info">
        <p>Fill this in and WhatsApp opens with your message ready to send. Nothing is stored on this page.</p>
        {(c.phone || c.hours) && (
          <ul className="cat-enq-list">
            {c.phone && (
              <li>
                <I.phone />
                <span>
                  Prefer to talk? <a href={telHref(c.phone)}>Call {c.phoneDisplay || c.phone}</a>
                </span>
              </li>
            )}
            {c.hours && (
              <li>
                <I.clock />
                <span>{c.hours}</span>
              </li>
            )}
          </ul>
        )}
      </div>
    <form className="cat-form" onSubmit={submit} noValidate>
      {field("name", "Your name", <input value={form.name} autoComplete="name" maxLength={80} aria-invalid={!!err.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />)}
      {field("phone", "Phone (optional)", <input value={form.phone} type="tel" inputMode="tel" autoComplete="tel" maxLength={16} aria-invalid={!!err.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />)}
      {field("message", "What do you need?", <textarea value={form.message} rows={4} maxLength={1000} aria-invalid={!!err.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />)}
      <button type="submit" className="cat-btn cat-btn-wide">
        <I.whatsapp /> {data.catalog.enquiry.buttonLabel}
      </button>
    </form>
    </div>
  );
}

function Share({
  data,
  pageUrl,
  onCopy,
  flash,
  onSave,
}: {
  data: ResolvedCatalog;
  pageUrl: string;
  onCopy: (t: string, w: string) => void;
  flash: (t: string) => void;
  onSave: () => void;
}) {
  const canvas = useQr(pageUrl, 200, data.catalog.theme.primary);
  const [num, setNum] = useState("");

  const native = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: data.catalog.header.businessName, url: pageUrl });
        return;
      } catch {
        /* cancelled */
      }
    }
    onCopy(pageUrl, "Link");
  };
  const saveQr = () => {
    const a = document.createElement("a");
    a.href = canvas.current?.toDataURL("image/png") ?? "";
    a.download = "catalogue-qr.png";
    a.click();
  };
  const sendWa = (e: FormEvent) => {
    e.preventDefault();
    const digits = num.replace(/\D/g, "");
    if (digits.length !== 10) return flash("Enter a 10-digit mobile number");
    window.open(waHref(`91${digits}`, `${data.catalog.header.businessName}: ${pageUrl}`), "_blank", "noopener");
  };

  return (
    <div className="cat-share">
      <figure className="cat-qr">
        <canvas ref={canvas} width={200} height={200} aria-label="QR code for this catalogue" role="img" />
        <figcaption>Scan to open this catalogue</figcaption>
      </figure>
      <div className="cat-share-main">
      <div className="cat-share-link">
        <span>{pageUrl.replace(/^https?:\/\//, "")}</span>
        <button type="button" className="cat-icon-btn" onClick={() => onCopy(pageUrl, "Link")} aria-label="Copy link">
          <I.copy />
        </button>
      </div>
      <div className="cat-share-btns">
        <button type="button" className="cat-btn" onClick={native}>
          <I.share /> Share
        </button>
        <button type="button" className="cat-btn cat-btn-quiet" onClick={saveQr}>
          <I.download /> Save QR
        </button>
        <button type="button" className="cat-btn cat-btn-quiet" onClick={onSave}>
          <I.contact /> Save contact
        </button>
      </div>
      <form className="cat-share-wa" onSubmit={sendWa}>
        <label htmlFor="cat-wa-num">Send to a WhatsApp number</label>
        <div>
          <span>+91</span>
          <input id="cat-wa-num" type="tel" inputMode="numeric" placeholder="Mobile number" maxLength={14} value={num} onChange={(e) => setNum(e.target.value)} />
          <button type="submit" className="cat-btn">
            <I.whatsapp /> Send
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
