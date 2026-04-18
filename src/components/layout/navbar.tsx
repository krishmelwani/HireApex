import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { motion, AnimatePresence } from "framer-motion";
import hireApexLogo from "@/assets/logo-full.png";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Leadership", href: "/leadership" },
  { label: "Careers", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2" data-testid="link-home-logo">
            <img src={hireApexLogo} alt="HireApex" className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={`relative text-sm font-medium transition-colors hover:text-primary group ${location === link.href ? "text-primary" : "text-muted-foreground"}`} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                {link.label}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-primary transition-all duration-300 ${location === link.href ? "w-full" : "w-0 group-hover:w-full"}`}></span>
              </Link>
            ))}
            <Link href="/contact" data-testid="button-nav-cta">
              <MagneticButton variant="default" className="font-medium tracking-wide">
                Schedule a Call
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground focus:outline-none p-2"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${location === link.href ? "text-primary bg-secondary/50" : "text-foreground hover:bg-secondary/30"}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full justify-center">Schedule a Call</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
