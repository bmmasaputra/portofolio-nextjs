"use client";

import { useEffect, useRef, useState } from "react";
import { skillIconMap } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";

interface MarqueeColumnProps {
  items: string[];
  category: string;
  direction?: "up" | "down";
  /** Pixels per second — using speed instead of fixed duration so columns
      with different content heights still feel consistent. */
  pixelsPerSecond?: number;
  className?: string;
}

function SkillIcon({ skill }: { skill: string }) {
  const Icon = skillIconMap[skill];
  return (
    <div className="group/icon flex flex-col items-center gap-2 px-2" title={skill}>
      <span className="flex items-center justify-center w-9 h-9 text-text-primary group-hover/icon:text-text-primary transition-colors duration-300">
        {Icon ? <Icon size={22} /> : <Code2 size={22} />}
      </span>
      <span className="text-[10px] font-mono text-text-secondary group-hover/icon:text-text-primary transition-colors duration-300 text-center leading-tight max-w-[72px]">
        {skill}
      </span>
    </div>
  );
}

export function MarqueeColumn({
  items,
  category,
  direction = "up",
  pixelsPerSecond = 18,
  className,
}: MarqueeColumnProps) {
  const setRef = useRef<HTMLDivElement>(null);
  const [setHeight, setSetHeight] = useState(0);

  // Measure the actual rendered height of ONE set of items.
  // This guarantees the loop distance always matches real content,
  // regardless of how many items are in this particular column.
  useEffect(() => {
    const measure = () => {
      if (setRef.current) {
        setSetHeight(setRef.current.offsetHeight);
      }
    };
    measure();

    // Re-measure on resize/font-load, since icon/text height can shift
    const ro = new ResizeObserver(measure);
    if (setRef.current) ro.observe(setRef.current);
    return () => ro.disconnect();
  }, [items]);

  // Duration derived from actual measured height — keeps visual speed
  // consistent across columns with different item counts.
  const duration = setHeight > 0 ? setHeight / pixelsPerSecond : 20;

  return (
    <div className={cn("flex flex-col items-center group", className)}>
      {/* Category title — static, doesn't scroll */}
      <span className="text-[10px] font-mono text-text-muted tracking-widest uppercase mb-4 text-center">
        {category}
      </span>

      {/* Scroll viewport */}
      <div
        className="relative h-[420px] w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        {/* Only animate once we know the real height — prevents the
            "empty then dump" flash on first paint */}
        <div
          className="absolute inset-x-0 top-0 flex flex-col items-center gap-7 group-hover:[animation-play-state:paused]"
          style={
            setHeight > 0
              ? {
                  animationName: direction === "up" ? "marquee-col-up-px" : "marquee-col-down-px",
                  animationDuration: `${duration}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  // Custom property feeds the keyframe the real pixel distance
                  ["--marquee-distance" as string]: `${setHeight}px`,
                }
              : { opacity: 0 }
          }
        >
          {/* Set 1 — measured */}
          <div ref={setRef} className="flex flex-col items-center gap-7">
            {items.map((skill, i) => (
              <SkillIcon key={`a-${skill}-${i}`} skill={skill} />
            ))}
          </div>
          {/* Set 2 — duplicate, fills the gap as set 1 scrolls out */}
          <div className="flex flex-col items-center gap-7">
            {items.map((skill, i) => (
              <SkillIcon key={`b-${skill}-${i}`} skill={skill} />
            ))}
          </div>
          {/* Set 3 — buffer, ensures no gap appears for "down" direction
              which starts pre-scrolled into negative space */}
          <div className="flex flex-col items-center gap-7">
            {items.map((skill, i) => (
              <SkillIcon key={`c-${skill}-${i}`} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
