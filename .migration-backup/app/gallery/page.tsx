import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GalleryGrid } from "@/components/gallery-grid";
import { PartnerMarquee } from "@/components/partner-marquee";
import { galleryImages } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Gallery
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Our Products & Installations
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-xl mx-auto">
              Explore our collection of water purification systems and see them
              in action across homes and businesses.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-10 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <GalleryGrid images={galleryImages} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-secondary/30 border-y border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              Want to See Our Products in Person?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
              Visit our showroom or request a home demo. Our team will be happy
              to show you our complete range of water purification systems.
            </p>
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20schedule%20a%20product%20demo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2 rounded text-sm font-medium transition-colors mt-4"
            >
              <MessageCircle className="w-4 h-4" />
              Schedule Demo
            </a>
          </div>
        </section>

        <PartnerMarquee />
      </main>
      <Footer />
    </>
  );
}
