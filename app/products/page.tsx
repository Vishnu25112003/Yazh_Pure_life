"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { ProductCard } from "@/components/product-card";
import { PartnerMarquee } from "@/components/partner-marquee";
import { companyInfo, products } from "@/lib/data";
import { MessageCircle } from "lucide-react";

const categories = [
  "All",
  "Home Use",
  "Hot & Cold",
  "Commercial",
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-14 lg:py-20 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Our Products
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              Yazh Pure Life Product Catalogue
            </h1>
            <p className="mt-3 text-sm lg:text-base text-white/70 max-w-2xl mx-auto">
              Explore original YPL models for home use, commercial needs, and hot
              and cold RO water.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="sticky top-20 z-40 bg-white/88 py-4 shadow-[0_14px_34px_rgba(15,56,84,0.08)] backdrop-blur-md">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 lg:px-4 py-2 rounded text-xs lg:text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="bg-gradient-to-b from-background via-white to-secondary/25 py-10 lg:py-16">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="bg-gradient-to-b from-secondary/25 via-secondary/45 to-background py-12 shadow-[inset_0_28px_50px_rgba(255,255,255,0.7),inset_0_-28px_50px_rgba(255,255,255,0.75)] lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
            <SectionHeader
              subtitle="Need Help?"
              title="Not Sure Which Purifier Is Right?"
              description="All RO spare parts are available here. Pre-filter set included with all YPL models. Stands and covers are available for select models and are chargeable."
            />
            <a
              href={`https://wa.me/${companyInfo.whatsapp}?text=Hi!%20I%20need%20help%20choosing%20a%20water%20purifier.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Get Expert Advice
            </a>
          </div>
        </section>

        <PartnerMarquee />
      </main>
      <Footer />
    </>
  );
}
