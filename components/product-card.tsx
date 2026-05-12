"use client";

import { useEffect, useRef, useState } from "react";
import { Info, MessageCircle, Download, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/data";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  type?: string;
  stages?: string;
  isi?: boolean;
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
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.18,
      }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in the ${product.name} (₹${product.price.toLocaleString()}). Please provide more details.`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${message}`, "_blank");
  };

  const handleDownload = async () => {
    const details = [product.type, product.capacity].filter(Boolean).join(" | ");
    const secondaryDetail = product.stages ? `${product.stages} stage purification` : product.category;

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Unable to load ${src}`));
        image.src = src;
      });

    const drawRoundedRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    const drawImageContain = (
      ctx: CanvasRenderingContext2D,
      image: HTMLImageElement,
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      ctx.drawImage(
        image,
        x + (width - drawWidth) / 2,
        y + (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );
    };

    const [logo, productImage] = await Promise.all([
      loadImage("/banner.png"),
      loadImage(product.image),
    ]);

    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 520;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bg = ctx.createLinearGradient(0, 0, 900, 520);
    bg.addColorStop(0, "#08283d");
    bg.addColorStop(0.46, "#0f5b87");
    bg.addColorStop(0.461, "#eaf7fb");
    bg.addColorStop(1, "#ffffff");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 900, 520);

    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.beginPath();
    ctx.arc(85, 70, 130, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(14,165,233,0.12)";
    ctx.beginPath();
    ctx.arc(825, 455, 155, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.96)";
    drawRoundedRect(ctx, 30, 34, 250, 58, 12);
    ctx.fill();
    drawImageContain(ctx, logo, 42, 42, 226, 42);

    ctx.fillStyle = "rgba(255,255,255,0.72)";
    ctx.font = "700 13px Inter, Arial, sans-serif";
    ctx.fillText("RO WATER PURIFIER", 30, 128);
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 38px Inter, Arial, sans-serif";
    ctx.fillText("Sales &", 30, 178);
    ctx.fillText("Services", 30, 222);

    ctx.fillStyle = "rgba(255,255,255,0.84)";
    ctx.font = "500 15px Inter, Arial, sans-serif";
    ctx.fillText(`${companyInfo.phone1} / ${companyInfo.phone2}`, 30, 415);
    ctx.fillText(companyInfo.email, 30, 444);
    ctx.fillText(companyInfo.website, 30, 473);

    const stage = ctx.createLinearGradient(398, 34, 398, 304);
    stage.addColorStop(0, "#f4fbff");
    stage.addColorStop(1, "#e4f2f8");
    ctx.fillStyle = stage;
    drawRoundedRect(ctx, 398, 34, 464, 270, 24);
    ctx.fill();
    drawImageContain(ctx, productImage, 430, 58, 400, 220);

    ctx.fillStyle = "#0369a1";
    ctx.font = "800 13px Inter, Arial, sans-serif";
    ctx.fillText(product.category.toUpperCase(), 398, 350);

    ctx.fillStyle = "#0f172a";
    ctx.font = "800 42px Inter, Arial, sans-serif";
    const maxTitleWidth = 450;
    const words = product.name.split(" ");
    let line = "";
    let y = 398;
    words.forEach((word, index) => {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxTitleWidth && line) {
        ctx.fillText(line, 398, y);
        line = word;
        y += 46;
      } else {
        line = testLine;
      }
      if (index === words.length - 1) {
        ctx.fillText(line, 398, y);
      }
    });

    const chipY = Math.min(y + 30, 465);
    ctx.font = "700 15px Inter, Arial, sans-serif";
    [
      { text: details, fill: "#e0f2fe", color: "#075985" },
      { text: secondaryDetail, fill: "#ecfeff", color: "#0e7490" },
    ].forEach((chip, index) => {
      const chipWidth = Math.min(ctx.measureText(chip.text).width + 28, index === 0 ? 260 : 230);
      const x = index === 0 ? 398 : 398 + Math.min(ctx.measureText(details).width + 44, 276);
      ctx.fillStyle = chip.fill;
      drawRoundedRect(ctx, x, chipY, chipWidth, 34, 17);
      ctx.fill();
      ctx.fillStyle = chip.color;
      ctx.fillText(chip.text, x + 14, chipY + 22);
    });

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${product.name.replace(/\s+/g, "_")}_Card.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div
        ref={cardRef}
        className={`product-reveal group relative overflow-hidden rounded-lg border border-slate-200 bg-[#f8fbfd] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_45px_rgba(15,56,84,0.14)] ${
          isVisible ? "is-visible" : ""
        }`}
        style={{ transitionDelay: `${Math.min(index % 4, 3) * 90}ms` }}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-100/70 to-transparent opacity-80" />
        <div className="pointer-events-none absolute -left-16 top-0 h-full w-12 rotate-12 bg-white/50 opacity-0 blur-sm transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

        {/* Image Container - Compact */}
        <div className="relative m-3 mb-0 aspect-square overflow-hidden rounded-md border border-white bg-[#eef6fa] shadow-inner">
          <div className="pointer-events-none absolute inset-x-6 bottom-5 h-8 rounded-full bg-slate-400/15 blur-xl" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain p-4 drop-shadow-[0_12px_18px_rgba(15,23,42,0.13)] transition-transform duration-500 group-hover:scale-[1.035]"
          />
          <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-sky-800 shadow-sm ring-1 ring-sky-100">
            {product.category}
          </div>
          {product.originalPrice && (
            <div className="absolute bottom-2 right-2 rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          {product.isi && (
            <div className="absolute bottom-2 left-2 rounded-full bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
              ISI
            </div>
          )}
          <button
            onClick={() => setShowInfo(true)}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-sky-50"
            aria-label="Product information"
          >
            <Info className="w-3.5 h-3.5 text-primary" />
          </button>
        </div>

        {/* Content - Compact */}
        <div className="relative space-y-3 p-4 xl:p-5">
          <div>
            <h3 className="min-h-[2.5rem] text-sm font-semibold leading-snug text-slate-950 line-clamp-2 xl:text-base">
              {product.name}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
                {product.capacity}
              </span>
              {product.stages && (
                <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
                  {product.stages} stages
                </span>
              )}
            </div>
            {product.type && (
              <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-1">{product.type}</p>
            )}
          </div>

          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-slate-200 pt-3">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wide text-slate-400">Price</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-sky-800 xl:text-xl">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                onClick={handleWhatsAppClick}
                type="button"
                className="group/action relative flex h-9 w-9 items-center justify-center rounded-md bg-[#25D366] text-white shadow-sm transition-colors hover:bg-[#20BD5A]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/action:opacity-100">
                  WhatsApp
                </span>
              </button>
              <button
                onClick={handleDownload}
                type="button"
                className="group/action relative flex h-9 w-9 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-sky-50 hover:text-primary"
                aria-label="Download"
              >
                <Download className="h-4 w-4" />
                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-slate-950 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover/action:opacity-100">
                  Download
                </span>
              </button>
            </div>
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
          <div className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-[#f8fbfd] shadow-xl">
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="relative aspect-square overflow-hidden rounded-t-lg border-b border-slate-200 bg-[#eef6fa]">
              <div className="pointer-events-none absolute inset-x-14 bottom-8 h-10 rounded-full bg-slate-400/15 blur-xl" />
              <img
                src={product.image}
                alt={product.name}
                className="relative h-full w-full object-contain p-6 drop-shadow-[0_18px_28px_rgba(15,23,42,0.15)]"
              />
            </div>

            <div className="space-y-5 bg-card p-5 lg:p-6">
              <div>
                <p className="text-xs text-primary font-medium uppercase tracking-wider">
                  {product.category}
                </p>
                <h2 className="text-lg font-semibold text-foreground mt-0.5">
                  {product.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {[product.type, product.stages ? `${product.stages} stages` : null, product.isi ? "ISI" : null]
                    .filter(Boolean)
                    .join(" | ")}
                </p>
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
