import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { GalleryGrid } from "@/components/gallery-grid";
import { PartnerMarquee } from "@/components/partner-marquee";
import { companyInfo, galleryImages } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-14 lg:py-20 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Gallery
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              Our Products & Installations
            </h1>
            <p className="mt-3 text-sm lg:text-base text-white/70 max-w-2xl mx-auto">
              Explore Yazh Pure Life product models for home use, commercial
              needs, and hot and cold RO water.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="bg-gradient-to-b from-background via-white to-secondary/20 py-10 lg:py-16">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <GalleryGrid images={galleryImages} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-secondary/20 via-secondary/45 to-background py-12 shadow-[inset_0_28px_50px_rgba(255,255,255,0.72),inset_0_-28px_50px_rgba(255,255,255,0.76)] lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
              Want to See Our Products in Person?
            </h2>
            <p className="mt-3 text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
              Visit our showroom or request a home demo. Our team will be happy
              to show you our complete range of water purification systems.
            </p>
            <a
              href={`https://wa.me/${companyInfo.whatsapp}?text=Hi!%20I%20would%20like%20to%20schedule%20a%20product%20demo.`}
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
