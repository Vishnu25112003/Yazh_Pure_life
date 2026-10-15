import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { SiteData } from "./types";

const SiteContext = createContext<SiteData | null>(null);

// A sleeping free-tier backend can take up to ~50s to wake, so retry with growing delays before giving up.
const RETRY_DELAYS_MS = [1500, 4000, 9000, 15000, 20000];

export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteData | null>(null);
  const [failed, setFailed] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      for (let attempt = 0; ; attempt++) {
        try {
          const r = await fetch("/api/site", { signal: ctrl.signal });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          setSite((await r.json()) as SiteData); // an HTML reply (no API behind the host) fails here and is retried
          return;
        } catch {
          if (ctrl.signal.aborted) return;
          if (attempt >= RETRY_DELAYS_MS.length) {
            setFailed(true);
            return;
          }
          setRetrying(true);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt]));
        }
      }
    })();
    return () => ctrl.abort();
  }, []);

  if (failed) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center">
        <div className="grid gap-2 max-w-[420px]">
          <p>We couldn't load the site right now. Please refresh, or call us directly.</p>
          {import.meta.env.DEV && (
            <p style={{ opacity: 0.7, fontSize: 13 }}>
              Developer note: the API server is not reachable. Run <code>npm run dev</code> from the project root (it starts the
              API on :3001 and the site together).
            </p>
          )}
        </div>
      </div>
    );
  }
  if (!site) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-center" style={{ background: "var(--color-bg)" }} aria-busy="true">
        {retrying && <p style={{ opacity: 0.7 }}>Loading Yazh Pure Life… the server is waking up, one moment.</p>}
      </div>
    );
  }
  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
}

export function useSite(): SiteData {
  const site = useContext(SiteContext);
  if (!site) throw new Error("useSite must be used inside <SiteProvider>");
  return site;
}
