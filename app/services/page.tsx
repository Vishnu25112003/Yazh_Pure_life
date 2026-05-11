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
  { icon: Droplets, title: "Reverse Osmosis System", description: "Complete RO system installation and maintenance." },
  { icon: Factory, title: "Industrial Water Treatment", description: "Large-scale industrial purification plants." },
  { icon: Building2, title: "Commercial Water Treatment", description: "Office, school, and commercial sector solutions." },
  { icon: Home, title: "Domestic RO Plant", description: "Home RO installation and repair." },
  { icon: Settings, title: "Iron Remover Plant", description: "Specialized iron removal systems." },
  { icon: Leaf, title: "Softener Plant", description: "Water softening solutions." },
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-5 lg:p-6 border border-border hover:border-primary/20 hover:shadow-sm transition-all"
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                    <service.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {processSteps.map((step, index) => (
                <div key={index} className="relative bg-card rounded-lg p-4 border border-border">
                  <span className="text-3xl font-bold text-primary/20">{step.step}</span>
                  <h3 className="text-sm font-semibold text-foreground mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{step.description}</p>
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
