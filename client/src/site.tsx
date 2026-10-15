import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SiteData } from "./types";

const SiteContext = createContext<SiteData | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/site", { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<SiteData>;
      })
      .then(setSite)
      .catch((e) => {
        if (e.name !== "AbortError") setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  if (failed) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <p>We couldn't load the site right now. Please refresh, or call us directly.</p>
      </div>
    );
  }
  if (!site) return <div className="min-h-screen" style={{ background: "var(--color-bg)" }} aria-busy="true" />;
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteData {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite must be used inside <SiteProvider>");
  return site;
}
