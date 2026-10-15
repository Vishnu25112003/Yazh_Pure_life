import type { Contact } from "./types";

export function waLink(contact: Contact, message: string): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function telLink(contact: Contact): string {
  return `tel:${contact.phone.replace(/\s/g, "")}`;
}
