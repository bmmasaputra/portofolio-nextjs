"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";

import type { Project } from "@/lib/data";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";

interface Props {
  project: Project;
  priority?: boolean;
}

export default function ProjectShowcase({ project, priority = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Translation amount changes depending on device
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion
      ? [0, 0]
      : isDesktop
        ? [16, -16] // desktop float
        : [60, -60], // mobile parallax
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [0.94, 1, 0.94],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.45, 1, 1, 0.45],
  );

  const glowScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.9, 1.15],
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : isDesktop ? [-0.8, 0, 0.8] : [0, 0, 0],
  );

  const stickyClass = useMemo(
    () => (isDesktop ? "lg:sticky lg:top-24" : ""),
    [isDesktop],
  );

  return (
    <div ref={ref} className="relative">
      <div className={stickyClass}>
        {/* Ambient Glow */}

        <motion.div
          style={{
            scale: glowScale,
          }}
          className="
            absolute
            inset-0
            -z-20
            rounded-full
            blur-[140px]
          "
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `radial-gradient(circle, ${project.accentGlow} 0%, transparent 70%)`,
            }}
          />
        </motion.div>

        {/* Decorative Ring */}

        <motion.div
          style={{
            scale,
            opacity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            -z-10
            h-[430px]
            w-[430px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-white/5
          "
        />

        {/* Showcase */}

        <motion.div
          style={{
            y,
            scale,
            rotate,
            opacity,
          }}
        >
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={1200}
            priority={priority}
            className="
              w-full
              object-contain
              drop-shadow-[0_60px_120px_rgba(0,0,0,.45)]
              select-none
            "
            draggable={false}
          />
        </motion.div>
      </div>
    </div>
  );
}
