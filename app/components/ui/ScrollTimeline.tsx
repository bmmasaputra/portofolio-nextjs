    "use client";

    import { useEffect, useRef } from "react";
    import { useReducedMotion } from "@/app/hooks/useReducedMotion";

    interface ScrollTimelineProps {
      /** The scrollable container that holds the timeline items */
      containerRef: React.RefObject<HTMLElement | null>;
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
      className,
    }: ScrollTimelineProps) {
      const reducedMotion = useReducedMotion();
      const lineRef = useRef<HTMLDivElement>(null);
      const circleRef = useRef<HTMLDivElement>(null);
      const rafRef = useRef<number>(0);

      // Rendered (lagging) and target (scroll-derived) line height, in px
      const current = useRef(0);
      const target = useRef(0);

      useEffect(() => {
        if (reducedMotion) return;

        // Lower = heavier/slower catch-up. This is the "delay" feel.
        const LERP = 0.045;

        const computeTargetHeight = () => {
          const el = containerRef.current;
          if (!el) return 0;
          const rect = el.getBoundingClientRect();
          const viewportH = window.innerHeight;
          const viewportCenter = viewportH / 2;

          // Where would viewport-center land, in container-local coordinates?
          const idealY = viewportCenter - rect.top;

          // Clamp so the line never grows past the container's actual height,
          // and never goes negative before the container is reached.
          return Math.min(rect.height, Math.max(0, idealY));
        };

        const loop = () => {
          target.current = computeTargetHeight();

          // Lerp the rendered height toward target — the "delay"
          current.current += (target.current - current.current) * LERP;

          if (lineRef.current) {
            lineRef.current.style.height = `${current.current}px`;
          }
          if (circleRef.current) {
            circleRef.current.style.transform = `translateY(${current.current}px)`;
            circleRef.current.style.opacity = current.current > 2 ? "1" : "0";
          }

          rafRef.current = requestAnimationFrame(loop);
        };

        rafRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafRef.current);
      }, [containerRef, reducedMotion]);

      // Reduced motion: render the line fully drawn, static, no animation
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
          {/* Faint full-height track — always visible, shows the full path */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border-subtle" />

          {/* The growing line — lags behind the viewport-center target via rAF + lerp */}
          <div
            ref={lineRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-text-secondary"
            style={{ height: 0 }}
          />

          {/* Circle marker — glued to the tip of the line, no independent motion */}
          <div
            ref={circleRef}
            className="absolute left-1/2 top-0 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-text-primary opacity-0 z-100"
            style={{
              boxShadow:
                "0 0 0 4px rgba(250,250,250,0.08), 0 0 12px rgba(250,250,250,0.25)",
              transition: "opacity 0.4s ease",
            }}
          />
        </div>
      );
    }
