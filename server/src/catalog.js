// Catalogue defaults and merging. Stored catalogue data may be partial (or empty); every read merges it
// over these defaults so older rows keep working when new fields are added.

export const CATALOG_CATEGORIES = ["domestic", "commercial", "dispenser"];

export const SECTION_KEYS = ["links", "about", "documents", "products", "payment", "gallery", "videos", "enquiry", "share"];

const META = {
  domestic: {
    button: "View our purifiers",
    tagline: "Domestic RO water purifiers in Chennai",
    nature: "Domestic RO water purifiers: sales, installation & service",
  },
  commercial: {
    button: "View our plants",
    tagline: "Commercial RO plants in Chennai",
    nature: "Commercial RO plants: sales, installation & service",
  },
  dispenser: {
    button: "View our dispensers",
    tagline: "Water dispensers & coolers in Chennai",
    nature: "Water dispensers & coolers: sales & service",
  },
};

// Only facts already published on the site (server/data/site.json and the home page copy).
const SPECIALITIES = [
  "Our own trained technicians in Kolathur, Avadi and across Chennai",
  "Genuine spares only, every time",
  "Service for every brand: Yazh Pure Life, Aquaguard, Kent, Pureit and more",
  "Easy installation and periodic maintenance",
  "On-time after-sales service at affordable prices",
];

const DESCRIPTION =
  "Clean drinking water is hard to find in Chennai today. Yazh Pure Life started with one aim: a healthier environment, built by listening to what each customer needs and delivering innovative, high-quality purifiers for domestic and semi-commercial use at an affordable price.";

export function catalogDefaults(category) {
  const m = META[category];
  return {
    buttonLabel: m.button,
    theme: { primary: "#035eb2", accent: "#1f9684", background: "texture" },
    header: {
      logoUrl: "/assets/logo.png",
      businessName: "Yazh Pure Life",
      personName: "",
      personTitle: "",
      tagline: m.tagline,
    },
    // Empty values fall back to the site-wide contact details (admin → Footer → Contact).
    contact: { phone: "", whatsapp: "", email: "", address: "", mapsUrl: "", website: "" },
    sections: SECTION_KEYS.map((key) => ({ key, enabled: true })),
    links: [],
    about: {
      companyName: "Yazh Pure Life",
      yearEst: "",
      nature: m.nature,
      specialities: SPECIALITIES,
      description: DESCRIPTION,
    },
    documents: [],
    products: { mode: "all", productIds: [], showSpec: true, showPoints: true },
    payment: {
      phonePe: "",
      gpay: "",
      upiId: "",
      qrImageUrl: "",
      bankName: "",
      ifsc: "",
      accountName: "",
      accountNumber: "",
      accountType: "",
    },
    // The site gallery shows home purifiers, so only Domestic uses it by default; the others start empty
    // (section hidden) until admin picks photos that really belong to that category.
    gallery: category === "domestic" ? { mode: "all", images: [] } : { mode: "custom", images: [] },
    videos: [],
    enquiry: { heading: "Enquiry form", buttonLabel: "Send on WhatsApp" },
  };
}

const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

// Keeps the stored section order, drops unknown keys, appends sections added in later versions.
function mergeSections(stored, defaults) {
  if (!Array.isArray(stored)) return defaults;
  const seen = new Set();
  const out = [];
  for (const s of stored) {
    if (isPlainObject(s) && SECTION_KEYS.includes(s.key) && !seen.has(s.key)) {
      seen.add(s.key);
      out.push({ key: s.key, enabled: s.enabled !== false });
    }
  }
  for (const d of defaults) if (!seen.has(d.key)) out.push(d);
  return out;
}

export function mergeCatalog(stored, category) {
  const defaults = catalogDefaults(category);
  const data = isPlainObject(stored) ? stored : {};
  const out = {};
  for (const [key, def] of Object.entries(defaults)) {
    const val = data[key];
    if (key === "sections") out[key] = mergeSections(val, def);
    else if (isPlainObject(def)) out[key] = { ...def, ...(isPlainObject(val) ? val : {}) };
    else if (Array.isArray(def)) out[key] = Array.isArray(val) ? val : def;
    else out[key] = val ?? def;
  }
  return out;
}
