import {
  Settings,
  Droplets,
  Factory,
  Building2,
  Home,
  Leaf,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { PartnerMarquee } from "@/components/partner-marquee";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/data";

const services = [
  { icon: Droplets, title: "Reverse Osmosis System", description: "Complete RO system installation and maintenance.", meta: "RO setup" },
  { icon: Factory, title: "Industrial Water Treatment", description: "Large-scale industrial purification plants.", meta: "High volume" },
  { icon: Building2, title: "Commercial Water Treatment", description: "Office, school, and commercial sector solutions.", meta: "Business use" },
  { icon: Home, title: "Domestic RO Plant", description: "Home RO installation and repair.", meta: "Home service" },
  { icon: Settings, title: "Iron Remover Plant", description: "Specialized iron removal systems.", meta: "Iron control" },
  { icon: Leaf, title: "Softener Plant", description: "Water softening solutions.", meta: "Soft water" },
];

const processSteps = [
  { step: "01", title: "Contact", description: "Reach out via WhatsApp or phone." },
  { step: "02", title: "Testing", description: "Free water quality analysis." },
  { step: "03", title: "Recommend", description: "Best purifier suggestion." },
  { step: "04", title: "Install", description: "Professional setup and demo." },
];

const amcFeatures = [
  "Affordable Annual Maintenance Contract packages",
  "Periodic servicing for a wide range of water purifier models",
  "Replacement support for faulty spare parts",
  "AMC service for all types of water purifier brands in Chennai",
  "Repair, maintenance, installation, up-gradation, and servicing",
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-14 lg:py-20 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Our Services
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              RO Service & Water Treatment Solutions
            </h1>
            <p className="mt-3 text-sm lg:text-base text-white/70 max-w-2xl mx-auto">
              Authorized service support for RO systems, domestic RO plants,
              industrial water treatment, commercial systems, iron remover
              plants, and softener plants.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="bg-gradient-to-b from-background via-white to-secondary/20 py-12 lg:py-20">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="What We Offer"
              title="Comprehensive Services"
              description="Original service categories from Yazh Pure Life."
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="home-soft-rise group relative overflow-hidden rounded-xl bg-white p-5 shadow-[0_12px_36px_rgba(15,56,84,0.08)] ring-1 ring-sky-100/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_54px_rgba(15,56,84,0.14)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500/0 via-sky-500/75 to-cyan-400/0 opacity-80" />
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-100/70 blur-2xl transition-opacity duration-300 group-hover:opacity-95" />
                  <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-white shadow-inner ring-1 ring-sky-100 transition-transform duration-300 group-hover:scale-110">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="relative mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-sky-700/75">
                    {service.meta}
                  </p>
                  <h3 className="relative min-h-[2.5rem] text-sm font-semibold leading-snug text-foreground">
                    {service.title}
                  </h3>
                  <p className="relative mt-2 text-xs leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="relative mt-4 h-1.5 w-14 rounded-full bg-gradient-to-r from-primary/40 to-accent/45 transition-all duration-300 group-hover:w-24" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gradient-to-b from-secondary/20 via-secondary/40 to-background py-12 shadow-[inset_0_30px_54px_rgba(255,255,255,0.72),inset_0_-30px_54px_rgba(255,255,255,0.76)] lg:py-20">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="How It Works"
              title="Simple 4-Step Process"
              description="Getting started with Yazh Pure Life is easy."
            />
            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent lg:block" />
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="home-soft-rise group relative rounded-xl bg-white p-5 shadow-[0_12px_36px_rgba(15,56,84,0.08)] ring-1 ring-sky-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(15,56,84,0.13)]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-[0_10px_24px_rgba(15,56,84,0.18)] ring-4 ring-sky-50">
                    {step.step}
                  </div>
                  <div className="absolute right-4 top-4 text-5xl font-bold leading-none text-sky-100 transition-colors duration-300 group-hover:text-sky-200">
                    {step.step}
                  </div>
                  <h3 className="relative text-base font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-sky-700">
                    <Check className="h-3.5 w-3.5" />
                    Step {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AMC Section */}
        <section className="bg-gradient-to-b from-background via-white to-secondary/15 py-12 lg:py-20">
          <div className="max-w-[82rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="AMC Plans"
              title="Annual Maintenance Contracts"
              description="We offer a various range of affordable Annual maintenance contract packages for a vast range of water purifier models."
            />
            <div className="bg-card border border-border rounded-lg p-5 lg:p-7">
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                Our AMC packages include periodically servicing and replacing
                faulty spare parts. We undertake all type brands Water purifier
                AMC service in Chennai. Yazh Pure Life is the one-stop solution:
                our Pros are verified and industry experts in repair,
                maintenance, installation, up-gradation and servicing of all
                kinds of water purifier.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {amcFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-6" asChild>
                <a
                  href={`https://wa.me/${companyInfo.whatsapp}?text=Hi!%20I%20am%20interested%20in%20Yazh%20Pure%20Life%20AMC%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book AMC
                </a>
              </Button>
            </div>
          </div>
        </section>

        <PartnerMarquee />
      </main>
      <Footer />
    </>
  );
}
