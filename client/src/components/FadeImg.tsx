import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react";

/**
 * An <img> that shows a soft shimmer while loading and fades in once ready. When the source changes
 * (e.g. picking another colour) it shimmers again until the new photo is in. Errors stop the shimmer.
 */
export function FadeImg({ className = "", onLoad, onError, ...rest }: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<"loading" | "loaded">("loading");

  useEffect(() => {
    const img = ref.current;
    // A cached photo can finish before React attaches onLoad.
    setState(img && img.complete && img.naturalWidth > 0 ? "loaded" : "loading");
  }, [rest.src]);

  return (
    <img
      ref={ref}
      {...rest}
      className={`ypl-img ${state === "loaded" ? "is-loaded" : "is-loading"} ${className}`}
      onLoad={(e) => {
        setState("loaded");
        onLoad?.(e);
      }}
      onError={(e) => {
        setState("loaded");
        onError?.(e);
      }}
    />
  );
}
