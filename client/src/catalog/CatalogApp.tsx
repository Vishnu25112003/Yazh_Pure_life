import { useEffect, useMemo, useState } from "react";
import { CatalogCard } from "./CatalogCard";
import { resolveCatalog } from "./resolve";
import { CATEGORY_TITLE, type CatalogCategory, type CatalogPayload } from "./types";
import "./catalog.css";

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

export default function CatalogApp({ category }: { category: CatalogCategory }) {
  const [payload, setPayload] = useState<CatalogPayload | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing" | "error">("loading");
  const pageUrl = `${window.location.origin}/catalog/${category}`;

  useEffect(() => {
    let live = true;
    fetch(`/api/catalog/${category}`)
      .then(async (r) => {
        if (r.status === 404) return live && setState("missing");
        if (!r.ok) throw new Error(String(r.status));
        const data = (await r.json()) as CatalogPayload;
        if (live) {
          setPayload(data);
          setState("ready");
        }
      })
      .catch(() => live && setState("error"));
    return () => {
      live = false;
    };
  }, [category]);

  const resolved = useMemo(() => (payload ? resolveCatalog(payload, window.location.origin) : null), [payload]);

  useEffect(() => {
    const name = resolved?.catalog.header.businessName ?? "Yazh Pure Life";
    document.title = `${CATEGORY_TITLE[category]} catalogue · ${name}`;
    if (resolved) setMeta("description", `${resolved.catalog.header.tagline || CATEGORY_TITLE[category]}. Call or WhatsApp ${name} for details.`);
    let canon = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement("link");
      canon.rel = "canonical";
      document.head.appendChild(canon);
    }
    canon.href = pageUrl;
  }, [resolved, category, pageUrl]);

  // Shared product links (#p-<slug>) land on that product once it exists.
  useEffect(() => {
    if (state === "ready" && window.location.hash) {
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView());
    }
  }, [state]);

  if (state === "ready" && resolved) return <CatalogCard data={resolved} category={category} pageUrl={pageUrl} />;

  return (
    <div className="cat cat-bg-texture" style={{ ["--cat-primary" as string]: "#035eb2", ["--cat-accent" as string]: "#1f9684" }}>
      <div className="cat-col">
        {state === "loading" ? (
          <div className="cat-skeleton" role="status" aria-label="Loading catalogue">
            <div />
            <div />
            <div />
          </div>
        ) : (
          <div className="cat-panel cat-empty">
            <h1 className="cat-h2">{state === "missing" ? "Catalogue not available" : "Couldn't load the catalogue"}</h1>
            <p className="cat-desc">
              {state === "missing"
                ? "This catalogue isn't published right now. You can still see all our products on the website."
                : "Please check your connection and try again."}
            </p>
            <div className="cat-empty-actions">
              {state === "error" && (
                <button type="button" className="cat-btn" onClick={() => window.location.reload()}>
                  Try again
                </button>
              )}
              <a className={`cat-btn${state === "error" ? " cat-btn-quiet" : ""}`} href={`/#${category}`}>
                Go to the website
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
