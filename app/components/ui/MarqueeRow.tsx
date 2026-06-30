"use client";

import { skillIconMap } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";
import { Code2 } from "lucide-react";

interface MarqueeRowProps {
  items: string[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speedDuration: Record<NonNullable<MarqueeRowProps["speed"]>, string> = {
  slow: "38s",
  normal: "26s",
  fast: "16s",
};

export function MarqueeRow({
  items,
  direction = "left",
  speed = "normal",
  className,
}: MarqueeRowProps) {
  // Duplicate items so the loop is seamless (track scrolls -50%, second copy fills the gap)
  const loopedItems = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden group/row",
        "[mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div
        className="flex gap-3 w-max group-hover/row:[animation-play-state:paused]"
        style={{
          animationName: `marquee-${direction}`,
          animationDuration: speedDuration[speed],
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {loopedItems.map((skill, i) => {
          const Icon = skillIconMap[skill];

          return (
            <div
              key={`${skill}-${i}`}
              className={cn(
                "group flex items-center gap-2.5 px-4 py-2.5 flex-shrink-0",
                "border border-border-subtle rounded-full bg-surface-raised",
                "hover:border-border-strong hover:bg-surface-overlay",
                "transition-colors duration-300"
              )}
            >
              <span
                className={cn(
                  "text-text-muted group-hover:text-text-primary transition-colors duration-300",
                  "flex items-center justify-center"
                )}
                aria-hidden="true"
              >
                {Icon ? <Icon size={16} /> : <Code2 size={16} />}
              </span>
              <span className="text-sm font-mono text-text-secondary group-hover:text-text-primary transition-colors duration-300 whitespace-nowrap">
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
