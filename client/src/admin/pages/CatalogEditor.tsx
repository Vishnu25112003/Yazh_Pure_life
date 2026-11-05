import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CatalogCard } from "../../catalog/CatalogCard";
import { resolveCatalog } from "../../catalog/resolve";
import { SECTION_LABEL, type Catalog, type CatalogPayload, type LinkType, type SectionKey } from "../../catalog/types";
import { api } from "../api";
import { ImageUpload } from "../ImageUpload";
import { PointsEditor } from "../PointsEditor";
import { PRODUCT_SECTIONS } from "../sections";
import type { Category } from "../types";
import { errMsg, Field, fieldErrors, Icons, PageHead, Spinner, Switch, timeAgo, useLoad, useUi } from "../ui";

interface AdminCatalog extends CatalogPayload {
  isPublished: boolean;
  updatedAt: string | null;
}

const TABS = [
  { id: "card", label: "Card & style", keys: ["buttonLabel", "theme", "header"] },
  { id: "contact", label: "Contact", keys: ["contact"] },
  { id: "layout", label: "Layout", keys: ["sections"] },
  { id: "about", label: "About", keys: ["about"] },
  { id: "products", label: "Products", keys: ["products"] },
  { id: "gallery", label: "Gallery", keys: ["gallery"] },
  { id: "links", label: "Links & documents", keys: ["links", "documents"] },
  { id: "videos", label: "Videos", keys: ["videos"] },
  { id: "payment", label: "Payment", keys: ["payment"] },
  { id: "enquiry", label: "Enquiry", keys: ["enquiry"] },
] as const;
type TabId = (typeof TABS)[number]["id"];

const LINK_TYPES: { value: LinkType; label: string }[] = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "x", label: "X (Twitter)" },
  { value: "website", label: "Website" },
  { value: "other", label: "Other link" },
];

// "Commercial RO plants" → "commercial RO plants" (keeps acronyms).
const lowerFirst = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

