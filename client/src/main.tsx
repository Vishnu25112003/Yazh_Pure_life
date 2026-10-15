import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SiteProvider } from "./site";
import "./index.css";

// The admin panel is a separate lazy chunk so the public site never downloads it.
const AdminApp = lazy(() => import("./admin/AdminApp"));
const isAdmin = window.location.pathname === "/admin" || window.location.pathname.startsWith("/admin/");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={null}>
        <AdminApp />
      </Suspense>
    ) : (
      <SiteProvider>
        <App />
      </SiteProvider>
    )}
  </StrictMode>
);
