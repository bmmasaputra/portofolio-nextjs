"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { Reveal } from "@/app/components/ui/Reveal";
import { TechBadge } from "@/app/components/ui/TechBadge";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const visibleProjects = showAll ? projects : featured;

  return (
    <section
      id="projects"
      className="py-section px-6 max-w-6xl mx-auto"
      aria-labelledby="projects-heading"
    >
      <div className="flex items-end justify-between mb-12">
        <div>
          <Reveal variant="clip-left" duration={700}>
            <SectionLabel>Projects</SectionLabel>
          </Reveal>
          <Reveal variant="fade-up" delay={100}>
            <h2
              id="projects-heading"
              className="text-display-md font-display font-black tracking-tighter text-text-primary mt-4"
            >
              Things I&apos;ve built.
            </h2>
          </Reveal>
        </div>

        {others.length > 0 && (
          <Reveal variant="fade" delay={200}>
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-mono text-text-muted hover:text-text-primary transition-colors duration-200"
              aria-expanded={showAll}
            >
              {showAll ? "Show less" : `Show all (${projects.length})`}
              <ArrowRight
                size={14}
                className={cn("transition-transform duration-200", showAll && "rotate-180")}
              />
            </button>
          </Reveal>
        )}
      </div>

      {/* Project grid — each card reveals with staggered scale-up */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleProjects.map((project, index) => (
          <Reveal
            key={project.id}
            variant="scale-up"
            delay={140 + index * 90}
            threshold={0.06}
            className={cn(index === 0 && "lg:col-span-2")}
          >
            <article
              className={cn(
                "group relative flex flex-col border border-border-subtle bg-surface-raised rounded-sm h-full",
                "hover:border-border-default transition-all duration-300",
                "hover:bg-surface-overlay"
              )}
            >
              <div className="p-6 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
                    {project.year}
                  </span>
                  <div className="flex items-center gap-3">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="text-text-muted hover:text-text-primary transition-colors duration-200"
                      >
                        <FaGithub size={16} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live demo`}
                        className="text-text-muted hover:text-text-primary transition-colors duration-200"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-bold text-text-primary tracking-tight mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                  {index === 0 ? project.longDescription : project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <TechBadge key={tag}>{tag}</TechBadge>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Mobile show all */}
      {others.length > 0 && (
        <Reveal variant="fade" delay={300} className="sm:hidden mt-8 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-sm font-mono text-text-muted hover:text-text-primary transition-colors duration-200"
            aria-expanded={showAll}
          >
            {showAll ? "Show less" : `Show all projects (${projects.length})`}
          </button>
        </Reveal>
      )}
    </section>
  );
}
