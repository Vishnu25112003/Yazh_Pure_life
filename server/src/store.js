import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DATA_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data");
const FILE = path.join(DATA_DIR, "site.json");
const BACKUP_DIR = path.join(DATA_DIR, "backups");

// Every section the client reads, and the JSON type it must have.
export const SECTIONS = {
  contact: "object",
  branches: "array",
  domesticProducts: "array",
  commercial: "array",
  dispensers: "array",
  gallery: "array",
  whyChooseUs: "array",
  ownBrand: "string",
  serviceBrands: "array",
};

const typeOf = (v) => (Array.isArray(v) ? "array" : v === null ? "null" : typeof v);

export function validateSection(name, value) {
  if (!(name in SECTIONS)) return `Unknown section "${name}"`;
  if (typeOf(value) !== SECTIONS[name]) return `"${name}" must be ${SECTIONS[name]}`;
  return null;
}

export function validateSite(site) {
  if (typeOf(site) !== "object") return "Body must be a JSON object";
  for (const name of Object.keys(SECTIONS)) {
    if (!(name in site)) return `Missing section "${name}"`;
    const err = validateSection(name, site[name]);
    if (err) return err;
  }
  return null;
}

export async function readSite() {
  return JSON.parse(await fs.readFile(FILE, "utf8"));
}

// Write via temp file + rename so a crash never leaves a half-written site.json,
// and keep a timestamped copy of the previous version so nothing is ever lost.
export async function writeSite(site) {
  await fs.mkdir(BACKUP_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  await fs.copyFile(FILE, path.join(BACKUP_DIR, `site-${stamp}.json`));
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(site, null, 2) + "\n");
  await fs.rename(tmp, FILE);
}

// Resolve derived fields so the client gets plain content.
export function resolveSite(site) {
  return {
    ...site,
    whyChooseUs: site.whyChooseUs.map(({ auto, ...item }) =>
      auto === "branches" ? { ...item, body: site.branches.map((b) => b.name).join(", ") } : item
    ),
  };
}
