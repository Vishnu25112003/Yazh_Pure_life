"use client";

import { useState } from "react";
import {
  ChevronDown,
  Clock,
  Download,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  QrCode,
  Send,
  User,
  X,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SectionHeader } from "@/components/section-header";
import { PartnerMarquee } from "@/components/partner-marquee";
import { Button } from "@/components/ui/button";
import { companyInfo } from "@/lib/data";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: [companyInfo.phone1, companyInfo.phone2],
    action: companyInfo.phone1Href,
    actionText: "Call Now",
  },
  {
    icon: Mail,
    title: "Email",
    details: [companyInfo.email],
    action: companyInfo.emailHref,
    actionText: "Send Email",
  },
  {
    icon: MapPin,
    title: "Address",
    details: companyInfo.addressLines,
    action:
      "https://maps.google.com/?q=No.19+Venkateshwara+Nagar+Teachers+Colony+Kadappa+Road+Kolathur+Chennai+600099",
    actionText: "Get Directions",
  },
  {
    icon: Clock,
    title: "Branches",
    details: companyInfo.branches,
    action: null,
    actionText: null,
  },
];

const faqs = [
  {
    question: "How do I know which purifier is right for me?",
    answer:
      "Contact Yazh Pure Life on WhatsApp or phone. Our team will recommend from the YPL home use, commercial, and hot and cold models based on your need.",
  },
  {
    question: "Do you provide installation services?",
    answer:
      "Yes, Yazh Pure Life provides RO purifier installation, repair, maintenance, up-gradation, and servicing support.",
  },
  {
    question: "What warranty do your products come with?",
    answer:
      "YPL product details vary by model. Contact our team for the latest warranty and service details before purchase.",
  },
  {
    question: "How often should I service my water purifier?",
    answer:
      "Regular service is recommended. Yazh Pure Life offers affordable AMC packages with periodic servicing and faulty spare part replacement.",
  },
  {
    question: "Do you serve areas outside Chennai?",
    answer: `Branch offices are listed for ${companyInfo.branches.join(", ")}. Contact us to confirm service availability for your exact location.`,
  },
];

const paymentMethods = [
  {
    name: "Paytm",
    number: companyInfo.paymentNumber,
    qr: "/paytm%20qr.png",
    color: "from-sky-500 to-blue-700",
  },
  {
    name: "Google Pay",
    number: companyInfo.paymentNumber,
    qr: "/gpay%20qr.jpeg",
    color: "from-emerald-500 to-sky-600",
  },
  {
    name: "PhonePe",
    number: companyInfo.paymentNumber,
    qr: "/phonepe%20qr.jpeg",
    color: "from-violet-500 to-purple-700",
  },
];

