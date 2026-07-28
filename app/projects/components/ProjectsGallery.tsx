"use client";

import { projects } from "@/lib/data";

import ProjectSection from "./ProjectSection";
import ProjectProgress from "./ProjectProgress";

export default function ProjectsGallery() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-40">
      <div className="space-y-40 md:space-y-56 lg:space-y-72">
        {projects.map((project, index) => (
          <ProjectSection
            key={project.id}
            project={project}
            index={index}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}
