"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { TechBadge } from "@/app/components/ui/TechBadge";
import { Reveal } from "@/app/components/ui/Reveal";
import { ExternalLink, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { cn } from "@/lib/utils";

// ─── Shared project card image block ─────────────────────────────────────────
// Only used for mobile and tablet because the image treatment maybe differ with desktop.

function CardImage({
  src,
  alt,
  year,
  repo,
  link,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  year: string;
  repo?: string;
  link?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--surface-overlay)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 520px"
        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        priority={priority}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      {/* Year badge */}
      <span className="absolute top-3 left-3 text-[10px] font-mono text-text-primary tracking-widest uppercase border border-[var(--border-subtle)] px-2 py-0.5 rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40">
        {year}
      </span>
      {/* Links */}
      <div className="absolute top-3 right-3 flex gap-1.5">
        {repo && (
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${alt} source code`}
            className="w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40 border border-[var(--border-subtle)] text-text-primary hover:text-[var(--text-primary)] transition-colors"
          >
            <FaGithub size={12} />
          </a>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${alt} live demo`}
            className="w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40 border border-[var(--border-subtle)] text-text-primary hover:text-[var(--text-primary)] transition-colors"
          >
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Card content block ───────────────────────────────────────────────────────
// FOR Mobile & TABLET ONLY. Desktop uses a different layout.

function CardContent({
  title,
  description,
  tags,
  className,
}: {
  title: string;
  description: string;
  tags: string[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2 p-4", className)}>
      <h3 className="text-base font-display font-bold text-[var(--text-primary)] tracking-tight leading-tight">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <TechBadge key={tag}>{tag}</TechBadge>
        ))}
      </div>
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
// FOR Desktop ONLY. Mobile & Tablet use a different layout.

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <article
      className={cn(
        "group relative flex-shrink-0 w-[80vw] max-w-[520px] h-full",
        "flex flex-col rounded-xl overflow-hidden z-50",
        "border border-[var(--border-subtle)] bg-[var(--surface-raised)]",
      )}
    >
      {/* ── Image — ~60% card height ── */}
      <div className="relative h-[58%] flex-shrink-0 overflow-hidden bg-[var(--surface-overlay)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="520px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          priority={index < 2}
        />
        {/* Dark overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Year badge — top left */}
        <span className="absolute top-4 left-4 text-[10px] font-mono text-text-primary tracking-widest uppercase border border-[var(--border-subtle)] px-2 py-1 rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40">
          {project.year}
        </span>

        {/* Links — top right */}
        <div className="absolute top-4 right-4 flex gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code`}
              className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40 border border-[var(--border-subtle)] text-text-primarysecondary hover:text-[var(--text-primary)] transition-colors"
            >
              <FaGithub size={14} />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm bg-[var(--surface-base)]/40 border border-[var(--border-subtle)] text-text-primary hover:text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>

      {/* ── Content — remaining ~40% ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-lg font-display font-bold text-[var(--text-primary)] tracking-tight leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
          {project.longDescription}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TechBadge key={tag}>{tag}</TechBadge>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Show All Link ────────────────────────────────────────────────────────────
// FOR Mobile & Tablet ONLY. Desktop uses a different layout.

function ShowAllLink({ className }: { className?: string }) {
  return (
    <Link
      href="/projects"
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-mono",
        "text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200",
        className,
      )}
    >
      All projects
      <ArrowRight size={14} />
    </Link>
  );
}

// ─── Show All Card — last item in the horizontal scroll ───────────────────────

function ShowAllCard() {
  return (
    <Link
      href="/projects"
      className={cn(
        "group relative flex-shrink-0 xl:w-[40vw] xl:max-w-[280px] w-full h-full overflow-hidden",
        "flex flex-col items-center justify-center gap-4 rounded-xl",
        "border border-[var(--border-subtle)] bg-[var(--surface-raised)]",
        "hover:border-[var(--border-default)] hover:bg-[var(--surface-overlay)]",
        "transition-all duration-150",
      )}
    >
      {/* Dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.14) 1.2px, transparent 1.2px),
            radial-gradient(circle, rgba(255,255,255,0.06) 0.7px, transparent 0.7px)
          `,
          backgroundSize: "18px 18px, 9px 9px",
          backgroundPosition: "0 0, 4.5px 4.5px",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 70%, transparent 100%)",
          maskImage:
            "radial-gradient(circle at center, black 70%, transparent 100%)",
        }}
      />

      {/* Moving glare */}
      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          -left-[180%]
          top-[-20%]
          h-[150%]
          w-[70%]
          rotate-[25deg]
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          blur-xl
          transition-transform
          duration-500
          ease-out
          group-hover:translate-x-[450%]
        "
      />

      {/* Icon */}
      <div className="relative z-10 w-12 h-12 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--border-strong)] transition-all duration-300">
        <ArrowRight size={20} />
      </div>

      {/* Text */}
      <div className="relative z-10 text-center">
        <p className="text-sm font-display font-bold text-[var(--text-primary)] tracking-tight">
          View all projects
        </p>
        <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
          {projects.length} total
        </p>
      </div>
    </Link>
  );
}

// ─── Layout A: Phone — single column grid ─────────────────────────────────────

function PhoneLayout() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="py-section px-4">
      <div className="mb-10">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="text-display-md font-display font-black tracking-tighter text-[var(--text-primary)] mt-4">
          Things I&apos;ve built.
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {featured.map((project, i) => (
          <Reveal key={project.id} variant="fade-up" delay={i * 80}>
            <article className="group flex flex-col rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface-raised)]">
              <CardImage
                src={project.image}
                alt={project.title}
                year={project.year}
                repo={project.repo}
                link={project.link}
                priority={i === 0}
                className="h-48"
              />
              <CardContent
                title={project.title}
                description={project.description}
                tags={project.tags}
              />
            </article>
          </Reveal>
        ))}

        {/* Bottom CTA — links to full /projects page */}
        <Reveal variant="fade-up" delay={featured.length * 80}>
          <Link
            href="/projects"
            className="flex items-center justify-between w-full px-5 py-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] hover:border-[var(--border-default)] hover:bg-[var(--surface-overlay)] transition-all duration-300 group"
          >
            <div>
              <p className="text-sm font-display font-bold text-[var(--text-primary)]">
                View all projects
              </p>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                {projects.length} total
              </p>
            </div>
            <ArrowRight
              size={18}
              className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

// ─── Layout B: Tablet — bento grid ───────────────────────────────────────────
// First featured card spans 2 columns, rest fill in.

function TabletLayout() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="py-section px-6">
      <div className="mb-10">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="text-display-md font-display font-black tracking-tighter text-[var(--text-primary)] mt-4">
          Things I&apos;ve built.
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((project, i) => (
          <Reveal
            key={project.id}
            variant="scale-up"
            delay={i * 90}
            className={cn(i === 0 && "col-span-2")}
          >
            <article
              className={cn(
                "group flex overflow-hidden rounded-xl h-full",
                "border border-[var(--border-subtle)] bg-[var(--surface-raised)]",
                "hover:border-[var(--border-default)] transition-all duration-300",
                i === 0 ? "flex-row min-h-72" : "flex-col",
              )}
            >
              <CardImage
                src={project.image}
                alt={project.title}
                year={project.year}
                repo={project.repo}
                link={project.link}
                priority={i < 2}
                className={cn(i === 0 ? "w-[55%] lg:w-[60%] flex-shrink-0" : "h-40")}
              />
              <CardContent
                title={project.title}
                description={
                  i === 0 ? project.longDescription : project.description
                }
                tags={project.tags}
                className={cn(i === 0 && "justify-center")}
              />
            </article>
          </Reveal>
        ))}

        <Reveal variant="scale-up" delay={featured.length * 90}>
          <ShowAllCard />
        </Reveal>

        {/* Bottom CTA — spans full width, links to /projects */}
        {/* <Reveal
          variant="fade-up"
          delay={featured.length * 90}
          className="col-span-2 lg:col-span-3"
        >
          <Link
            href="/projects"
            className="flex lg:hidden items-center justify-between w-full px-6 py-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-raised)] hover:border-[var(--border-default)] hover:bg-[var(--surface-overlay)] transition-all duration-300 group"
          >
            <div>
              <p className="text-sm font-display font-bold text-[var(--text-primary)]">
                View all projects
              </p>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                {projects.length} total
              </p>
            </div>
            <ArrowRight
              size={18}
              className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        </Reveal> */}
      </div>
    </div>
  );
}

