import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./admin.css";
import { AuthProvider, useAuth } from "./auth";
import { Layout } from "./Layout";
import { Dashboard } from "./pages/Dashboard";
import { FooterPage } from "./pages/Footer";
import { GalleryPage } from "./pages/Gallery";
import { Login } from "./pages/Login";
import { ProductForm } from "./pages/ProductForm";
import { ProductsPage } from "./pages/Products";
import { CATEGORIES } from "./sections";
import { Spinner, UiProvider } from "./ui";

function Gate() {
  const { email, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!email) return <Login />;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        {CATEGORIES.map((c) => (
          <Route key={c} path={c}>
            <Route index element={<ProductsPage category={c} />} />
            <Route path="new" element={<ProductForm category={c} />} />
            <Route path=":id" element={<ProductForm category={c} />} />
          </Route>
        ))}
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="footer" element={<FooterPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function AdminApp() {
  useEffect(() => {
    document.title = "Admin - Yazh Pure Life";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
  return (
    <div className="adm">
      <BrowserRouter basename="/admin">
        <UiProvider>
          <AuthProvider>
            <Gate />
          </AuthProvider>
        </UiProvider>
      </BrowserRouter>
    </div>
  );
}
