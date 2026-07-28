"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import { projects } from "@/lib/data";

export default function ProjectProgress() {
  const [active, setActive] = useState(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", () => {
    const sections = document.querySelectorAll<HTMLElement>(
      "[data-project-section]",
    );

    let current = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();

      if (rect.top <= window.innerHeight * 0.35) {
        current = index;
      }
    });

    setActive(current);
  });

  return (
    <aside
      className="
        fixed
        left-10
        top-1/2
        z-50
        hidden
        -translate-y-1/2
        lg:flex
        flex-col
      "
    >
      <span
        className="
          mb-8
          text-[10px]
          uppercase
          tracking-[0.4em]
          text-[var(--text-muted)]
          font-mono
        "
      >
        PROJECTS
      </span>

      <div className="flex flex-col gap-6">
        {projects.map((project, index) => {
          const isActive = index === active;

          return (
            <button
              key={project.id}
              onClick={() =>
                document.getElementById(project.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="
                group
                flex
                items-center
                gap-4
              "
            >
              <motion.div
                animate={{
                  width: isActive ? 28 : 12,
                  backgroundColor: isActive
                    ? project.accent
                    : "rgba(255,255,255,.18)",
                }}
                transition={{
                  duration: 0.35,
                }}
                className="h-px rounded-full"
              />

              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  x: isActive ? 0 : -4,
                }}
                className="
                  font-mono
                  text-xs
                "
              >
                {String(index + 1).padStart(2, "0")}
              </motion.span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
