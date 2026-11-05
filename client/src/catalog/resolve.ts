import type { Catalog, CatalogPayload, CatalogProductInput, SectionKey } from "./types";

export interface ResolvedContact {
  phone: string; // for tel:
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  mapsUrl: string;
  website: string;
  hours: string;
}

export interface ResolvedCatalog {
  catalog: Catalog;
  contact: ResolvedContact;
  products: CatalogProductInput[];
  gallery: { src: string; name: string }[];
  /** Enabled sections that have something to show, in the admin's order. */
  sections: SectionKey[];
}

const hasPayment = (p: Catalog["payment"]) => Object.values(p).some((v) => v.trim() !== "");

/**
 * Turns a stored catalogue + site-wide inputs into exactly what the card shows.
 * Used by the public page AND the admin live preview, so they can never disagree.
 */
export function resolveCatalog(payload: CatalogPayload, origin: string): ResolvedCatalog {
  const { catalog, siteContact } = payload;
  const c = catalog.contact;
  const phone = c.phone || siteContact.phone;

  const active = payload.products.filter((p) => p.isActive);
  const products =
    catalog.products.mode === "selected"
      ? catalog.products.productIds.map((id) => active.find((p) => p.dbId === id)).filter((p): p is CatalogProductInput => !!p)
      : active;

  const gallery =
    catalog.gallery.mode === "custom"
      ? catalog.gallery.images.filter(Boolean).map((src, i) => ({ src, name: `Photo ${i + 1}` }))
      : payload.gallery;

  const filled: Record<SectionKey, boolean> = {
    links: catalog.links.length > 0,
    about: !!(catalog.about.companyName || catalog.about.nature || catalog.about.description || catalog.about.specialities.length),
    documents: catalog.documents.length > 0,
    products: products.length > 0,
    payment: hasPayment(catalog.payment),
    gallery: gallery.length > 0,
    videos: catalog.videos.length > 0,
    enquiry: true,
    share: true,
  };

  return {
    catalog,
    contact: {
      phone,
      // A catalogue-specific phone is shown as typed; otherwise the site's display format is used.
      phoneDisplay: c.phone || siteContact.phoneDisplay,
      whatsapp: c.whatsapp || siteContact.whatsapp,
      email: c.email || siteContact.email,
      address: c.address || siteContact.address,
      mapsUrl: c.mapsUrl || siteContact.mapsUrl,
      website: c.website || origin,
      hours: siteContact.hours,
    },
    products,
    gallery,
    sections: catalog.sections.filter((s) => s.enabled && filled[s.key]).map((s) => s.key),
  };
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const waHref = (number: string, text: string) => `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/** vCard 3.0 for "Save to contacts". */
export function buildVCard(r: ResolvedCatalog, pageUrl: string): string {
  const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (m) => `\\${m}`);
  const h = r.catalog.header;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${esc(h.personName || h.businessName)}`,
    `ORG:${esc(h.businessName)}`,
    h.personTitle && `TITLE:${esc(h.personTitle)}`,
    r.contact.phone && `TEL;TYPE=WORK,VOICE:${r.contact.phone.replace(/\s/g, "")}`,
    r.contact.email && `EMAIL;TYPE=WORK:${r.contact.email}`,
    r.contact.address && `ADR;TYPE=WORK:;;${esc(r.contact.address)};;;;`,
    `URL:${pageUrl}`,
    "END:VCARD",
  ];
  return lines.filter(Boolean).join("\r\n");
}
