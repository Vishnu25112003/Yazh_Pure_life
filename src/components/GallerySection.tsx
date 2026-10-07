import { useEffect, useState } from "react";
import { GALLERY } from "../data";
import { ChevronRightIcon, CloseIcon } from "./icons";

export function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex !== null ? GALLERY[openIndex] : null;

  const step = (dir: 1 | -1) =>
    setOpenIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length));

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  // Two copies of the list make the left-to-right loop seamless.
  const loop = [...GALLERY, ...GALLERY];

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-head">
        <h2 className="m-0">Gallery</h2>
        <p className="gallery-sub">
          Our range of water purifiers for healthy water at home — tap any photo to view it larger.
        </p>
      </div>

      <div className="gallery-viewport">
        <div className="gallery-track" style={{ animationDuration: `${GALLERY.length * 4}s` }}>
          {loop.map((item, i) => {
            const index = i % GALLERY.length;
            const isCopy = i >= GALLERY.length;
            return (
              <button
                key={i}
                type="button"
                className="gallery-item"
                onClick={() => setOpenIndex(index)}
                aria-label={`View ${item.name} photo`}
                aria-hidden={isCopy || undefined}
                tabIndex={isCopy ? -1 : undefined}
              >
                <img src={item.src} alt={isCopy ? "" : `${item.name} water purifier`} loading="lazy" />
                <span className="gallery-caption">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {open && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={open.name} onClick={() => setOpenIndex(null)}>
          <div className="gallery-lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="menu-toggle gallery-close" aria-label="Close" onClick={() => setOpenIndex(null)}>
              <CloseIcon />
            </button>
            <img src={open.src} alt={`${open.name} water purifier`} className="gallery-lightbox-img" />
            <div className="gallery-lightbox-bar">
              <button type="button" className="gallery-nav" aria-label="Previous photo" onClick={() => step(-1)}>
                <ChevronRightIcon className="gallery-prev-icon" />
              </button>
              <div className="gallery-lightbox-caption">
                <strong>{open.name}</strong>
                <span>
                  {(openIndex ?? 0) + 1} / {GALLERY.length}
                </span>
              </div>
              <button type="button" className="gallery-nav" aria-label="Next photo" onClick={() => step(1)}>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
