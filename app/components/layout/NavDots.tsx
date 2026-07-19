"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { navItems } from "@/lib/data";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

const SHIFT_UP = -210;
const SHIFT_DOWN = -SHIFT_UP;
const LERP = 0.6;
const ENTER_BUFFER = 550;
const EXIT_BUFFER = 340;

// fading in and out parameter now no longer needed since the can be bind to enter buffer and exit buffer

export function NavDots() {
  const activeSection = useActiveSection(sectionIds);
  const navRef = useRef<HTMLElement>(null);
  const prevRectTop = useRef<number | null>(null);

  const current = useRef(0);
  const target = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const loop = () => {
      const el = navRef.current;
      const projectsEl = document.getElementById("projects");

     if (el && projectsEl) {
       const rect = projectsEl.getBoundingClientRect();
       const vh = window.innerHeight;
       
       // ── Track scroll direction ────────────────────────────────────────────
       // prevRectTop starts as null — initialize it on first frame
       const prevTop = prevRectTop.current;
       const scrollingDown = prevTop === null || rect.top < prevTop;
       const scrollingUp = prevTop !== null && rect.top > prevTop;

       const enteringFromAbove = rect.top < vh - ENTER_BUFFER;
       const exitingFromBelow = rect.bottom < EXIT_BUFFER;
       const inProjects = enteringFromAbove && !exitingFromBelow;
       prevRectTop.current = rect.top;

       // ── Shift Motion ────────────────────
       // Shift direction based on scroll direction and whether the section is in view
       if (inProjects && scrollingDown) {
          target.current = SHIFT_UP;
       }
       else if (inProjects && scrollingUp) {
         target.current = SHIFT_DOWN;
       }
       else if (!inProjects) {
         target.current = 0;
       }

       // ── Position lerp ────────────────────────────────────────────────────
       current.current += (target.current - current.current) * LERP;
       if (Math.abs(target.current - current.current) < 0.1) {
         current.current = target.current;
       }

       // ── Opacity ──────────────────────────────────────────────────────────
       const positionSettled = Math.abs(current.current) < 4;
       const opacity = inProjects ? 0 : positionSettled ? 1 : 0;

       el.style.opacity = String(opacity);
       el.style.transition = "opacity 0.4s ease";

       const centered = vh / 2 - el.offsetHeight / 2;
       el.style.top = `${centered + current.current}px`;
     }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Page sections"
      className="fixed left-6 z-50 hidden lg:flex flex-col gap-4"
      style={{ top: "50%" }}
    >
      {navItems.map((item) => {
        const id = item.href.replace("#", "");
        const isActive = activeSection === id;

        return (
          <a
            key={id}
            href={item.href}
            aria-label={`Navigate to ${item.label}`}
            aria-current={isActive ? "location" : undefined}
            className="group flex items-center gap-3"
          >
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive
                  ? "w-5 h-[2px] bg-text-primary"
                  : "w-[6px] h-[6px] bg-border-strong group-hover:bg-text-muted",
              )}
            />
            <span
              className={cn(
                "text-xs font-mono tracking-widest uppercase transition-all duration-200",
                isActive
                  ? "text-text-secondary opacity-100 translate-x-0"
                  : "text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
              )}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
