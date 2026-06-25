"use client";

import { useEffect, useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move
  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 12;
      const y = (clientY / innerHeight - 0.5) * 8;
      container.style.setProperty("--parallax-x", `${x}px`);
      container.style.setProperty("--parallax-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto"
      aria-label="Introduction"
    >
      {/* Top glow */}
      <div className="hero-glow" aria-hidden="true" />

      <div ref={containerRef} className="relative z-10 pt-24 pb-16">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 border border-border-subtle rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-pulse" aria-hidden="true" />
          <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
            Available for work
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-display-xl font-display font-black tracking-tighter text-text-primary mb-6 text-balance leading-none"
          style={{
            transform: reducedMotion
              ? undefined
              : "translate(var(--parallax-x, 0), var(--parallax-y, 0))",
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Signature: blinking cursor on the headline */}
          <span className="cursor-blink">{siteConfig.name}</span>
          <br />
          <span className="text-text-muted">{siteConfig.role}</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-text-secondary max-w-xl mb-12 leading-relaxed font-light">
          {siteConfig.tagline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-surface-base font-mono text-sm font-semibold hover:bg-text-accent transition-colors duration-200 rounded-sm"
          >
            View my work
            <ArrowDownRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-border-default text-text-secondary font-mono text-sm hover:border-border-strong hover:text-text-primary transition-all duration-200 rounded-sm"
          >
            Get in touch
          </a>
        </div>

        {/* Social links */}
        <div className="mt-16 flex items-center gap-6">
          <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
            Find me on
          </span>
          <div className="h-px flex-1 max-w-[2rem] bg-border-subtle" aria-hidden="true" />
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <FaGithub size={18} />
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href={siteConfig.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter profile"
            className="text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <FaTwitter size={18} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted"
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-border-default to-transparent" />
      </div>
    </section>
  );
}