export default function ContactPage() {
  const [selectedPayment, setSelectedPayment] = useState<
    (typeof paymentMethods)[number] | null
  >(null);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const handleMessageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = encodeURIComponent(
      `Hi Yazh Pure Life,\n\nName: ${formData.name}\nMobile: ${formData.mobile}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/${companyInfo.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="py-14 lg:py-20 bg-gradient-to-b from-water-dark via-water-medium to-background">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12 text-center">
            <p className="text-white/70 text-xs uppercase tracking-wider font-medium mb-2">
              Contact Us
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
              Get in Touch With Us
            </h1>
            <p className="mt-3 text-sm lg:text-base text-white/70 max-w-2xl mx-auto">
              Contact us for product enquiries, RO service, AMC packages,
              spare parts, and payment details.
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-b from-background via-white to-secondary/20 py-10 lg:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-[72%] -translate-x-1/2 rounded-full bg-sky-100/65 blur-3xl" />
          <div className="relative max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="home-soft-rise grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="group flex items-start gap-3 rounded-xl bg-white/88 p-4 shadow-[0_12px_34px_rgba(15,56,84,0.08)] ring-1 ring-sky-100/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(15,56,84,0.13)]"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <info.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {info.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {info.details.join(" / ")}
                    </p>
                    {info.action && (
                      <a
                        href={info.action}
                        target={info.action.startsWith("http") ? "_blank" : undefined}
                        rel={
                          info.action.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="mt-2 inline-flex text-xs font-semibold text-primary"
                      >
                        {info.actionText}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-secondary/20 via-background to-white py-10 lg:py-16">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="Payment"
              title="Digital Payment"
              description="Tap a payment option to view QR code. You can also download the QR image."
            />
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.name}
                  type="button"
                  onClick={() => setSelectedPayment(method)}
                  className="group relative overflow-hidden rounded-2xl bg-white p-5 text-left shadow-[0_16px_45px_rgba(15,56,84,0.09)] ring-1 ring-sky-100/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(15,56,84,0.15)]"
                >
                  <span
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${method.color}`}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${method.color} text-white shadow-sm transition-transform group-hover:scale-105`}
                    >
                      <QrCode className="h-5 w-5" />
                    </span>
                    <span className="rounded-full bg-secondary/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      QR
                    </span>
                  </div>
                  <span className="mt-5 block text-lg font-semibold text-foreground">
                    {method.name}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-muted-foreground">
                    {method.number}
                  </span>
                  <span className="mt-5 inline-flex rounded-md bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    View QR code
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          id="send-message"
          className="bg-gradient-to-b from-white via-secondary/25 to-background py-12 lg:py-16"
        >
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <SectionHeader
              subtitle="Message"
              title="Send Us a Message"
              description="Share your requirement and we will respond through WhatsApp."
            />
            <form
              onSubmit={handleMessageSubmit}
              className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_24px_75px_rgba(15,56,84,0.13)] ring-1 ring-sky-100/80 lg:grid-cols-[0.72fr_1.28fr]"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-water-dark via-primary to-water-medium p-6 text-white lg:p-8">
                <div className="pointer-events-none absolute -right-14 -top-14 h-48 w-48 rounded-full bg-white/12 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-cyan-200/15 blur-3xl" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/14 shadow-inner ring-1 ring-white/20">
                  <MessageSquareText className="h-7 w-7" />
                </div>
                <p className="relative mt-6 text-xs uppercase tracking-wider text-white/65">
                  Quick Enquiry
                </p>
                <h3 className="relative mt-2 text-2xl font-semibold leading-tight">
                  Send your request directly to our team.
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-white/78">
                  Product guidance, service booking, AMC support, installation,
                  and spare parts requests are sent through WhatsApp.
                </p>
                <div className="relative mt-7 space-y-3">
                  {[
                    ["01", "Fill the enquiry details"],
                    ["02", "Submit to WhatsApp"],
                    ["03", "Our team responds"],
                  ].map(([step, text]) => (
                    <div key={step} className="flex items-center gap-3 rounded-xl bg-white/10 px-3 py-3 ring-1 ring-white/12">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/14 text-xs font-bold text-white">
                        {step}
                      </span>
                      <span className="text-xs font-medium text-white/82">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 lg:p-7">
                <div className="mb-5 rounded-2xl bg-gradient-to-r from-secondary/70 to-sky-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Enquiry Form
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">
                    We will contact you as soon as possible
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your mobile number and requirement for faster support.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Name
                  </span>
                  <div className="flex h-12 items-center gap-2 rounded-xl bg-secondary/45 px-3 shadow-inner transition-colors focus-within:bg-white">
                    <User className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                      required
                      value={formData.name}
                      onChange={(event) =>
                        setFormData({ ...formData, name: event.target.value })
                      }
                      className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none focus:outline-none focus-visible:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Mobile
                  </span>
                  <div className="flex h-12 items-center gap-2 rounded-xl bg-secondary/45 px-3 shadow-inner transition-colors focus-within:bg-white">
                    <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                      required
                      value={formData.mobile}
                      onChange={(event) =>
                        setFormData({ ...formData, mobile: event.target.value })
                      }
                      className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none focus:outline-none focus-visible:outline-none"
                      placeholder="Mobile number"
                    />
                  </div>
                </label>
                <label className="space-y-1.5 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Email
                  </span>
                  <div className="flex h-12 items-center gap-2 rounded-xl bg-secondary/45 px-3 shadow-inner transition-colors focus-within:bg-white">
                    <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none focus:outline-none focus-visible:outline-none"
                      placeholder="Email address"
                    />
                  </div>
                </label>
                <label className="space-y-1.5 md:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(event) =>
                      setFormData({ ...formData, message: event.target.value })
                    }
                    className="min-h-36 w-full resize-none rounded-xl bg-secondary/45 px-3 py-3 text-sm shadow-inner outline-none transition-colors focus:bg-white focus:outline-none focus-visible:outline-none"
                    placeholder="Tell us about product enquiry, service, AMC or installation requirement"
                  />
                </label>
                <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Submitting this form opens WhatsApp with your message prefilled.
                  </p>
                  <Button type="submit" className="h-11 w-full sm:w-auto">
                    <Send className="mr-1.5 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="bg-gradient-to-b from-background via-white to-secondary/15 py-12 lg:py-16">
          <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <SectionHeader
                  subtitle="FAQ"
                  title="Frequently Asked Questions"
                  description="Find answers to common questions."
                  align="left"
                />
                <div className="space-y-2">
                  {faqs.map((faq) => (
                    <details
                      key={faq.question}
                      className="group rounded-xl bg-white shadow-sm ring-1 ring-sky-100/80"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 p-4 text-sm font-semibold text-foreground">
                        {faq.question}
                        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="-mt-1 px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
              <div>
                <SectionHeader
                  subtitle="Location"
                  title="Visit Our Showroom"
                  description={`${companyInfo.addressLines.join(", ")}. Branch offices: ${companyInfo.branches.join(", ")}.`}
                  align="left"
                />
                <div className="relative min-h-[24rem] overflow-hidden rounded-2xl bg-muted shadow-[0_18px_55px_rgba(15,56,84,0.12)] ring-1 ring-sky-100/80">
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
            </div>
          </div>
        </section>

        <PartnerMarquee />
      </main>
      <Footer />

      {selectedPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
            onClick={() => setSelectedPayment(null)}
            aria-label="Close QR preview"
          />
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPayment(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="pr-10">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Scan to pay
              </p>
              <h3 className="mt-1 text-xl font-semibold text-foreground">
                {selectedPayment.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedPayment.number}
              </p>
            </div>
            <div className="mt-5 overflow-hidden rounded-xl bg-secondary/50 p-3">
              <img
                src={selectedPayment.qr}
                alt={`${selectedPayment.name} QR code`}
                className="mx-auto aspect-square w-full max-w-72 object-contain"
              />
            </div>
            <div className="mt-5 flex gap-2">
              <Button asChild className="flex-1">
                <a href={selectedPayment.qr} download>
                  <Download className="mr-1.5 h-4 w-4" />
                  Download
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedPayment(null)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
