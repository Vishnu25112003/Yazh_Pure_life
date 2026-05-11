import { Route, Routes } from "react-router-dom";
import HomePage from "../app/page";
import AboutPage from "../app/about/page";
import ProductsPage from "../app/products/page";
import ServicesPage from "../app/services/page";
import GalleryPage from "../app/gallery/page";
import ContactPage from "../app/contact/page";
import { FloatingWhatsApp } from "../components/floating-whatsapp";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <FloatingWhatsApp />
    </>
  );
}
