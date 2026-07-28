import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { TechBadge } from "@/app/components/ui/TechBadge";
import type { Project } from "@/lib/data";

interface ProjectContentProps {
  project: Project;
  index: number;
}

export default function ProjectContent({
  project,
  index,
}: ProjectContentProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="relative flex flex-col">
      {/* Huge background number */}
      <span
        className="
          absolute
          -top-12
          left-0
          select-none
          text-[7rem]
          font-black
          leading-none
          tracking-tighter
          opacity-[0.04]
          md:text-[10rem]
          lg:text-[13rem]
        "
      >
        {number}
      </span>

      {/* Small label */}
      <span
        className="
          font-mono
          text-xs
          uppercase
          tracking-[0.35em]
          text-text-muted
        "
      >
        Featured Project
      </span>

      {/* Title */}
      <h2
        className="
          relative
          mt-5
          text-4xl
          font-black
          tracking-tight
          text-text-primary
          md:text-5xl
          lg:text-6xl
        "
      >
        {project.title}
      </h2>

      {/* Year */}
      <p
        className="
          mt-2
          font-mono
          text-sm
          text-text-muted
        "
      >
        {project.year}
      </p>

      {/* Decorative divider */}
      <div
        className="
          mt-8
          h-px
          w-24
          bg-linear-to-r
          from-(--accent)
          to-transparent
        "
      />

      {/* Overview */}
      <div className="mt-10 space-y-5">
        <div>
          <h3
            className="
              mb-3
              font-mono
              text-xs
              uppercase
              tracking-[0.3em]
              text-text-muted
            "
          >
            Overview
          </h3>

          <p
            className="
              max-w-xl
              text-[15px]
              leading-8
              text-text-secondary
            "
          >
            {project.longDescription}
          </p>
        </div>
      </div>

      {/* Tech */}
      <div className="mt-12">
        <h3
          className="
            mb-4
            font-mono
            text-xs
            uppercase
            tracking-[0.3em]
            text-text-muted
          "
        >
          Built With
        </h3>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <TechBadge key={tag}>{tag}</TechBadge>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mt-12 flex flex-wrap gap-4">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-border-default
              px-5
              py-3
              transition-all
              duration-300
              hover:border-(--accent)
              hover:bg-surface-overlay
            "
          >
            <ExternalLink size={16} />

            <span className="font-medium">Live Website</span>
          </a>
        )}

        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-border-default
              px-5
              py-3
              transition-all
              duration-300
              hover:border-(--accent)
              hover:bg-surface-overlay
            "
          >
            <FaGithub size={16} />

            <span className="font-medium">Source Code</span>
          </a>
        )}
      </div>
    </div>
  );
}
