"use client";

import { siteConfig, skills } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { MapPin } from "lucide-react";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-section px-6 max-w-6xl mx-auto"
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: Bio */}
        <div>
          <SectionLabel>About</SectionLabel>

          <h2
            id="about-heading"
            className="text-display-md font-display font-black tracking-tighter text-text-primary mb-6 mt-4"
          >
            Building software with intention.
          </h2>

          <p className="text-text-secondary leading-relaxed mb-4">{siteConfig.bio}</p>

          <p className="text-text-secondary leading-relaxed mb-8">
            When I&apos;m not shipping code, I write about distributed systems and developer tooling.
            I believe in open source, clear documentation, and tests that actually catch bugs.
          </p>

          <div className="flex items-center gap-2 text-text-muted text-sm font-mono">
            <MapPin size={14} />
            <span>{siteConfig.location}</span>
          </div>
        </div>

        {/* Right: Skills */}
        <div className="space-y-8">
          <SectionLabel>Toolkit</SectionLabel>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="text-xs font-mono text-text-muted tracking-widest uppercase mb-3">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-1.5">
                  {skillGroup.items.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-text-secondary flex items-center gap-2"
                    >
                      <span
                        className="w-1 h-1 rounded-full bg-border-strong flex-shrink-0"
                        aria-hidden="true"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
