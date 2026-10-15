import type { Category } from "./types";

export const PRODUCT_SECTIONS: Record<Category, { title: string; noun: string; sub: string }> = {
  domestic: {
    title: "Domestic purifiers",
    noun: "purifier",
    sub: "Home RO / UV / alkaline purifiers shown in the Domestic section.",
  },
  commercial: {
    title: "Commercial RO plants",
    noun: "plant",
    sub: "Plants for restaurants, offices, hostels, schools and industry.",
  },
  dispenser: {
    title: "Dispensers & coolers",
    noun: "dispenser",
    sub: "Hot / cold dispensers and stainless-steel water coolers.",
  },
};

export const CATEGORIES = Object.keys(PRODUCT_SECTIONS) as Category[];

// Where each dashboard "section" key lives in the admin.
export const SECTION_PATH: Record<string, string> = {
  domestic: "/domestic",
  commercial: "/commercial",
  dispenser: "/dispenser",
  gallery: "/gallery",
  branches: "/footer",
  contact: "/footer",
};

export const SECTION_LABEL: Record<string, string> = {
  domestic: "Domestic",
  commercial: "Commercial",
  dispenser: "Dispensers",
  gallery: "Gallery",
  branches: "Branches",
  contact: "Contact",
};
