import { Phone, Mail, MapPin, Clock, MessageCircle, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { PartnerMarquee } from "@/components/partner-marquee";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91 98765 43210", "+91 98765 43211"],
    action: "tel:+919876543210",
    actionText: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@yazhpurelife.com", "support@yazhpurelife.com"],
    action: "mailto:info@yazhpurelife.com",
    actionText: "Send Email",
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Water Street, Pure City", "Tamil Nadu - 600001"],
    action: "https://maps.google.com/?q=Chennai,Tamil+Nadu",
    actionText: "Get Directions",
  },
  {
    icon: Clock,
    title: "Hours",
    details: ["Mon-Sat: 9AM - 7PM", "Sun: 10AM - 5PM"],
    action: null,
    actionText: null,
  },
];

const faqs = [
  {
    question: "How do I know which purifier is right for me?",
    answer: "We offer free water quality testing to analyze your water's TDS, pH, and contaminant levels. Based on the results, our experts recommend the best purifier.",
  },
  {
    question: "Do you provide installation services?",
    answer: "Yes, we provide free professional installation with every purchase. Our trained technicians will set up your purifier and provide a complete demo.",
  },
  {
    question: "What warranty do your products come with?",
    answer: "Our products come with 1-3 years warranty depending on the model. We also offer extended warranty and AMC plans.",
  },
  {
    question: "How often should I service my water purifier?",
    answer: "We recommend servicing every 3-4 months. Regular maintenance ensures optimal performance and extends system life.",
  },
  {
    question: "Do you serve areas outside Chennai?",
    answer: "Yes, we serve all major cities and towns across Tamil Nadu. Contact us to check coverage in your area.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Contact Us
            </p>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Get in Touch With Us
            </h1>
            <p className="mt-2 text-sm text-white/70 max-w-xl mx-auto">
              Have questions about our products or services? We&apos;re here to help.
              Reach out through any of the channels below.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-10 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-card rounded-lg p-4 border border-border text-center hover:border-primary/20 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 mx-auto rounded-md bg-primary/10 flex items-center justify-center mb-3">
                    <info.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <div className="space-y-0.5">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground text-xs">
                        {detail}
                      </p>
                    ))}
                  </div>
                  {info.action && (
                    <a
                      href={info.action}
                      target={info.action.startsWith("http") ? "_blank" : undefined}
                      rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-block mt-2 text-primary font-medium text-xs hover:underline"
                    >
                      {info.actionText}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp CTA */}
        <section className="py-10 bg-[#25D366]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <MessageCircle className="w-10 h-10 text-white mx-auto mb-3" />
            <h2 className="text-xl font-semibold text-white">
              Prefer WhatsApp?
            </h2>
            <p className="mt-2 text-white/90 text-sm max-w-md mx-auto">
              Chat with us directly for quick responses. Our team is available to answer questions and help you choose.
            </p>
            <Button
              asChild
              className="mt-4 bg-white text-[#25D366] hover:bg-white/95"
            >
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20a%20question%20about%20your%20water%20purifiers."
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-10 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="Location"
              title="Visit Our Showroom"
              description="Come and experience our products in person."
            />
            <div className="relative aspect-[21/9] rounded-lg overflow-hidden bg-muted border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d80.06892085!3d12.9539974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d4e3f6c1f69%3A0x7e8c2f3e3e3e3e3e!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Yazh Pure Life Location"
                className="absolute inset-0"
              />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 bg-background">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              subtitle="FAQ"
              title="Frequently Asked Questions"
              description="Find answers to common questions."
            />
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-card rounded-lg border border-border"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-foreground">
                    {faq.question}
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="px-4 pb-4 text-sm text-muted-foreground -mt-1">
                    {faq.answer}
                  </p>
                </details>
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
