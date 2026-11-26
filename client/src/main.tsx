import { lazy, StrictMode, Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { hideBoot } from "./boot";
import { SiteProvider } from "./site";
import "./index.css";

// The admin panel is a separate lazy chunk so the public site never downloads it.
const AdminApp = lazy(() => import("./admin/AdminApp"));
const isAdmin = window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/");
// Per-category catalogue cards (/catalog/domestic|commercial|dispenser), also a separate lazy chunk.
const CatalogApp = lazy(() => import("./catalog/CatalogApp"));
const catalogMatch = window.location.pathname.match(/^\/catalog\/(domestic|commercial|dispenser)\/?$/);

// Admin and catalogue pages have their own loading states, so the opening screen goes once their code is in.
function BootDone() {
  useEffect(hideBoot, []);
  return null;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <BootDone />
        <AdminApp />
      </Suspense>
    ) : catalogMatch ? (
      <Suspense fallback={null}>
        <BootDone />
        <CatalogApp category={catalogMatch[1] as "domestic" | "commercial" | "dispenser"} />
      </Suspense>
    ) : (
      <SiteProvider>
        <App />
      </SiteProvider>
    )}
  </StrictMode>
);
