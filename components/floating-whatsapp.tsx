"use client";

import { MessageCircle } from "lucide-react";
import { companyInfo } from "@/lib/data";

export function FloatingWhatsApp() {
  const message = encodeURIComponent(
    "Hi! I have a question about your water purifiers."
  );

  return (
    <a
      href={`https://wa.me/${companyInfo.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_34px_rgba(18,140,82,0.35)] ring-4 ring-[#25D366]/18 transition-all duration-300 hover:-translate-y-1 hover:bg-[#20BD5A] hover:shadow-[0_20px_42px_rgba(18,140,82,0.42)] sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping" />
      <MessageCircle className="relative h-7 w-7 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-slate-950 px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </a>
  );
}