const move = <T,>(list: T[], i: number, d: number) => {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

export function CatalogEditor({ category }: { category: Category }) {
  const meta = PRODUCT_SECTIONS[category];
  const navigate = useNavigate();
  const { toast, confirm } = useUi();
  const { data, setData, error } = useLoad(() => api.get<AdminCatalog>(`/catalogs/${category}`), [category]);
  const { data: config } = useLoad(() => api.get<{ uploadsEnabled: boolean }>("/config"));
  const uploadsEnabled = !!config?.uploadsEnabled;

  const [form, setForm] = useState<Catalog | null>(null);
  const [published, setPublished] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tab, setTab] = useState<TabId>("card");
  const [busy, setBusy] = useState(false);
  const [device, setDevice] = useState<"phone" | "desktop">("phone");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (data) {
      setForm(structuredClone(data.catalog));
      setPublished(data.isPublished);
      setErrors({});
    }
  }, [data]);

  const dirty = !!data && !!form && (published !== data.isPublished || JSON.stringify(form) !== JSON.stringify(data.catalog));

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const resolved = useMemo(() => (data && form ? resolveCatalog({ ...data, catalog: form }, window.location.origin) : null), [data, form]);

  if (error) return <div className="adm-alert">{error}</div>;
  if (!data || !form || !resolved) return <Spinner />;

  const pageUrl = `${window.location.origin}/catalog/${category}`;
  const sc = data.siteContact;
  const upd = <K extends keyof Catalog>(key: K, value: Catalog[K]) => setForm((f) => (f ? { ...f, [key]: value } : f));
  const updIn = <K extends keyof Catalog>(key: K, patch: Partial<Catalog[K]>) =>
    setForm((f) => (f ? { ...f, [key]: { ...(f[key] as object), ...patch } } : f));
  const err = (path: string) => errors[`catalog.${path}`];

  const text = (path: string, label: string, value: string, onChange: (v: string) => void, opts: { hint?: string; placeholder?: string; max?: number; area?: boolean; type?: string; inputMode?: "tel" | "email" | "url" | "numeric" } = {}) => (
    <Field label={label} htmlFor={`cf-${path}`} error={err(path)} hint={opts.hint}>
      {opts.area ? (
        <textarea id={`cf-${path}`} className="adm-input" rows={5} value={value} maxLength={opts.max} placeholder={opts.placeholder} aria-invalid={!!err(path)} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={`cf-${path}`} className="adm-input" type={opts.type ?? "text"} inputMode={opts.inputMode} value={value} maxLength={opts.max} placeholder={opts.placeholder} aria-invalid={!!err(path)} onChange={(e) => onChange(e.target.value)} />
      )}
    </Field>
  );

  const save = async () => {
    setBusy(true);
    setErrors({});
    try {
      const next = await api.put<AdminCatalog>(`/catalogs/${category}`, { isPublished: published, catalog: form });
      setData(next);
      toast("Catalogue saved");
    } catch (e) {
      const fe = fieldErrors(e);
      setErrors(fe);
      const first = Object.keys(fe)[0]?.split(".")[1];
      const t = TABS.find((x) => (x.keys as readonly string[]).includes(first));
      if (t) setTab(t.id);
      toast(errMsg(e), true);
    } finally {
      setBusy(false);
    }
  };

  const discard = async () => {
    if (await confirm({ title: "Discard changes?", message: "Your unsaved edits to this catalogue will be lost.", confirmLabel: "Discard", danger: true })) {
      setForm(structuredClone(data.catalog));
      setPublished(data.isPublished);
      setErrors({});
    }
  };

  const back = async () => {
    if (!dirty || (await confirm({ title: "Leave without saving?", message: "Your unsaved edits to this catalogue will be lost.", confirmLabel: "Leave", danger: true })))
      navigate(`/${category}`);
  };

  /* ---------------- tab bodies ---------------- */
  const panels: Record<TabId, ReactNode> = {
    card: (
      <>
        <h2>Card & style</h2>
        <Field label="Logo" htmlFor="cf-header.logoUrl" error={err("header.logoUrl")}>
          <ImageUpload id="cf-header.logoUrl" value={form.header.logoUrl} onChange={(v) => updIn("header", { logoUrl: v })} section="catalog" uploadsEnabled={uploadsEnabled} invalid={!!err("header.logoUrl")} />
        </Field>
        <div className="adm-cols">
          {text("header.businessName", "Business name", form.header.businessName, (v) => updIn("header", { businessName: v }), { max: 80 })}
          {text("header.tagline", "Tagline", form.header.tagline, (v) => updIn("header", { tagline: v }), { max: 160, hint: "One line under the name." })}
          {text("header.personName", "Person name (optional)", form.header.personName, (v) => updIn("header", { personName: v }), { max: 80, placeholder: "e.g. Mr. Kumar" })}
          {text("header.personTitle", "Person title (optional)", form.header.personTitle, (v) => updIn("header", { personTitle: v }), { max: 60, placeholder: "e.g. Proprietor" })}
        </div>
        {text("buttonLabel", "Home page button text", form.buttonLabel, (v) => upd("buttonLabel", v), {
          max: 40,
          hint: `Shown in the ${meta.title} section, before “Not sure which one? Get a free consultation →”.`,
        })}

        <h3 className="adm-subhead">Colours</h3>
        <div className="adm-cols">
          {(["primary", "accent"] as const).map((k) => (
            <Field key={k} label={k === "primary" ? "Main colour" : "Second colour (WhatsApp, ticks)"} htmlFor={`cf-theme.${k}`} error={err(`theme.${k}`)}>
              <div className="adm-colour">
                <input type="color" value={/^#[0-9a-f]{6}$/i.test(form.theme[k]) ? form.theme[k] : "#035eb2"} onChange={(e) => updIn("theme", { [k]: e.target.value })} aria-label={`${k} colour picker`} />
                <input id={`cf-theme.${k}`} className="adm-input" value={form.theme[k]} maxLength={7} onChange={(e) => updIn("theme", { [k]: e.target.value })} aria-invalid={!!err(`theme.${k}`)} />
              </div>
            </Field>
          ))}
        </div>
        <Field label="Background">
          <div className="adm-choice" role="radiogroup" aria-label="Background">
            {(
              [
                ["texture", "Dark ripple"],
                ["light", "Light ripple"],
                ["brand", "Main colour"],
              ] as const
            ).map(([v, l]) => (
              <label key={v} className={`adm-choice-item${form.theme.background === v ? " is-on" : ""}`}>
                <input type="radio" name="bg" checked={form.theme.background === v} onChange={() => updIn("theme", { background: v })} />
                <span className={`adm-choice-swatch is-${v}`} style={v === "brand" ? { background: form.theme.primary } : undefined} />
                {l}
              </label>
            ))}
          </div>
        </Field>
        <button type="button" className="adm-btn adm-btn-sm" onClick={() => updIn("theme", { primary: "#035eb2", accent: "#1f9684" })}>
          Reset to Yazh colours
        </button>
      </>
    ),

    contact: (
      <>
        <h2>Contact</h2>
        <p className="adm-note">Leave a field empty to use the site-wide value from Footer → Contact (shown in grey).</p>
        <div className="adm-cols">
          {text("contact.phone", "Phone", form.contact.phone, (v) => updIn("contact", { phone: v }), { inputMode: "tel", placeholder: sc.phone, max: 20 })}
          {text("contact.whatsapp", "WhatsApp number", form.contact.whatsapp, (v) => updIn("contact", { whatsapp: v }), { inputMode: "numeric", placeholder: sc.whatsapp, max: 15, hint: "Digits with country code, e.g. 919876543210" })}
          {text("contact.email", "Email", form.contact.email, (v) => updIn("contact", { email: v }), { type: "email", inputMode: "email", placeholder: sc.email, max: 200 })}
          {text("contact.website", "Website", form.contact.website, (v) => updIn("contact", { website: v }), { inputMode: "url", placeholder: window.location.origin, max: 2000 })}
        </div>
        {text("contact.address", "Address", form.contact.address, (v) => updIn("contact", { address: v }), { area: true, placeholder: sc.address, max: 400 })}
        {text("contact.mapsUrl", "Google Maps link (Direction button)", form.contact.mapsUrl, (v) => updIn("contact", { mapsUrl: v }), { inputMode: "url", placeholder: sc.mapsUrl || "https://maps.google.com/…", max: 2000, hint: "Empty uses your first branch's map link." })}
      </>
    ),

    layout: (
      <>
        <h2>Layout</h2>
        <p className="adm-note">Turn sections on or off and set their order. The header card always comes first.</p>
        <ul className="adm-seclist">
          {form.sections.map((s, i) => {
            const empty = s.enabled && !resolved.sections.includes(s.key);
            return (
              <li key={s.key} className={s.enabled ? "" : "is-off"}>
                <div className="adm-seclist-name">
                  <strong>{SECTION_LABEL[s.key]}</strong>
                  {empty && <small>Hidden until it has content</small>}
                </div>
                <Switch checked={s.enabled} label={s.enabled ? "Shown" : "Off"} onChange={(v) => upd("sections", form.sections.map((x, j) => (j === i ? { ...x, enabled: v } : x)))} />
                <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => upd("sections", move(form.sections, i, -1))} aria-label={`Move ${SECTION_LABEL[s.key]} up`}>
                  <Icons.up />
                </button>
                <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" disabled={i === form.sections.length - 1} onClick={() => upd("sections", move(form.sections, i, 1))} aria-label={`Move ${SECTION_LABEL[s.key]} down`}>
                  <Icons.down />
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="adm-btn adm-btn-sm"
          onClick={() =>
            upd(
              "sections",
              (["links", "about", "documents", "products", "payment", "gallery", "videos", "enquiry", "share"] as SectionKey[]).map((key) => ({
                key,
                enabled: form.sections.find((s) => s.key === key)?.enabled ?? true,
              }))
            )
          }
        >
          Reset order
        </button>
      </>
    ),

    about: (
      <>
        <h2>About us</h2>
        <div className="adm-cols">
          {text("about.companyName", "Company name", form.about.companyName, (v) => updIn("about", { companyName: v }), { max: 100 })}
          {text("about.yearEst", "Year established", form.about.yearEst, (v) => updIn("about", { yearEst: v }), { max: 10, inputMode: "numeric", placeholder: "e.g. 2015" })}
        </div>
        {text("about.nature", "Nature of business", form.about.nature, (v) => updIn("about", { nature: v }), { max: 120 })}
        <Field label="Our specialities" error={Object.entries(errors).find(([k]) => k.startsWith("catalog.about.specialities"))?.[1]} hint="One per line. Press Enter to add the next one.">
          <PointsEditor value={form.about.specialities} onChange={(v) => updIn("about", { specialities: v })} />
        </Field>
        {text("about.description", "Description", form.about.description, (v) => updIn("about", { description: v }), { area: true, max: 1500 })}
      </>
    ),

    products: (
      <>
        <h2>Products</h2>
        <div className="adm-choice" role="radiogroup" aria-label="Which products">
          {(
            [
              ["all", `All visible ${lowerFirst(meta.title)}`],
              ["selected", "Only the ones I pick"],
            ] as const
          ).map(([v, l]) => (
            <label key={v} className={`adm-choice-item${form.products.mode === v ? " is-on" : ""}`}>
              <input type="radio" name="pmode" checked={form.products.mode === v} onChange={() => updIn("products", { mode: v })} />
              {l}
            </label>
          ))}
        </div>
        <div className="adm-switches">
          <Switch checked={form.products.showSpec} onChange={(v) => updIn("products", { showSpec: v })} label="Show spec line" />
          <Switch checked={form.products.showPoints} onChange={(v) => updIn("products", { showPoints: v })} label="Show key points" />
        </div>
        {form.products.mode === "all" ? (
          <p className="adm-note">
            Shows every visible product from the <Link to={`/${category}`}>{meta.title}</Link> list, in the same order. Hidden products stay hidden.
          </p>
        ) : (
          <ProductPicker data={data} ids={form.products.productIds} onChange={(ids) => updIn("products", { productIds: ids })} />
        )}
      </>
    ),

    gallery: (
      <>
        <h2>Gallery</h2>
        <div className="adm-choice" role="radiogroup" aria-label="Which photos">
          {(
            [
              ["all", "All site gallery photos"],
              ["custom", "My own selection"],
            ] as const
          ).map(([v, l]) => (
            <label key={v} className={`adm-choice-item${form.gallery.mode === v ? " is-on" : ""}`}>
              <input type="radio" name="gmode" checked={form.gallery.mode === v} onChange={() => updIn("gallery", { mode: v })} />
              {l}
            </label>
          ))}
        </div>
        {form.gallery.mode === "all" ? (
          <p className="adm-note">
            Uses the {data.gallery.length} visible photos from <Link to="/gallery">Gallery</Link>.
            {category !== "domestic" && " Those are mostly home purifiers, so for this catalogue “My own selection” is usually the better choice."}
          </p>
        ) : (
          <>
            <ListEditor
              items={form.gallery.images}
              onChange={(images) => updIn("gallery", { images })}
              blank={() => ""}
              addLabel="Add photo"
              max={40}
              render={(src, i, set) => (
                <Field label={`Photo ${i + 1}`} error={err(`gallery.images.${i}`)}>
                  <ImageUpload value={src} onChange={set} section="catalog" uploadsEnabled={uploadsEnabled} invalid={!!err(`gallery.images.${i}`)} />
                </Field>
              )}
            />
            {data.gallery.length > 0 && (
              <>
                <h3 className="adm-subhead">Add from the site gallery</h3>
                {category !== "domestic" && (
                  <p className="adm-note">These photos are mostly home purifiers. Pick only ones that show {lowerFirst(meta.title)}, or upload your own above.</p>
                )}
                <div className="adm-pickgrid">
                  {data.gallery.map((g) => {
                    const on = form.gallery.images.includes(g.src);
                    return (
                      <button
                        key={g.src}
                        type="button"
                        className={on ? "is-on" : ""}
                        aria-pressed={on}
                        onClick={() => updIn("gallery", { images: on ? form.gallery.images.filter((x) => x !== g.src) : [...form.gallery.images, g.src] })}
                      >
                        <img src={g.src} alt={g.name} loading="lazy" />
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </>
    ),

    links: (
      <>
        <h2>Links</h2>
        <ListEditor
          items={form.links}
          onChange={(links) => upd("links", links)}
          blank={() => ({ type: "facebook" as LinkType, label: "Facebook", sub: "Follow us for updates", url: "" })}
          addLabel="Add link"
          max={12}
          render={(l, i, set) => (
            <div className="adm-cols">
              <Field label="Type" htmlFor={`cf-l${i}-type`}>
                <select
                  id={`cf-l${i}-type`}
                  className="adm-input"
                  value={l.type}
                  onChange={(e) => {
                    const type = e.target.value as LinkType;
                    const wasDefault = LINK_TYPES.some((t) => t.label === l.label);
                    set({ ...l, type, label: wasDefault ? LINK_TYPES.find((t) => t.value === type)!.label : l.label });
                  }}
                >
                  {LINK_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              {text(`links.${i}.label`, "Name", l.label, (v) => set({ ...l, label: v }), { max: 60 })}
              {text(`links.${i}.url`, "Link", l.url, (v) => set({ ...l, url: v }), { inputMode: "url", placeholder: "https://…", max: 2000 })}
              {text(`links.${i}.sub`, "Note (optional)", l.sub, (v) => set({ ...l, sub: v }), { max: 80 })}
            </div>
          )}
        />
        <h2 className="adm-gap">Documents</h2>
        <p className="adm-note">For a PDF brochure: upload it to Google Drive, set sharing to “Anyone with the link”, then paste the link here.</p>
        <ListEditor
          items={form.documents}
          onChange={(documents) => upd("documents", documents)}
          blank={() => ({ title: "", url: "" })}
          addLabel="Add document"
          max={10}
          render={(d, i, set) => (
            <div className="adm-cols">
              {text(`documents.${i}.title`, "Name", d.title, (v) => set({ ...d, title: v }), { max: 80, placeholder: "e.g. Product brochure" })}
              {text(`documents.${i}.url`, "Link", d.url, (v) => set({ ...d, url: v }), { inputMode: "url", placeholder: "https://…", max: 2000 })}
            </div>
          )}
        />
      </>
    ),

    videos: (
      <>
        <h2>Videos</h2>
        <ListEditor
          items={form.videos}
          onChange={(videos) => upd("videos", videos)}
          blank={() => ({ title: "", youtubeUrl: "" })}
          addLabel="Add YouTube video"
          max={10}
          render={(v, i, set) => (
            <div className="adm-cols">
              {text(`videos.${i}.youtubeUrl`, "YouTube link", v.youtubeUrl, (x) => set({ ...v, youtubeUrl: x }), { inputMode: "url", placeholder: "https://youtu.be/…", max: 2000 })}
              {text(`videos.${i}.title`, "Title (optional)", v.title, (x) => set({ ...v, title: x }), { max: 80 })}
            </div>
          )}
        />
      </>
    ),

    payment: (
      <>
        <h2>Payment</h2>
        <p className="adm-note">Only filled fields are shown. The section stays hidden while everything is empty.</p>
        <div className="adm-cols">
          {text("payment.phonePe", "PhonePe number", form.payment.phonePe, (v) => updIn("payment", { phonePe: v }), { inputMode: "tel", max: 20 })}
          {text("payment.gpay", "Google Pay number", form.payment.gpay, (v) => updIn("payment", { gpay: v }), { inputMode: "tel", max: 20 })}
          {text("payment.upiId", "UPI ID", form.payment.upiId, (v) => updIn("payment", { upiId: v }), { max: 80, placeholder: "name@bank" })}
        </div>
        <Field label="Payment QR image (optional)" error={err("payment.qrImageUrl")}>
          <ImageUpload value={form.payment.qrImageUrl} onChange={(v) => updIn("payment", { qrImageUrl: v })} section="catalog" uploadsEnabled={uploadsEnabled} invalid={!!err("payment.qrImageUrl")} />
        </Field>
        <h3 className="adm-subhead">Bank account</h3>
        <div className="adm-cols">
          {text("payment.bankName", "Bank name", form.payment.bankName, (v) => updIn("payment", { bankName: v }), { max: 80 })}
          {text("payment.ifsc", "IFSC code", form.payment.ifsc, (v) => updIn("payment", { ifsc: v.toUpperCase() }), { max: 20 })}
          {text("payment.accountName", "Account name", form.payment.accountName, (v) => updIn("payment", { accountName: v }), { max: 100 })}
          {text("payment.accountNumber", "Account number", form.payment.accountNumber, (v) => updIn("payment", { accountNumber: v }), { inputMode: "numeric", max: 30 })}
          {text("payment.accountType", "Account type", form.payment.accountType, (v) => updIn("payment", { accountType: v }), { max: 40, placeholder: "e.g. Current" })}
        </div>
      </>
    ),

    enquiry: (
      <>
        <h2>Enquiry form</h2>
        <p className="adm-note">Customers fill name, phone and message; it opens WhatsApp to your number with the text ready to send. Nothing is stored.</p>
        <div className="adm-cols">
          {text("enquiry.heading", "Heading", form.enquiry.heading, (v) => updIn("enquiry", { heading: v }), { max: 60 })}
          {text("enquiry.buttonLabel", "Button text", form.enquiry.buttonLabel, (v) => updIn("enquiry", { buttonLabel: v }), { max: 40 })}
        </div>
      </>
    ),
  };

  const errorTabs = new Set(
    Object.keys(errors)
      .map((k) => TABS.find((t) => (t.keys as readonly string[]).includes(k.split(".")[1]))?.id)
      .filter(Boolean)
  );

  return (
    <>
      <PageHead title={`${meta.title} catalogue`} sub={data.updatedAt ? `Last saved ${timeAgo(data.updatedAt)}` : "Not edited yet. Showing the defaults."}>
        <button type="button" className="adm-btn adm-btn-sm" onClick={back}>
          <Icons.back /> Back
        </button>
        <a className="adm-btn adm-btn-sm" href={pageUrl} target="_blank" rel="noopener">
          <Icons.external /> Open page
        </a>
      </PageHead>

      <div className="adm-catgrid">
        <div className="adm-catform">
          <div className={`adm-card adm-publish${published ? "" : " is-off"}`}>
            <Switch checked={published} onChange={setPublished} label={published ? "Published: the page is live and the home page shows its button" : "Unpublished: page hidden and home button removed"} />
          </div>

          <div className="adm-tabs adm-tabs-scroll" role="tablist" aria-label="Catalogue settings">
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={errorTabs.has(t.id) ? "has-error" : undefined}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="adm-card" role="tabpanel">
            {panels[tab]}
          </div>
        </div>

        <aside className={`adm-catpreview${showPreview ? " is-open" : ""}`} aria-label="Live preview">
          <div className="adm-catpreview-bar">
            <strong>Live preview</strong>
            <div className="adm-seg" role="group" aria-label="Preview size">
              <button type="button" aria-pressed={device === "phone"} onClick={() => setDevice("phone")}>
                Phone
              </button>
              <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}>
                Desktop
              </button>
            </div>
          </div>
          <PreviewFrame device={device}>
            <CatalogCard data={resolved} category={category} pageUrl={pageUrl} mode="preview" />
          </PreviewFrame>
        </aside>
      </div>

      <div className="adm-savebar">
        <button type="button" className="adm-btn adm-catpreview-toggle" onClick={() => setShowPreview((v) => !v)} aria-expanded={showPreview}>
          <Icons.eye /> {showPreview ? "Hide preview" : "Preview"}
        </button>
        <span className="adm-savebar-state">{dirty ? "Unsaved changes" : "All changes saved"}</span>
        {dirty && (
          <button type="button" className="adm-btn" onClick={discard} disabled={busy}>
            Discard
          </button>
        )}
        <button type="button" className="adm-btn adm-btn-primary" onClick={save} disabled={busy || !dirty}>
          {busy ? "Saving…" : "Save catalogue"}
        </button>
      </div>
    </>
  );
}

/* ---------------- helpers ---------------- */
function ListEditor<T>({
  items,
  onChange,
  blank,
  render,
  addLabel,
  max,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  blank: () => T;
  render: (item: T, i: number, set: (v: T) => void) => ReactNode;
  addLabel: string;
  max: number;
}) {
  return (
    <div className="adm-listedit">
      {items.length === 0 && <p className="adm-note">Nothing added yet. This section stays hidden until you add one.</p>}
      {items.map((item, i) => (
        <div key={i} className="adm-listedit-item">
          <div className="adm-listedit-body">{render(item, i, (v) => onChange(items.map((x, j) => (j === i ? v : x))))}</div>
          <div className="adm-listedit-actions">
            <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => onChange(move(items, i, -1))} aria-label="Move up">
              <Icons.up />
            </button>
            <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" disabled={i === items.length - 1} onClick={() => onChange(move(items, i, 1))} aria-label="Move down">
              <Icons.down />
            </button>
            <button type="button" className="adm-btn adm-btn-sm adm-btn-icon adm-btn-danger" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Remove">
              <Icons.trash />
            </button>
          </div>
        </div>
      ))}
      {items.length < max && (
        <button type="button" className="adm-btn" onClick={() => onChange([...items, blank()])}>
          <Icons.plus /> {addLabel}
        </button>
      )}
    </div>
  );
}

function ProductPicker({ data, ids, onChange }: { data: CatalogPayload; ids: number[]; onChange: (ids: number[]) => void }) {
  const chosen = ids.map((id) => data.products.find((p) => p.dbId === id)).filter((p): p is CatalogPayload["products"][number] => !!p);
  const rest = data.products.filter((p) => !ids.includes(p.dbId));
  return (
    <>
      <h3 className="adm-subhead">In the catalogue ({chosen.length})</h3>
      {chosen.length === 0 && <p className="adm-note">Tick products below to add them.</p>}
      <ul className="adm-list adm-picklist">
        {chosen.map((p, i) => (
          <li key={p.dbId} className={`adm-row${p.isActive ? "" : " is-hidden"}`}>
            <img className="adm-thumb" src={p.src} alt="" />
            <div className="adm-row-body">
              <div className="adm-row-title">{p.label}</div>
              <div className="adm-row-sub">{p.isActive ? p.spec : "Hidden on the site, so not shown"}</div>
            </div>
            <div className="adm-row-actions">
              <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" disabled={i === 0} onClick={() => onChange(move(ids, i, -1))} aria-label={`Move ${p.label} up`}>
                <Icons.up />
              </button>
              <button type="button" className="adm-btn adm-btn-sm adm-btn-icon" disabled={i === chosen.length - 1} onClick={() => onChange(move(ids, i, 1))} aria-label={`Move ${p.label} down`}>
                <Icons.down />
              </button>
              <button type="button" className="adm-btn adm-btn-sm" onClick={() => onChange(ids.filter((x) => x !== p.dbId))}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {rest.length > 0 && (
        <>
          <h3 className="adm-subhead">Not in the catalogue</h3>
          <ul className="adm-list adm-picklist">
            {rest.map((p) => (
              <li key={p.dbId} className={`adm-row${p.isActive ? "" : " is-hidden"}`}>
                <img className="adm-thumb" src={p.src} alt="" />
                <div className="adm-row-body">
                  <div className="adm-row-title">{p.label}</div>
                  <div className="adm-row-sub">{p.isActive ? p.spec : "Hidden on the site"}</div>
                </div>
                <div className="adm-row-actions">
                  <button type="button" className="adm-btn adm-btn-sm" onClick={() => onChange([...ids, p.dbId])}>
                    <Icons.plus /> Add
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

// The desktop preview lays the card out at a real laptop width, then scales it down to fit the frame,
// so admins see the actual wide layout instead of a stretched phone card.
const DESKTOP_W = 1280;
function PreviewFrame({ device, children }: { device: "phone" | "desktop"; children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = frame.current;
    if (!el || device !== "desktop") return;
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / DESKTOP_W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [device]);
  return (
    <div ref={frame} className={`adm-catframe is-${device}`} data-cat-scroll>
      {device === "desktop" ? (
        <div className="adm-catzoom" style={{ width: DESKTOP_W, zoom: scale }}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
