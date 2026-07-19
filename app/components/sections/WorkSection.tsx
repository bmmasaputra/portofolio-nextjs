"use client";

import { useRef } from "react";
import { experiences } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { TechBadge } from "@/app/components/ui/TechBadge";
import { Reveal } from "@/app/components/ui/Reveal";
import { ScrollTimeline } from "@/app/components/ui/ScrollTimeline";

export function WorkSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // One ref per experience entry — passed to ScrollTimeline so the rAF loop
  // can read each dot's position and fill it as the ball passes.
  const dotRefs = useRef(
    experiences.map(() => ({ current: null as HTMLDivElement | null })),
  );

  return (
    <section
      id="work"
      className="py-section px-6 max-w-6xl mx-auto"
      aria-labelledby="work-heading"
    >
      <Reveal variant="clip-left" duration={700}>
        <SectionLabel>Experience</SectionLabel>
      </Reveal>

      <Reveal variant="fade-up" delay={100}>
        <h2
          id="work-heading"
          className="text-display-md font-display font-black tracking-tighter text-text-primary mb-16 mt-4"
        >
          Where I&apos;ve worked.
        </h2>
      </Reveal>

      {/* Timeline — spine runs centered, entries split left/right around it */}
      <div ref={timelineRef} className="relative">
        {/* Scroll-driven line + lagging circle marker — centered horizontally */}
        <div className="hidden md:block">
          <ScrollTimeline
            containerRef={timelineRef}
            dotRefs={dotRefs.current}
          />
        </div>

        <ol className="space-y-16 md:space-y-20">
          {experiences.map((exp, index) => (
            <Reveal
              key={exp.id}
              as="li"
              variant="fade-up"
              delay={220 + index * 120}
              threshold={0.1}
              className="relative"
            >
              {/* Dot — ref wired so ScrollTimeline can fill it */}
              <div
                ref={(el) => {
                  dotRefs.current[index].current = el;
                }}
                className="absolute left-1/2 top-1.5 -translate-x-1/2 w-[7px] h-[7px] rounded-full border border-border-default bg-surface-base hidden md:block z-10"
                style={{
                  transition:
                    "background-color 0.3s ease, border-color 0.3s ease",
                }}
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-12">
                {/* ── Left column: period + company + role ── */}
                <div className="md:text-left md:pr-2">
                  <span className="text-xs md:text-xl font-mono text-text-muted tracking-widest uppercase">
                    {exp.period}
                  </span>
                  <h3 className="mt-2 text-lg md:text-6xl font-display font-bold text-text-primary tracking-tight">
                    {exp.company}
                  </h3>
                  <h4 className="mt-1 text-sm md:text-xl font-mono text-text-secondary tracking-wide uppercase">
                    {exp.role}
                  </h4>
                </div>

                {/* ── Right column: description + tech stack ── */}
                <div className="md:pl-2 ">
                  <p className="text-text-secondary text-lg leading-relaxed mb-4 max-w-md">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <TechBadge key={tech}>{tech}</TechBadge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider — mobile only, since spine is hidden below md */}
              {index < experiences.length - 1 && (
                <div
                  className="mt-16 md:hidden h-px bg-border-subtle"
                  aria-hidden="true"
                />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
