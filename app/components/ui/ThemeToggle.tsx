"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      title={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-sm",
        "border border-border-default text-text-secondary",
        "hover:border-border-strong hover:text-text-primary",
        "transition-all duration-200 cursor-pointer",
        showLabel ? "px-3 py-1.5 text-xs font-mono" : "w-8 h-8",
        className
      )}
    >
      {mounted ? (
        <>
          {theme === "dark" ? (
            <Sun size={15} className="transition-transform duration-200 hover:rotate-45" />
          ) : (
            <Moon size={15} className="transition-transform duration-200 hover:-rotate-12" />
          )}
          {showLabel && (
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          )}
        </>
      ) : (
        <span className="w-3.5 h-3.5" aria-hidden="true" />
      )}
    </button>
  );
}
