import { CommercialSection } from "./components/CommercialSection";
import { ConsultationCta } from "./components/ConsultationCta";
import { DispenserSection } from "./components/DispenserSection";
import { DomesticSection } from "./components/DomesticSection";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { ReviewsSection } from "./components/ReviewsSection";
import { ServiceSection } from "./components/ServiceSection";
import { WhyChooseUs } from "./components/WhyChooseUs";

export default function App() {
  return (
    <div id="top" className="ypl-page min-h-screen" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <Header />
      <Hero />

      <main className="max-w-[640px] dsk:max-w-[1240px] mx-auto px-[var(--space-4)] py-[var(--space-6)] grid gap-[var(--space-8)]">
        <DomesticSection />
        <ServiceSection />
        <CommercialSection />
        <DispenserSection />
        <GallerySection />
      </main>

      <ConsultationCta />

      <main className="max-w-[640px] dsk:max-w-[1240px] mx-auto px-[var(--space-4)] py-[var(--space-8)] grid gap-[var(--space-8)]">
        <WhyChooseUs />
        <ReviewsSection />
      </main>

      <Footer />
      <MobileBottomBar />
    </div>
  );
}
