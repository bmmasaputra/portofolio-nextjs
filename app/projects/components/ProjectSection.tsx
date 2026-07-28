"use client";

import type { Project } from "@/lib/data";
import ProjectContent from "./ProjectContent";
import ProjectShowcase from "./ProjectShowcase";
import ProjectBackground from "./ProjectBackground";

interface ProjectSectionProps {
  project: Project;
  index: number;
  reversed?: boolean;
}

export default function ProjectSection({
  project,
  index,
  reversed = false,
}: ProjectSectionProps) {
  return (
    <section id={project.id} className="relative data-project-section scroll-mt-32">
      {/* ------- Background --------- */}

      <ProjectBackground motif={project.motif} accent={project.accent} />

      <div
        className={`
          grid
          items-center
          gap-20
          lg:min-h-screen
          lg:grid-cols-2
          ${
            reversed
              ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1"
              : ""
          }
        `}
      >
        {/* ---------- Content ---------- */}

        <ProjectContent project={project} index={index} />

        {/* ---------- Showcase ---------- */}

        <div className="relative">
          {/* Desktop Sticky */}

          <div className="lg:sticky lg:top-24">
            {/* Ambient Glow */}

            <div
              className="
                absolute
                inset-0
                -z-10
                scale-125
                rounded-full
                blur-[120px]
                opacity-70
              "
              style={{
                background: `radial-gradient(circle, ${project.accentGlow} 0%, transparent 70%)`,
              }}
            />

            {/* Decorative Circle */}

            <div
              className="
                absolute
                left-1/2
                top-1/2
                -z-10
                h-[420px]
                w-[420px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white/5
              "
            />

            {/* Image */}

            <ProjectShowcase project={project} priority={index === 0} />
          </div>
        </div>
      </div>
    </section>
  );
}
