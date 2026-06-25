import { cn } from "@/lib/utils";

interface TechBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-xs font-mono text-text-muted",
        "border border-border-subtle rounded-sm",
        "hover:border-border-default hover:text-text-secondary transition-colors duration-150",
        className
      )}
    >
      {children}
    </span>
  );
}
