"use client";

import { cn } from "@/lib/utils";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { navItems } from "@/lib/data";

const sectionIds = navItems.map((item) => item.href.replace("#", ""));

export function NavDots() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
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
            {/* Dot */}
            <span
              className={cn(
                "block rounded-full transition-all duration-300",
                isActive
                  ? "w-5 h-[2px] bg-text-primary"
                  : "w-[6px] h-[6px] bg-border-strong group-hover:bg-text-muted"
              )}
            />
            {/* Label — only visible on hover */}
            <span
              className={cn(
                "text-xs font-mono tracking-widest uppercase transition-all duration-200",
                isActive
                  ? "text-text-secondary opacity-100 translate-x-0"
                  : "text-text-muted opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
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
