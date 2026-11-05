export interface Contact {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
}

export interface Branch {
  name: string;
  tag: string;
  address: string;
  mapsUrl: string;
}

export interface Product {
  id: string;
  label: string;
  spec: string;
  src: string;
  points?: string[];
}

export interface GalleryItem {
  src: string;
  name: string;
}

export interface WhyItem {
  title: string;
  body: string;
  tint: "accent";
}

export interface BrandGroup {
  title: string;
  brands: string[];
}

export interface SiteData {
  contact: Contact;
  branches: Branch[];
  domesticProducts: Product[];
  commercial: Product[];
  dispensers: Product[];
  gallery: GalleryItem[];
  whyChooseUs: WhyItem[];
  ownBrand: string;
  serviceBrands: BrandGroup[];
  /** Home-page buttons for the per-category catalogue pages (/catalog/<category>). */
  catalogs?: Partial<Record<"domestic" | "commercial" | "dispenser", { label: string; published: boolean }>>;
}
