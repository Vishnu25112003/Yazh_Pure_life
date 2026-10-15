import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SiteProvider } from "./site";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </StrictMode>
);
