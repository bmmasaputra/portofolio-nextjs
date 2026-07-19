"use client";

import { siteConfig, skills } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { Reveal } from "@/app/components/ui/Reveal";
import { MarqueeColumn } from "@/app/components/ui/MarqueeColumn";
import { MapPin } from "lucide-react";

// Alternating direction + slightly different speeds per column
// keeps the four columns from feeling mechanically synced.
const columnConfig = [
  { direction: "up" as const, pixelsPerSecond: 14 },
  { direction: "down" as const, pixelsPerSecond: 20 },
  { direction: "up" as const, pixelsPerSecond: 16 },
  { direction: "down" as const, pixelsPerSecond: 22 },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-section px-6 max-w-6xl mx-auto"
      aria-labelledby="about-heading"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] gap-12 xl:gap-8 items-start">
        {/* ── Left: Bio ── */}
        <div>
          <Reveal variant="clip-left" duration={700}>
            <SectionLabel>About</SectionLabel>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <h2
              id="about-heading"
              className="text-display-md font-display font-black tracking-tighter text-text-primary mb-6 mt-4"
            >
              Building software with intention.
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={180}>
            <p className="text-text-secondary leading-relaxed mb-4">
              {siteConfig.bio}
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={240}>
            <p className="text-text-secondary leading-relaxed mb-8">
              I'm currently seeking opportunities where I can contribute to
              impactful products while continuing to grow as a software
              engineer. Whether I'm building a polished frontend, designing
              APIs, or improving developer workflows, I enjoy creating software
              that delivers lasting value.
            </p>
          </Reveal>

          <Reveal variant="fade-up" delay={300}>
            <div className="flex items-center gap-2 text-text-muted text-sm font-mono">
              <MapPin size={14} />
              <span>{siteConfig.location}</span>
            </div>
          </Reveal>
        </div>

        {/* ── Right: Skill columns — scrolls normally with the page ── */}
        <Reveal variant="fade" delay={150} threshold={0.05}>
          <div className="relative">
            {/* Blue inner glow — rises from the bottom inside the card */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-48 pointer-events-none animate-breathe"
              style={{
                background:
                  "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(113, 113, 122, .6) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Columns — separated by hairlines */}
            <div className="relative grid grid-cols-4 divide-x divide-border-subtle">
              {skills.map((skillGroup, i) => (
                <MarqueeColumn
                  key={skillGroup.category}
                  items={skillGroup.items}
                  category={skillGroup.category}
                  direction={columnConfig[i].direction}
                  pixelsPerSecond={columnConfig[i].pixelsPerSecond}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
