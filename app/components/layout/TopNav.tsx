"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, siteConfig } from "@/lib/data";

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trap focus and prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-surface-base/80 backdrop-blur-md border-b border-border-subtle"
            : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Wordmark */}
          <a
            href="#"
            className="font-mono text-sm text-text-muted hover:text-text-primary transition-colors duration-200 tracking-tight"
            aria-label="Home"
          >
            <span className="text-text-secondary">{"//"}</span>{" "}
            {siteConfig.name.split(" ")[0].toLowerCase()}.dev
          </a>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200 font-mono tracking-wide"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-sm font-mono px-4 py-2 border border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary transition-all duration-200 rounded-sm"
            >
              Hire me
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-text-muted hover:text-text-primary transition-colors p-1"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] bg-surface-base/95 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors p-1"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-10">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-display font-bold text-text-secondary hover:text-text-primary transition-colors duration-200 tracking-tight"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => setMobileOpen(false)}
              className="mt-4 text-sm font-mono px-8 py-3 border border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary transition-all duration-200"
            >
              Hire me
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
