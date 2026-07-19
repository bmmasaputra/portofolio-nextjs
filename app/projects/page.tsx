import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects, siteConfig } from "@/lib/data";
import { TechBadge } from "@/app/components/ui/TechBadge";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${siteConfig.name}`,
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen px-6 py-24 max-w-6xl mx-auto">
      {/* Back link */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-12"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      {/* Header */}
      <div className="mb-16">
        <SectionLabel>All Projects</SectionLabel>
        <h1 className="text-display-lg font-display font-black tracking-tighter text-[var(--text-primary)] mt-4">
          Everything I&apos;ve built.
        </h1>
        <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
          A full archive of projects — personal, open source, and professional
          work.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-raised)] hover:border-[var(--border-default)] hover:bg-[var(--surface-overlay)] transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-[var(--surface-overlay)]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                }}
              />
              {/* Featured badge */}
              {project.featured && (
                <span className="absolute top-3 left-3 text-[9px] font-mono text-text-primary tracking-widest uppercase border border-[var(--border-subtle)] px-2 py-0.5 rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40">
                  Featured
                </span>
              )}
              {/* Links */}
              <div className="absolute top-3 right-3 flex gap-1.5">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code`}
                    className="w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40 border border-[var(--border-subtle)] text-text-primary hover:text-[var(--text-primary)] transition-colors"
                  >
                    <FaGithub size={12} />
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40 border border-[var(--border-subtle)] text-text-primary hover:text-[var(--text-primary)] transition-colors"
                  >
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 gap-3">
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-display font-bold text-[var(--text-primary)] tracking-tight">
                  {project.title}
                </h2>
                <span className="text-[10px] font-mono text-[var(--text-muted)] flex-shrink-0 mt-0.5">
                  {project.year}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TechBadge key={tag}>{tag}</TechBadge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
