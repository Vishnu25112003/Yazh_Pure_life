"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { ProductCard } from "@/components/product-card";
import { PartnerMarquee } from "@/components/partner-marquee";
import { products } from "@/lib/data";
import { MessageCircle } from "lucide-react";

const categories = [
  "All",
  "Home RO",
  "UV Purifier",
  "Commercial",
  "Industrial",
  "Water Softener",
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
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Our Products
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Premium Water Purification Systems
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-xl mx-auto">
              Discover our range of advanced water purifiers designed for homes,
              offices, and industries. Every product comes with installation and warranty.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-4 bg-card sticky top-16 z-40 border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-1.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
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
        <section className="py-10 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
        <section className="py-10 bg-secondary/30 border-y border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionHeader
              subtitle="Need Help?"
              title="Not Sure Which Purifier Is Right?"
              description="Our experts will analyze your water quality and recommend the perfect purifier. Get a free consultation."
            />
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20need%20help%20choosing%20a%20water%20purifier."
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
