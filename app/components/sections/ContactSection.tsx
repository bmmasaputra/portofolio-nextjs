"use client";

import { siteConfig } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { Reveal } from "@/app/components/ui/Reveal";
import { Mail } from "lucide-react"; 
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-section px-6 max-w-6xl mx-auto"
      aria-labelledby="contact-heading"
    >
     <Reveal variant="clip-left" duration={700}>
        <SectionLabel>Contact</SectionLabel>
      </Reveal>

      <div className="mt-4 max-w-2xl">
        <Reveal variant="fade-up" delay={100}>
          <h2
            id="contact-heading"
            className="text-display-md font-display font-black tracking-tighter text-text-primary mb-6"
          >
            Let&apos;s work together.
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={180}>
          <p className="text-text-secondary leading-relaxed mb-10 text-lg">
            I&apos;m currently open to new opportunities — full-time, contract, or interesting
            side-projects. If you have something in mind, my inbox is always open.
          </p>
        </Reveal>

        {/* Primary CTA — scale up for emphasis */}
        <Reveal variant="scale-up" delay={260} duration={700}>
          <a
            href={`mailto:${siteConfig.email}`}
            className="group inline-flex items-center gap-3 text-display-md font-display font-black tracking-tighter text-text-primary border-b-2 border-border-default hover:border-text-primary transition-all duration-200 pb-1"
          >
            <Mail size={32} className="text-text-muted group-hover:text-text-primary transition-colors" />
            {siteConfig.email}
          </a>
        </Reveal>

        {/* Divider + socials — fade in last */}
        <Reveal variant="fade-up" delay={380}>
          <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-xs font-mono text-text-muted tracking-widest uppercase">
              Or find me elsewhere
            </p>

            <div className="flex items-center gap-6">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center gap-2 text-sm font-mono text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                <FaGithub size={16} />
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center gap-2 text-sm font-mono text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                <FaLinkedin size={16} />
                LinkedIn
              </a>
              <a
                href={siteConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex items-center gap-2 text-sm font-mono text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                <FaTwitter size={16} />
                Twitter
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
