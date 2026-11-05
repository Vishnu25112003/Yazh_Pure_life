import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SiteProvider } from "./site";
import "./index.css";

// The admin panel is a separate lazy chunk so the public site never downloads it.
const AdminApp = lazy(() => import("./admin/AdminApp"));
const isAdmin = window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/");
// Per-category catalogue cards (/catalog/domestic|commercial|dispenser), also a separate lazy chunk.
const CatalogApp = lazy(() => import("./catalog/CatalogApp"));
const catalogMatch = window.location.pathname.match(/^\/catalog\/(domestic|commercial|dispenser)\/?$/);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ) : catalogMatch ? (
      <Suspense fallback={null}>
        <CatalogApp category={catalogMatch[1] as "domestic" | "commercial" | "dispenser"} />
      </Suspense>
    ) : (
      <SiteProvider>
        <App />
      </SiteProvider>
    )}
  </StrictMode>
);
