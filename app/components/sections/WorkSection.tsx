"use client";

import { experiences } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { TechBadge } from "@/app/components/ui/TechBadge";
import { Reveal } from "@/app/components/ui/Reveal";

export function WorkSection() {
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
          className="text-display-md font-display font-black tracking-tighter text-text-primary mb-12 mt-4"
        >
          Where I&apos;ve worked.
        </h2>
      </Reveal>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line — clip-path animates it drawing downward */}
        <Reveal variant="clip-left" delay={200} duration={900}>
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-border-subtle hidden sm:block"
            aria-hidden="true"
          />
        </Reveal>

        <ol className="space-y-0">
          {experiences.map((exp, index) => (
            <Reveal
              key={exp.id}
              as="li"
              variant="fade-left"
              delay={220 + index * 120}
              threshold={0.08}
              className="relative sm:pl-10 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div
                className="absolute left-0 top-1 -translate-x-[3px] w-[7px] h-[7px] rounded-full border border-border-default bg-surface-base hidden sm:block"
                aria-hidden="true"
              />

              <div className="group">
                {/* Period */}
                <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
                  {exp.period}
                </span>

                {/* Role & company */}
                <div className="mt-2 mb-3">
                  <h3 className="text-lg font-display font-bold text-text-primary tracking-tight">
                    {exp.role}
                    <span className="text-text-muted font-normal"> — </span>
                    <span className="text-text-secondary">{exp.company}</span>
                  </h3>
                </div>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-2xl">
                  {exp.description}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </div>

                {/* Divider mobile */}
                {index < experiences.length - 1 && (
                  <div className="mt-12 sm:hidden h-px bg-border-subtle" aria-hidden="true" />
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
