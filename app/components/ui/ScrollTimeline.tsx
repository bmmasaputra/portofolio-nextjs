"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

interface ScrollTimelineProps {
  /** The scrollable container that holds the timeline items */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Refs to each item dot — filled white as the ball passes them */
  dotRefs?: React.RefObject<HTMLDivElement | null>[];
  className?: string;
}

/**
 * Renders a vertical line that grows downward as you scroll, with a
 * circle marker sitting at the growing tip.
 *
 * The line's growth target is the viewport-center position (so the tip
 * naturally tracks near the center of the screen while the timeline is
 * taller than the viewport). The RENDERED line height lags behind that
 * target via lerp — like a heavy object catching up, no overshoot.
 *
 * The circle has no independent motion of its own — it's just glued to
 * whatever height the line currently has.
 */
export function ScrollTimeline({
  containerRef,
  dotRefs = [],
  className,
}: ScrollTimelineProps) {
  const reducedMotion = useReducedMotion();
  const lineRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const current = useRef(0);
  const target = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    const LERP = 0.045;

    const computeTargetHeight = () => {
      const el = containerRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const idealY = viewportH / 2 - rect.top;
      return Math.min(rect.height, Math.max(0, idealY));
    };

    const loop = () => {
      target.current = computeTargetHeight();
      current.current += (target.current - current.current) * LERP;

      if (lineRef.current) {
        lineRef.current.style.height = `${current.current}px`;
      }

      if (circleRef.current) {
        circleRef.current.style.transform = `translateY(${current.current}px)`;
        circleRef.current.style.opacity = current.current > 2 ? "1" : "0";
      }

      // ── Fill dots that the ball has passed ──────────────────────────────
      // Each dot's vertical position within the container is computed from
      // its offsetTop relative to the container element.
      const container = containerRef.current;
      if (container) {
        dotRefs.forEach((dotRef) => {
          const dot = dotRef.current;
          if (!dot) return;

          // offsetTop of the dot relative to the timeline container
          const dotY =
            dot.getBoundingClientRect().top -
            container.getBoundingClientRect().top;
          const passed = current.current > dotY;

          if (passed) {
            dot.style.backgroundColor = "var(--text-primary)";
            dot.style.borderColor = "var(--text-primary)";
          } else {
            dot.style.backgroundColor = "var(--surface-base)";
            dot.style.borderColor = "var(--border-default)";
          }
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [containerRef, dotRefs, reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0 }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border-default" />
      </div>
    );
  }

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0 }}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border-subtle" />
      <div
        ref={lineRef}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-text-secondary"
        style={{ height: 0 }}
      />
      <div
        ref={circleRef}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-text-primary opacity-0 z-20"
        style={{
          boxShadow:
            "0 0 0 4px var(--timeline-circle-ring), 0 0 12px var(--timeline-circle-glow)",
          transition: "opacity 0.4s ease",
        }}
      />
    </div>
  );
}