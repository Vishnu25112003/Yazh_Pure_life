import { Check, Target, Eye, Heart, Award, Users, Building } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { PartnerMarquee } from "@/components/partner-marquee";
import { companyInfo } from "@/lib/data";

const values = [
  {
    icon: Heart,
    title: "Sales & Service",
    description:
      "We support customers from product selection to installation, repair, AMC service, and spare-part replacement.",
  },
  {
    icon: Award,
    title: "Certified",
    description:
      `${companyInfo.certification}, focused on reliable RO purifier solutions for domestic and commercial needs.`,
  },
  {
    icon: Users,
    title: "Customer Rated",
    description:
      `${companyInfo.rating} Google rating from ${companyInfo.reviews} reviews, built through responsive service and clear guidance.`,
  },
  {
    icon: Building,
    title: "Branches",
    description:
      `Service presence through ${companyInfo.branches.join(", ")} for customer enquiries, support, and installation coordination.`,
  },
];

const highlights = [
  companyInfo.tagline,
  companyInfo.subTagline,
  companyInfo.certification,
  `${companyInfo.rating} Google rating (${companyInfo.reviews} reviews)`,
  `Head office: ${companyInfo.addressLines[1]}`,
  `Branch offices: ${companyInfo.branches.join(", ")}`,
  "Genuine spare parts availability",
  "Annual maintenance contract packages",
];

