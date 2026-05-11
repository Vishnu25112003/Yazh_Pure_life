import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Yazh Pure Life | Water Purifiers & RO Systems",
  description:
    "Premium water purification solutions for homes and businesses. Explore our range of RO, UV, and alkaline water purifiers. Trusted by 10,000+ families in Tamil Nadu.",
  keywords: [
    "water purifier",
    "RO water purifier",
    "UV water purifier",
    "water filter",
    "drinking water",
    "Tamil Nadu",
    "Chennai",
    "water purification",
    "Yazh Pure Life",
  ],
  authors: [{ name: "Yazh Pure Life" }],
  creator: "Yazh Pure Life",
  publisher: "Yazh Pure Life",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://yazhpurelife.com",
    siteName: "Yazh Pure Life",
    title: "Yazh Pure Life | Water Purifiers & RO Systems",
    description:
      "Premium water purification solutions for homes and businesses. Trusted by 10,000+ families.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yazh Pure Life | Water Purifiers",
    description:
      "Premium water purification solutions for homes and businesses.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e4a6e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
