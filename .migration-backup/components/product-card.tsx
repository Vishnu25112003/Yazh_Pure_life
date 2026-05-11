"use client";

import { useState } from "react";
import Image from "next/image";
import { Info, MessageCircle, Download, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  capacity: string;
  features: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  description: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [showInfo, setShowInfo] = useState(false);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${product.name} (₹${product.price.toLocaleString()}). Please provide more details.`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  const handleDownload = async () => {
    const content = `
══════════════════════════════════════════════════════════════
                        YAZH PURE LIFE
               Water Purification Solutions
══════════════════════════════════════════════════════════════

PRODUCT SPECIFICATION SHEET
──────────────────────────────────────────────────────────────

Product Name: ${product.name}
Category: ${product.category}
Capacity: ${product.capacity}

PRICE DETAILS
──────────────────────────────────────────────────────────────
MRP: ₹${product.price.toLocaleString()}/-
${product.originalPrice ? `Original Price: ₹${product.originalPrice.toLocaleString()}/-` : ""}
${product.originalPrice ? `You Save: ₹${(product.originalPrice - product.price).toLocaleString()}/-` : ""}

PRODUCT DESCRIPTION
──────────────────────────────────────────────────────────────
${product.description}

KEY FEATURES
──────────────────────────────────────────────────────────────
${product.features.map((f) => `• ${f}`).join("\n")}

TECHNICAL SPECIFICATIONS
──────────────────────────────────────────────────────────────
${product.specifications.map((s) => `${s.label}: ${s.value}`).join("\n")}

══════════════════════════════════════════════════════════════

CONTACT US
──────────────────────────────────────────────────────────────
Phone: +91 98765 43210
Email: info@yazhpurelife.com
Address: 123 Water Street, Pure City, Tamil Nadu - 600001
WhatsApp: wa.me/919876543210

══════════════════════════════════════════════════════════════
            Thank you for choosing Yazh Pure Life
        "Pure Water, Pure Life - Your Health, Our Priority"
══════════════════════════════════════════════════════════════
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${product.name.replace(/\s+/g, "_")}_Specifications.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-md hover:border-primary/20 transition-all duration-300">
        {/* Image Container - Compact */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-102 transition-transform duration-500"
          />
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-[10px] font-semibold px-2 py-0.5 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          <button
            onClick={() => setShowInfo(true)}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-card/95 flex items-center justify-center hover:bg-card transition-colors shadow-sm"
            aria-label="Product information"
          >
            <Info className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

        {/* Content - Compact */}
        <div className="p-3 space-y-2">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              {product.category}
            </p>
            <h3 className="font-medium text-foreground text-sm leading-snug mt-0.5 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{product.capacity}</p>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex gap-1.5 pt-1">
            <Button
              onClick={handleWhatsAppClick}
              size="sm"
              className="flex-1 h-8 text-xs bg-[#25D366] hover:bg-[#20BD5A] text-white"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              className="h-8 px-2"
            >
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Info Modal - Professional Design */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowInfo(false)}
          />
          <div className="relative bg-card rounded-lg shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-secondary">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-4">
              <div>
                <p className="text-xs text-primary font-medium uppercase tracking-wider">
                  {product.category}
                </p>
                <h2 className="text-lg font-semibold text-foreground mt-0.5">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5">
                  Description
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Specifications
                </h3>
                <div className="bg-secondary/50 rounded-md p-3 space-y-1.5">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleWhatsAppClick}
                  className="flex-1 bg-[#25D366] hover:bg-[#20BD5A] text-white"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  Enquire on WhatsApp
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1.5" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
