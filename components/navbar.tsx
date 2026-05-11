"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-water-dark shadow-sm backdrop-blur-md">
      <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex h-12 w-48 items-center overflow-hidden rounded-md bg-white/95 px-2.5 shadow-sm ring-1 ring-white/25 transition-transform group-hover:scale-[1.02] sm:w-56">
              <img
                src="/banner.png"
                alt="Yazh Pure Life"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-3 xl:px-4 py-2 text-sm font-medium text-white/90 transition-colors rounded-md hover:bg-white/15 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button
              asChild
              size="sm"
              className="bg-white text-primary hover:bg-white/95 font-medium shadow-sm"
            >
              <Link to="/contact#send-message">Send Message</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-white transition-colors hover:bg-white/15"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-water-dark shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block px-3 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                asChild
                className="w-full bg-white text-primary hover:bg-white/95"
                size="sm"
              >
                <Link to="/contact#send-message" onClick={() => setIsOpen(false)}>
                  Send Message
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
