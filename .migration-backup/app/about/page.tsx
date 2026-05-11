import Image from "next/image";
import { Check, Target, Eye, Heart, Award, Users, Building } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { PartnerMarquee } from "@/components/partner-marquee";

const values = [
  { icon: Heart, title: "Customer First", description: "Your health and satisfaction are our priorities." },
  { icon: Award, title: "Quality Excellence", description: "We never compromise on product quality." },
  { icon: Users, title: "Expert Team", description: "Trained professionals for your water needs." },
  { icon: Building, title: "Local Presence", description: "Strong service network across Tamil Nadu." },
];

const milestones = [
  { year: "2009", title: "Founded", description: "Started with a vision for clean water." },
  { year: "2012", title: "1000+ Installs", description: "First major customer milestone." },
  { year: "2015", title: "Industrial", description: "Expanded to commercial solutions." },
  { year: "2018", title: "ISO Certified", description: "Quality management certification." },
  { year: "2021", title: "10,000+", description: "Serving ten thousand families." },
  { year: "2024", title: "Innovation", description: "Advanced alkaline purifiers." },
];

const highlights = [
  "15+ years of industry experience",
  "ISI and ISO certified products",
  "Pan-Tamil Nadu service network",
  "Expert installation team",
  "24/7 customer support",
  "Annual maintenance contracts",
  "Genuine spare parts availability",
  "Water quality testing services",
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-14 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
                  About Us
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                  Delivering Pure Water Since 2009
                </h1>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Yazh Pure Life has been at the forefront of water purification
                  technology for over 15 years. We are committed to providing
                  safe, clean, and healthy drinking water to homes and businesses
                  across Tamil Nadu.
                </p>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  Our journey began with a simple mission: to ensure that every
                  family has access to pure drinking water. Today, we proudly
                  serve over 10,000 satisfied customers.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop"
                  alt="Yazh Pure Life Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 bg-card border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-5">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mb-3">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-base font-semibold text-foreground mb-2">Our Mission</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To provide accessible, affordable, and advanced water
                  purification solutions that ensure every family enjoys safe and
                  healthy drinking water through innovation and exceptional service.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-5">
                <div className="w-9 h-9 rounded-md bg-accent/10 flex items-center justify-center mb-3">
                  <Eye className="w-4 h-4 text-accent" />
                </div>
                <h2 className="text-base font-semibold text-foreground mb-2">Our Vision</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To become the leading water purification company in South
                  India, recognized for our commitment to quality, innovation,
                  and customer satisfaction with pure, mineral-rich drinking water.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Highlights */}
        <section className="py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Overview"
              title="Why Families Trust Us"
              description="We combine expertise, quality products, and excellent service."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-card rounded-md p-3 border border-border"
                >
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-foreground text-xs font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-12 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Values"
              title="What Drives Us"
              description="Our core values guide every decision we make."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 text-center border border-border hover:border-primary/20 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 mx-auto rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <value.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-xs">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Journey"
              title="Our Milestones"
              description="From humble beginnings to becoming a trusted name."
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 border border-border text-center"
                >
                  <span className="text-primary font-bold text-lg">{milestone.year}</span>
                  <h3 className="text-sm font-semibold text-foreground mt-1">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-1">
                    {milestone.description}
                  </p>
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
