// Shape of a catalogue, mirroring server/src/catalog.js and catalogSchema in server/src/schemas.js.

export type CatalogCategory = "domestic" | "commercial" | "dispenser";
export const CATALOG_CATEGORIES: CatalogCategory[] = ["domestic", "commercial", "dispenser"];

export type SectionKey = "links" | "about" | "documents" | "products" | "payment" | "gallery" | "videos" | "enquiry" | "share";
export type LinkType = "facebook" | "instagram" | "youtube" | "x" | "website" | "other";

export interface Catalog {
  buttonLabel: string;
  theme: { primary: string; accent: string; background: "texture" | "light" | "brand" };
  header: { logoUrl: string; businessName: string; personName: string; personTitle: string; tagline: string };
  contact: { phone: string; whatsapp: string; email: string; address: string; mapsUrl: string; website: string };
  sections: { key: SectionKey; enabled: boolean }[];
  links: { type: LinkType; label: string; sub: string; url: string }[];
  about: { companyName: string; yearEst: string; nature: string; specialities: string[]; description: string };
  documents: { title: string; url: string }[];
  products: { mode: "all" | "selected"; productIds: number[]; showSpec: boolean; showPoints: boolean };
  payment: {
    phonePe: string;
    gpay: string;
    upiId: string;
    qrImageUrl: string;
    bankName: string;
    ifsc: string;
    accountName: string;
    accountNumber: string;
    accountType: string;
  };
  gallery: { mode: "all" | "custom"; images: string[] };
  videos: { title: string; youtubeUrl: string }[];
  enquiry: { heading: string; buttonLabel: string };
}

export interface SiteContactInput {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  mapsUrl: string;
}

export interface CatalogProductInput {
  dbId: number;
  id: string; // slug
  label: string;
  spec: string;
  src: string;
  points: string[];
  isActive: boolean;
}

/** What GET /api/catalog/:category returns (the admin GET adds isPublished/updatedAt). */
export interface CatalogPayload {
  category: CatalogCategory;
  catalog: Catalog;
  siteContact: SiteContactInput;
  products: CatalogProductInput[];
  gallery: { src: string; name: string }[];
}

export const SECTION_LABEL: Record<SectionKey, string> = {
  links: "Links",
  about: "About us",
  documents: "Documents",
  products: "Products",
  payment: "Payment",
  gallery: "Gallery",
  videos: "Videos",
  enquiry: "Enquiry",
  share: "Share",
};

export const CATEGORY_TITLE: Record<CatalogCategory, string> = {
  domestic: "Domestic purifiers",
  commercial: "Commercial plants",
  dispenser: "Dispensers",
};
