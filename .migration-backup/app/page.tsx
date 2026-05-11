import Link from "next/link";
import { ArrowRight, Shield, Droplet, Award, Clock, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WaveAnimation } from "@/components/wave-animation";
import { PartnerMarquee } from "@/components/partner-marquee";
import { SectionHeader } from "@/components/section-header";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

const stats = [
  { icon: Users, value: "10,000+", label: "Customers" },
  { icon: Award, value: "15+", label: "Years" },
  { icon: Shield, value: "100%", label: "Quality" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const features = [
  {
    icon: Droplet,
    title: "Pure Water Technology",
    description: "Advanced multi-stage purification ensures 99.9% removal of contaminants.",
  },
  {
    icon: Shield,
    title: "Certified Quality",
    description: "All products are ISI certified and meet international safety standards.",
  },
  {
    icon: Sparkles,
    title: "Mineral Retention",
    description: "Smart technology retains essential minerals while removing impurities.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-water-dark via-water-medium to-primary">
          {/* Subtle grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
            <div className="max-w-2xl">
              <p className="text-white/70 text-sm font-medium tracking-wide mb-3">
                Water Purification Experts
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
                Clean Water for
                <span className="block text-white/90">Healthy Living</span>
              </h1>
              <p className="mt-4 text-base text-white/70 max-w-lg leading-relaxed">
                Experience the purest drinking water with our advanced RO and UV
                water purification systems. Trusted by over 10,000 families.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-white text-primary hover:bg-white/95 font-medium"
                >
                  <Link href="/products">
                    Explore Products
                    <ArrowRight className="ml-1.5 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>

          <WaveAnimation />
        </section>

        {/* Stats Section */}
        <section className="py-10 bg-card border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-md bg-primary/10 flex items-center justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-xl sm:text-2xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-14 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Why Choose Us"
              title="Advanced Purification Technology"
              description="We combine cutting-edge technology with years of expertise to deliver the purest water for your family."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-5 border border-border hover:border-primary/20 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-14 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Products"
              title="Best Selling Water Purifiers"
              description="Discover our range of premium water purification systems designed for every need."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="font-medium">
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 bg-primary">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Ready to Experience Pure Water?
            </h2>
            <p className="mt-3 text-sm text-white/80 max-w-xl mx-auto">
              Get a free water quality test and consultation from our experts.
              We&apos;ll help you choose the perfect purifier for your home.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                className="bg-white text-primary hover:bg-white/95"
              >
                <a
                  href="https://wa.me/919876543210?text=Hi!%20I%20would%20like%20to%20get%20a%20free%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Partners Marquee */}
        <PartnerMarquee />
      </main>
      <Footer />
    </>
  );
}
