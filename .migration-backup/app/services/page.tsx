import {
  Wrench,
  Settings,
  TestTube,
  Truck,
  Headphones,
  RefreshCw,
  ShieldCheck,
  ClipboardCheck,
  Check,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { PartnerMarquee } from "@/components/partner-marquee";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Wrench, title: "Installation", description: "Professional setup by trained technicians with same-day service." },
  { icon: Settings, title: "Maintenance", description: "Comprehensive AMC plans with scheduled visits and optimization." },
  { icon: TestTube, title: "Water Testing", description: "Free home testing with detailed reports and recommendations." },
  { icon: Truck, title: "Fast Delivery", description: "Quick, secure delivery across Tamil Nadu with tracking." },
  { icon: RefreshCw, title: "Filter Replacement", description: "Timely replacements with genuine parts and testing." },
  { icon: Headphones, title: "24/7 Support", description: "Round-the-clock phone and WhatsApp assistance." },
  { icon: ShieldCheck, title: "Warranty", description: "1-3 year coverage with hassle-free claims process." },
  { icon: ClipboardCheck, title: "Consultation", description: "Expert advice for choosing the right water solution." },
];

const processSteps = [
  { step: "01", title: "Contact", description: "Reach out via WhatsApp or phone." },
  { step: "02", title: "Testing", description: "Free water quality analysis." },
  { step: "03", title: "Recommend", description: "Best purifier suggestion." },
  { step: "04", title: "Install", description: "Professional setup and demo." },
];

const amcPlans = [
  {
    name: "Basic",
    price: "1,499",
    features: ["2 service visits/year", "Filter cleaning", "Basic maintenance", "Phone support"],
    popular: false,
  },
  {
    name: "Standard",
    price: "2,999",
    features: ["4 service visits/year", "1 free filter replacement", "Complete maintenance", "Priority support"],
    popular: true,
  },
  {
    name: "Premium",
    price: "4,999",
    features: ["Unlimited visits", "All filters included", "Emergency support", "24/7 dedicated line"],
    popular: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Our Services
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Complete Water Purification Solutions
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-xl mx-auto">
              From installation to maintenance, we provide end-to-end services
              to ensure you always have access to pure, healthy drinking water.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="What We Offer"
              title="Comprehensive Services"
              description="Full range of services for all your water purification needs."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary/20 hover:shadow-sm transition-all"
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
        <section className="py-12 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="How It Works"
              title="Simple 4-Step Process"
              description="Getting started with Yazh Pure Life is easy."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* AMC Plans */}
        <section className="py-12 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="AMC Plans"
              title="Annual Maintenance Contracts"
              description="Choose the plan that fits your needs and budget."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {amcPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`rounded-lg p-5 relative ${
                    plan.popular
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      Popular
                    </div>
                  )}
                  <h3 className={`text-base font-semibold ${plan.popular ? "" : "text-foreground"}`}>
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className={`text-2xl font-bold ${plan.popular ? "" : "text-foreground"}`}>
                      ₹{plan.price}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      /year
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 text-xs ${
                        plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"
                      }`}>
                        <Check className="w-3 h-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-5 ${
                      plan.popular
                        ? "bg-card text-primary hover:bg-card/90"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="sm"
                    asChild
                  >
                    <a
                      href={`https://wa.me/919876543210?text=Hi!%20I%20am%20interested%20in%20the%20${plan.name}%20AMC%20plan.`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PartnerMarquee />
      </main>
      <Footer />
    </>
  );
}
