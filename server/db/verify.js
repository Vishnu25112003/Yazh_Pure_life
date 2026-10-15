import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { pool } from "./pool.js";
import { buildPublicSite } from "../src/repo/site.js";
import { resolveSite } from "../src/resolve.js";

// Proves nothing was lost: the public payload built from PostgreSQL must equal the original site.json.
const SITE_JSON = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/site.json");

const expected = resolveSite(JSON.parse(await fs.readFile(SITE_JSON, "utf8")));
const actual = await buildPublicSite();

let bad = 0;
for (const key of Object.keys(expected)) {
  const same = isDeepStrictEqual(expected[key], actual[key]);
  const count = Array.isArray(expected[key]) ? ` (${expected[key].length} items)` : "";
  console.log(`${same ? "OK  " : "DIFF"} ${key}${count}`);
  if (!same) bad++;
}
const extra = Object.keys(actual).filter((k) => !(k in expected));
if (extra.length) {
  console.log("DIFF unexpected keys:", extra);
  bad++;
}
console.log(bad ? `\n${bad} section(s) differ` : "\nidentical - no data lost");
await pool.end();
process.exit(bad ? 1 : 0);
