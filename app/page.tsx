import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Droplet, Award, Clock, Users, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroMeeting } from "@/components/hero-meeting";
import { PartnerMarquee } from "@/components/partner-marquee";
import { SectionHeader } from "@/components/section-header";
import { companyInfo, products } from "@/lib/data";
import { ProductCard } from "@/components/product-card";

const stats = [
  { icon: Users, target: 1014, label: "Reviews" },
  { icon: Award, target: 4.8, decimals: 1, label: "Google Rating" },
  { icon: Clock, target: 3, label: "Branches" },
  { icon: Shield, value: "ISO", label: "9001:2015 Certified" },
];

const features = [
  {
    icon: Droplet,
    title: "Domestic & Commercial",
    description: "RO water purifier sales and services for homes, offices, shops, and commercial needs.",
  },
  {
    icon: Shield,
    title: "Certified Company",
    description: `${companyInfo.certification} with a ${companyInfo.rating} Google rating from ${companyInfo.reviews} reviews.`,
  },
  {
    icon: Sparkles,
    title: "YPL Product Range",
    description: "13 original YPL models including home use, commercial, and hot and cold purifier options.",
  },
];

type StatCounterProps = {
  icon: LucideIcon;
  target?: number;
  value?: string;
  label: string;
  index: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  useGrouping?: boolean;
};

function StatCounter({
  icon: Icon,
  target = 0,
  value: staticValue,
  label,
  index,
  decimals = 0,
  prefix = "",
  suffix = "",
  useGrouping = true,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shouldCount = staticValue === undefined;

  useEffect(() => {
    const card = cardRef.current;

    if (!card || hasStarted) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || !shouldCount) {
      return;
    }

    const duration = 1800;
    const startTime = performance.now();
    let frameId = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(target * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, shouldCount, target]);

  const value = staticValue ?? count.toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
    useGrouping,
  });

  return (
    <div
      ref={cardRef}
      className="home-soft-rise group relative overflow-hidden rounded-xl bg-white p-4 text-center shadow-[0_10px_30px_rgba(15,56,84,0.08)] ring-1 ring-sky-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_42px_rgba(15,56,84,0.14)] sm:p-5"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500/0 via-sky-500/80 to-cyan-400/0" />
      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-sky-100/70 blur-2xl transition-opacity duration-300 group-hover:opacity-90" />
      <div className="relative mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sky-50 to-white shadow-inner ring-1 ring-sky-100 transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="relative text-2xl font-bold leading-none text-foreground tabular-nums lg:text-3xl">
        {prefix}
        {value}
        {suffix}
      </p>
      <p className="relative mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <HeroMeeting />

        {/* Stats Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-white to-secondary/25 py-10 shadow-[inset_0_28px_48px_rgba(255,255,255,0.85)] lg:py-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-20 w-[80%] -translate-x-1/2 rounded-full bg-sky-100/55 blur-3xl" />
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="grid grid-cols-2 gap-3 rounded-2xl bg-white/78 p-3 shadow-[0_20px_70px_rgba(15,56,84,0.1)] ring-1 ring-sky-100/80 backdrop-blur md:grid-cols-4 lg:gap-4 lg:p-4">
              {stats.map((stat, index) => (
                <StatCounter key={stat.label} {...stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/25 via-background to-background py-14 lg:py-20">
          <div className="pointer-events-none absolute right-0 top-10 h-40 w-40 rounded-full bg-sky-100/70 blur-3xl" />
          <div className="pointer-events-none absolute left-0 bottom-8 h-40 w-40 rounded-full bg-cyan-100/55 blur-3xl" />
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="Why Choose Us"
              title="RO Water Purifier - Sales & Services"
              description={`${companyInfo.name} serves ${companyInfo.branches.join(", ")} with domestic and commercial water purifier solutions.`}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="home-soft-rise group relative overflow-hidden rounded-xl bg-white/86 p-5 shadow-[0_12px_38px_rgba(15,56,84,0.08)] ring-1 ring-sky-100/70 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(15,56,84,0.14)] lg:p-6"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500/0 via-sky-500/55 to-sky-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="home-float mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 to-white shadow-inner">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-primary/45 to-accent/45 transition-all duration-300 group-hover:w-24" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="bg-gradient-to-b from-background via-secondary/35 to-background py-14 shadow-[inset_0_32px_60px_rgba(255,255,255,0.7),inset_0_-32px_60px_rgba(255,255,255,0.75)] lg:py-20">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="Products"
              title="Original YPL Water Purifiers"
              description="Browse real product models, purifier type, storage capacity, stages, price, and ISI availability."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {products.slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="font-medium">
                <Link to="/products">
                  View All Products
                  <ArrowRight className="ml-1.5 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-water-dark via-primary to-water-medium py-14 shadow-[inset_0_36px_60px_rgba(255,255,255,0.08),inset_0_-36px_60px_rgba(255,255,255,0.1)] lg:py-20">
          <div className="home-water-pulse pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-white/12 blur-3xl" />
          <div className="home-water-pulse pointer-events-none absolute -right-16 bottom-8 h-52 w-52 rounded-full bg-cyan-200/20 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <div className="home-shine relative overflow-hidden rounded-2xl bg-white/10 p-6 text-center shadow-[0_24px_70px_rgba(4,28,44,0.22)] ring-1 ring-white/18 backdrop-blur-md sm:p-8 lg:p-10">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/14 shadow-inner ring-1 ring-white/20">
                <Droplet className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                Ready to Experience Pure Water?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/82 lg:text-base">
                Contact Yazh Pure Life for product enquiry, service support, and
                annual maintenance contract packages.
              </p>
              <div className="mx-auto mt-7 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {["Product guidance", "Service support", "AMC packages"].map((item) => (
                  <div key={item} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/85 ring-1 ring-white/12">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button
                  asChild
                  className="bg-white text-primary shadow-lg shadow-water-deep/20 hover:bg-white/95"
                >
                  <a
                    href={`https://wa.me/${companyInfo.whatsapp}?text=Hi!%20I%20would%20like%20to%20get%20a%20free%20consultation.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 bg-white/8 text-white hover:bg-white/14"
                >
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
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
