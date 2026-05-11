"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  name: string;
  category?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-md cursor-pointer border border-primary/10 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.96)_0%,rgba(232,245,252,0.92)_48%,rgba(212,232,244,0.98)_100%)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            onClick={() => openLightbox(index)}
          >
            <div className="pointer-events-none absolute inset-x-8 bottom-4 h-8 rounded-full bg-water-deep/10 blur-xl" />
            <img
              src={image.src}
              alt={image.alt}
              className="absolute inset-0 h-full w-full object-contain p-3 drop-shadow-[0_12px_18px_rgba(15,23,42,0.14)] transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-water-deep/85 via-water-deep/18 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="rounded-md border border-white/20 bg-white/12 px-3 py-2 shadow-lg backdrop-blur-md">
                <p className="text-white font-semibold text-xs leading-snug line-clamp-2">
                  {image.name}
                </p>
              {image.category && (
                  <p className="mt-0.5 text-white/70 text-[10px]">{image.category}</p>
              )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="relative max-w-6xl w-full mx-4 sm:mx-8 h-[78vh]">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="h-full w-full object-contain p-2"
            />
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-white font-medium">{images[selectedIndex].name}</p>
            {images[selectedIndex].category && (
              <p className="text-white/60 text-sm">{images[selectedIndex].category}</p>
            )}
            <p className="text-white/40 text-xs mt-1">
              {selectedIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