const aboutStory = [
  "Yazh Pure Life is a leading brand in drinking water purification system. We are one of the best RO Water purifier dealers in Chennai. We started this company with an aspiration and dedication to create a healthy environment by understanding the requirements of our customers by providing them high quality innovative products.",
  "We do all kind of sales and services for water purifier product throughout all over Chennai. Our product is widely used in Houses, Schools, Colleges, Corporate Companies and in all Commercial sectors.",
  "Getting purified water seems very hard now a day in Chennai. To overcome from this situation, we offer a service at an affordable price in domestic and semi-commercial water purification systems.",
  "Our services reputation has been built on 100% customer satisfaction with unique products, easy installation, periodic maintenance, and enhanced on-time after-sales-service.",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-14 lg:py-20 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
                  About Us
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                  {companyInfo.name}
                </h1>
                <p className="mt-4 text-sm lg:text-base text-white/80 leading-relaxed max-w-2xl">
                  {companyInfo.tagline}. We provide domestic and commercial RO
                  water purifier products, service support, spare parts, and
                  annual maintenance contract packages.
                </p>
                <p className="mt-3 text-sm lg:text-base text-white/70 leading-relaxed max-w-2xl">
                  Head office at Kolathur, Chennai with branch offices in{" "}
                  {companyInfo.branches.join(", ")}.
                </p>
              </div>
              <div className="relative mx-auto flex aspect-[4/3] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-white/10 p-5 shadow-[0_22px_60px_rgba(4,28,44,0.22)] ring-1 ring-white/15 backdrop-blur">
                <div className="pointer-events-none absolute inset-x-12 bottom-5 h-10 rounded-full bg-water-deep/25 blur-2xl" />
                <img
                  src="/about.png"
                  alt="Yazh Pure Life water purifier service"
                  className="relative h-full w-full object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.2)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Story */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-white to-secondary/20 py-12 lg:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[72%] -translate-x-1/2 rounded-full bg-sky-100/60 blur-3xl" />
          <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
              <div className="home-soft-rise flex min-h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-water-dark via-primary to-water-medium p-6 text-white shadow-[0_22px_60px_rgba(15,56,84,0.18)] lg:p-8">
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/65">
                    Company Story
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight lg:text-3xl">
                    Best RO Water Purifier Dealers in Chennai
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/78">
                    High quality innovative water purification products backed by
                    sales, service, installation, and after-sales support.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {["Chennai-wide service", "Domestic & commercial", "Periodic maintenance", "On-time support"].map((item) => (
                    <span key={item} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-medium text-white/82 ring-1 ring-white/12">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                {aboutStory.map((paragraph, index) => (
                  <p
                    key={index}
                    className="home-soft-rise rounded-xl bg-white/88 p-4 text-sm leading-relaxed text-muted-foreground shadow-[0_12px_34px_rgba(15,56,84,0.07)] ring-1 ring-sky-100/70"
                    style={{ animationDelay: `${index * 90}ms` }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-white to-secondary/20 py-12 shadow-[inset_0_30px_52px_rgba(255,255,255,0.85)] lg:py-16">
          <div className="pointer-events-none absolute left-0 top-8 h-44 w-44 rounded-full bg-sky-100/70 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-4 h-44 w-44 rounded-full bg-cyan-100/65 blur-3xl" />
          <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              <div className="home-soft-rise group relative overflow-hidden rounded-2xl bg-white/86 p-5 shadow-[0_18px_55px_rgba(15,56,84,0.1)] ring-1 ring-sky-100/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,56,84,0.15)] lg:p-7">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />
                <div className="home-float w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-white flex items-center justify-center mb-4 shadow-inner">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Our Mission</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To provide reliable RO water purifier sales and services for
                  domestic and commercial customers with genuine support and
                  available spare parts.
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  We help customers choose suitable YPL models based on usage,
                  storage capacity, purification stages, and service needs.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["Genuine support", "Spare parts"].map((item) => (
                    <span key={item} className="rounded-md bg-secondary/60 px-3 py-2 text-center text-xs font-medium text-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="home-soft-rise group relative overflow-hidden rounded-2xl bg-white/86 p-5 shadow-[0_18px_55px_rgba(15,56,84,0.1)] ring-1 ring-cyan-100/80 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,56,84,0.15)] lg:p-7 [animation-delay:120ms]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0" />
                <div className="home-float w-11 h-11 rounded-xl bg-gradient-to-br from-accent/15 to-white flex items-center justify-center mb-4 shadow-inner">
                  <Eye className="w-4 h-4 text-accent" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">Our Vision</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To be a trusted water purifier service partner for homes and
                  businesses through certified service, clear product guidance,
                  and responsive customer support.
                </p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Our focus is long-term customer care through installation,
                  maintenance, up-gradation, AMC support, and genuine spare
                  availability.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["Certified service", "Clear guidance"].map((item) => (
                    <span key={item} className="rounded-md bg-secondary/60 px-3 py-2 text-center text-xs font-medium text-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Highlights */}
        <section className="relative overflow-hidden bg-gradient-to-b from-secondary/20 via-background to-background py-12 lg:py-20">
          <div className="pointer-events-none absolute left-1/2 top-10 h-32 w-[70%] -translate-x-1/2 rounded-full bg-sky-100/55 blur-3xl" />
          <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="Overview"
              title="Why Families Trust Us"
              description="Real company details from Yazh Pure Life."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="home-soft-rise group relative overflow-hidden rounded-xl bg-white/88 p-4 shadow-[0_12px_34px_rgba(15,56,84,0.08)] ring-1 ring-sky-100/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,56,84,0.13)]"
                  style={{ animationDelay: `${index * 55}ms` }}
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/30 via-accent/50 to-primary/20 opacity-70 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-center gap-3 pl-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform duration-300 group-hover:scale-110">
                      <Check className="w-4 h-4 text-accent" />
                    </span>
                    <span className="text-foreground text-xs font-semibold leading-relaxed">{highlight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/35 to-background py-12 shadow-[inset_0_30px_54px_rgba(255,255,255,0.72),inset_0_-30px_54px_rgba(255,255,255,0.76)] lg:py-20">
          <div className="pointer-events-none absolute -left-12 top-1/3 h-48 w-48 rounded-full bg-cyan-100/70 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 top-10 h-48 w-48 rounded-full bg-sky-100/75 blur-3xl" />
          <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="Values"
              title="What Drives Us"
              description="Our core values guide every decision we make."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="home-soft-rise group relative overflow-hidden rounded-2xl bg-white/88 p-5 text-center shadow-[0_16px_45px_rgba(15,56,84,0.09)] ring-1 ring-white/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,56,84,0.15)] lg:p-6"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <div className="absolute inset-x-8 top-0 h-20 rounded-full bg-gradient-to-b from-sky-100/70 to-transparent blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="home-float relative w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/12 via-white to-accent/10 flex items-center justify-center mb-4 shadow-inner">
                    <value.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="relative text-sm font-semibold text-foreground mb-1">
                    {value.title}
                  </h3>
                  <p className="relative text-muted-foreground text-xs leading-relaxed">
                    {value.description}
                  </p>
                  <div className="relative mx-auto mt-4 h-1.5 w-10 rounded-full bg-primary/25 transition-all duration-300 group-hover:w-16 group-hover:bg-primary/45" />
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