// ─── Layout C: Desktop — Horizontal Scroll ───────────────────────────────────────────
// For desktop, we use a horizontal scroll layout where the user scrolls through them horizontally as they scroll down the page.

function DesktopLayout() {
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!sticky || !track) return;

    const onScroll = () => {
      const rect = sticky.getBoundingClientRect();
      // How far into the sticky phase are we? (0 = just entered, 1 = about to exit)
      const parent = sticky.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const scrollableDistance = parent.offsetHeight - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, -parentRect.top / scrollableDistance),
      );
      // Total horizontal distance to travel = full track width minus viewport width
      const maxScroll = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${progress * maxScroll}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featured = projects.filter((p) => p.featured);

  return (
    // Outer wrapper: tall enough that scrolling through it takes time.
    // Height = 100vh (the sticky panel itself) + extra vertical scroll per card.
    <div
      style={{ height: `calc(100vh + ${(featured.length + 1) * 420}px)` }}
      className="relative"
    >
      {/* Sticky panel — pins to top while parent scrolls */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden flex flex-col"
      >
        {/* Section header */}
        <div className="flex-shrink-0 pt-28 pb-4 px-6 max-w-6xl mx-auto w-full">
          <div className="flex items-end justify-between">
            <div>
              <SectionLabel>Projects</SectionLabel>
              <h2 className="text-display-md font-display font-black tracking-tighter text-[var(--text-primary)] mt-4">
                Things I&apos;ve built.
              </h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200"
            >
              All projects
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Horizontal track — cards sit here, transform drives the scroll */}
        <div
          ref={trackRef}
          className="flex-1 flex items-center h-auto"
          style={{
            willChange: "transform",
            transition: "transform 0.05s linear",
          }}
        >
          {/* Left padding so first card starts where content normally would */}
          <div className="flex items-stretch gap-5 h-[60vh] pl-24 pr-16">
            {featured.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
            <ShowAllCard />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      {/* h2 is visually inside the sticky panel but needs to be in the section */}
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>

      {/* Phone: < md */}
      <div className="md:hidden">
        <PhoneLayout />
      </div>

      {/* Tablet: md → lg */}
      <div className="hidden md:block lg:block xl:hidden">
        <TabletLayout />
      </div>

      {/* Desktop: lg+ */}
      <div className="hidden xl:block">
        <DesktopLayout />
      </div>
    </section>
  );
}
