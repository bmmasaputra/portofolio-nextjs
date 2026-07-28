import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";
import ProjectsGallery from "./components/ProjectsGallery";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: `Selected works by ${siteConfig.name}`,
};

export default function ProjectsPage() {
  return (
    <main className="relative overflow-x-hidden bg-[var(--surface-base)] text-[var(--text-primary)]">
      {/* Global background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-18rem]
            h-[42rem]
            w-[42rem]
            -translate-x-1/2
            rounded-full
            blur-[140px]
            opacity-40
          "
          style={{
            background:
              "radial-gradient(circle, rgba(20,71,230,.35) 0%, transparent 70%)",
          }}
        />

        {/* Bottom glow */}
        <div
          className="
            absolute
            bottom-[-24rem]
            right-[-12rem]
            h-[44rem]
            w-[44rem]
            rounded-full
            blur-[160px]
            opacity-20
          "
          style={{
            background:
              "radial-gradient(circle, rgba(20,71,230,.4) 0%, transparent 70%)",
          }}
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.03]
          "
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-36">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
          Everything I&apos;ve built
        </span>

        <h1
          className="
            mt-5
            max-w-5xl
            text-6xl
            font-black
            leading-[0.9]
            tracking-tight
            md:text-8xl
          "
        >
          Building digital
          <br />
          experiences with
          <br />
          <strong>intention</strong>.
        </h1>

        <p
          className="
            mt-8
            max-w-2xl
            text-lg
            leading-relaxed
            text-[var(--text-secondary)]
          "
        >
          A full archive of projects — personal, team competition, coursework, and professional
          work.
        </p>

        <div className="mt-20 flex items-center gap-6">
          <div className="h-px w-24 bg-[var(--border-default)]" />

          <span className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--text-muted)]">
            Scroll to Explore
          </span>
        </div>
      </section>

      {/* Gallery */}
      <ProjectsGallery />
    </main>
  );
}