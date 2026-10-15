export type Category = "domestic" | "commercial" | "dispenser";

export interface Product {
  id: number;
  slug: string;
  category: Category;
  label: string;
  spec: string;
  imageUrl: string;
  points: string[];
  sortOrder: number;
  isActive: boolean;
  updatedAt: string;
}

export type ProductInput = Pick<Product, "slug" | "label" | "spec" | "imageUrl" | "points" | "isActive">;

export interface Branch {
  id: number;
  name: string;
  tag: string;
  address: string;
  mapsUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export type BranchInput = Pick<Branch, "name" | "tag" | "address" | "mapsUrl" | "isActive">;

export interface GalleryItem {
  id: number;
  imageUrl: string;
  name: string;
  sortOrder: number;
  isActive: boolean;
}

export type GalleryInput = Pick<GalleryItem, "imageUrl" | "name" | "isActive">;

export interface Contact {
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  mycrd: string;
}

export interface Dashboard {
  sections: Record<"domestic" | "commercial" | "dispenser" | "gallery" | "branches", { total: number; active: number }>;
  recent: { type: string; section: string; id: number; title: string; updatedAt: string }[];
  attention: { section: string; message: string }[];
}
