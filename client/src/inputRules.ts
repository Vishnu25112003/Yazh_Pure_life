// Shared rules for every visitor-facing input box.
//
// Each field type has an allow-list of characters. Anything else (code symbols like < > { } $ ;, emoji,
// invisible characters, right-to-left tricks) is dropped as it is typed or pasted, and "fancy font"
// letters such as 𝐬𝐜𝐫𝐢𝐩𝐭 or ｓｃｒｉｐｔ are folded to plain letters first (NFKC) so they can't slip past.
// The submit-time checks below then enforce length and shape.

/** Invisible / formatting characters used to hide or disguise text (zero-width, bidi overrides, BOM, controls). */
const INVISIBLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F­͏؜ᅟᅠ឴឵᠋-᠏​-‏‪-‮⁠-⁯ㅤ︀-️﻿ﾠ￰-￻]/g;

const normalize = (s: string) => s.normalize("NFKC").replace(INVISIBLE, "");

// \p{L} letters and \p{M} combining marks keep Tamil and other Indian scripts working.
const NOT_NAME = /[^\p{L}\p{M} .'-]/gu;
const NOT_ID = /[^A-Za-z0-9/-]/g;
const NOT_ADDRESS = /[^\p{L}\p{M}\p{Nd} ,.\-/#()&:'\n]/gu;
const NOT_MESSAGE = /[^\p{L}\p{M}\p{Nd} ,.\-/#()&:'"!?%+@\n]/gu;

export type FieldKind = "name" | "customerId" | "address" | "message";

/** Cleans a value as it is typed or pasted: keeps only the characters this kind of field allows. */
export function clean(kind: FieldKind, raw: string): string {
  const s = normalize(raw);
  switch (kind) {
    case "name":
      return s.replace(NOT_NAME, "").replace(/ {2,}/g, " ").replace(/^[ .'-]+/, "");
    case "customerId":
      return s.toUpperCase().replace(NOT_ID, "");
    case "address":
      return s.replace(NOT_ADDRESS, "").replace(/ {2,}/g, " ").replace(/\n{3,}/g, "\n\n").replace(/^\s+/, "");
    case "message":
      return s.replace(NOT_MESSAGE, "").replace(/ {2,}/g, " ").replace(/\n{3,}/g, "\n\n").replace(/^\s+/, "");
  }
}

/** Mobile numbers are typed after a fixed +91: digits only, at most 10 (a pasted +91/0 prefix is removed). */
export function cleanMobile(raw: string): string {
  let d = normalize(raw).replace(/\D/g, "");
  if (d.length > 10 && d.startsWith("91")) d = d.slice(2);
  if (d.length > 10 && d.startsWith("0")) d = d.slice(1);
  return d.slice(0, 10);
}

/** Full number for WhatsApp / display, e.g. "+91 98765 43210". */
export const formatMobile = (d: string) => `+91 ${d.slice(0, 5)} ${d.slice(5)}`;

const LINK = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|in|io|xyz|ru|top|ly|me|info|biz)\b)/i;
const SAME_CHAR_RUN = /(.)\1{5,}/u;
// Leftovers of code once its symbols are stripped, e.g. "<img onerror=alert(1)>" -> "img onerroralert(1)".
const CODE_WORDS = /\b(java)?script\b|on(error|load|click|focus|mouse\w*)|alert\s*\(|\beval\s*\(|\b(document|window)\.|select\s.+\sfrom|drop\s+table|union\s+select|insert\s+into/i;
// Names never contain these, even glued together ("scriptalertscript").
const NAME_CODE = /script|onerror|onload|eval\(/i;

/** Submit-time checks. Each returns an error message, or "" when the value is fine. */
export const check = {
  name(v: string) {
    const t = v.trim();
    if (t.length < 2) return "Enter your name (at least 2 letters).";
    if (t.length > 60) return "Name must be 60 characters or fewer.";
    if (!/\p{L}.*\p{L}/u.test(t)) return "Enter your name using letters.";
    if (SAME_CHAR_RUN.test(t) || NAME_CODE.test(t)) return "Please enter your real name.";
    return "";
  },
  mobile(d: string, { required = true } = {}) {
    if (!d) return required ? "Enter your 10-digit mobile number." : "";
    if (d.length !== 10) return "Mobile number must be exactly 10 digits.";
    if (!/^[6-9]/.test(d)) return "Indian mobile numbers start with 6, 7, 8 or 9.";
    if (/^(\d)\1{9}$/.test(d)) return "Enter a real mobile number.";
    return "";
  },
  customerId(v: string) {
    const t = v.trim();
    if (!t) return "Enter your customer ID.";
    if (t.length > 30) return "Customer ID must be 30 characters or fewer.";
    if (!/[0-9]/.test(t) && t.length < 3) return "Enter a valid customer ID.";
    return "";
  },
  address(v: string) {
    const t = v.trim();
    if (t.length < 10) return "Enter your full address (house no., street, area).";
    if (t.length > 250) return "Address must be 250 characters or fewer.";
    if (!/\p{L}/u.test(t)) return "Enter a valid address.";
    if (LINK.test(t) || CODE_WORDS.test(t)) return "Please enter only your address.";
    return "";
  },
  message(v: string, { min = 5, max = 500, what = "the issue" } = {}) {
    const t = v.trim();
    if (t.length < min) return `Describe ${what} (at least ${min} characters).`;
    if (t.length > max) return `Please keep it under ${max} characters.`;
    if (!/\p{L}.*\p{L}/u.test(t)) return `Describe ${what} in words.`;
    if (LINK.test(t)) return "Links aren't allowed here. Please describe it in words.";
    if (CODE_WORDS.test(t)) return "Please describe it in plain words.";
    if (SAME_CHAR_RUN.test(t)) return "Please describe it in plain words.";
    return "";
  },
};

/** Admin phone boxes: "tel" keeps digits, +, spaces and dashes; "numeric" keeps digits only. Other boxes only lose hidden characters. */
export function cleanByMode(mode: string | undefined, raw: string): string {
  if (mode === "numeric") return normalize(raw).replace(/\D/g, "");
  if (mode === "tel") return normalize(raw).replace(/[^\d+\s-]/g, "").replace(/(?!^)\+/g, "");
  return raw.replace(INVISIBLE, "");
}
