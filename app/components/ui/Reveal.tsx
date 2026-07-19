"use client";

import { useReveal } from "@/app/hooks/useReveal";
import { cn } from "@/lib/utils";
import { JSX } from "react/jsx-runtime";

type RevealVariant =
  | "fade-up"      // fade in + slide up (default)
  | "fade-down"    // fade in + slide down
  | "fade-left"    // fade in + slide from left
  | "fade-right"   // fade in + slide from right
  | "fade"         // pure fade, no movement
  | "scale-up"     // scale from 95% + fade
  | "clip-left";   // clip-path reveal from left (for section labels, lines)

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

// Base hidden styles per variant (before visible)
const hiddenStyles: Record<RevealVariant, React.CSSProperties> = {
  "fade-up":    { opacity: 0, transform: "translateY(28px)" },
  "fade-down":  { opacity: 0, transform: "translateY(-20px)" },
  "fade-left":  { opacity: 0, transform: "translateX(-28px)" },
  "fade-right": { opacity: 0, transform: "translateX(28px)" },
  "fade":       { opacity: 0 },
  "scale-up":   { opacity: 0, transform: "scale(0.94)" },
  "clip-left":  { clipPath: "inset(0 100% 0 0)", opacity: 0 },
};

// Visible styles (after reveal)
const visibleStyles: Record<RevealVariant, React.CSSProperties> = {
  "fade-up":    { opacity: 1, transform: "translateY(0)" },
  "fade-down":  { opacity: 1, transform: "translateY(0)" },
  "fade-left":  { opacity: 1, transform: "translateX(0)" },
  "fade-right": { opacity: 1, transform: "translateX(0)" },
  "fade":       { opacity: 1 },
  "scale-up":   { opacity: 1, transform: "scale(1)" },
  "clip-left":  { clipPath: "inset(0 0% 0 0)", opacity: 1 },
};

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.12,
  className,
  as: Tag = "div",
}: RevealProps) {
  const { ref, visible } = useReveal({ delay, threshold });

  const style: React.CSSProperties = {
    ...(visible ? visibleStyles[variant] : hiddenStyles[variant]),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1),
                 transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1),
                 clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: `${delay}ms`,
    willChange: "opacity, transform",
  };

  return (
    // @ts-expect-error — dynamic tag typing
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
}

// ─── Stagger container ────────────────────────────────────────────────────────
// Wraps multiple children and staggers them automatically.
// Each direct child gets an increasing delay.

interface StaggerProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  staggerMs?: number;
  baseDelay?: number;
  threshold?: number;
  className?: string;
}

export function Stagger({
  children,
  variant = "fade-up",
  staggerMs = 80,
  baseDelay = 0,
  threshold = 0.1,
  className,
}: StaggerProps) {
  const { ref, visible } = useReveal({ threshold, delay: baseDelay });

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                ...(visible
                  ? visibleStyles[variant]
                  : hiddenStyles[variant]),
                transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
                             transform 600ms cubic-bezier(0.16, 1, 0.3, 1)`,
                transitionDelay: `${baseDelay + i * staggerMs}ms`,
                willChange: "opacity, transform",
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
