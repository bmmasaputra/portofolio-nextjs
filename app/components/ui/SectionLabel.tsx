import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="w-4 h-px bg-border-strong" aria-hidden="true" />
      <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
        {children}
      </span>
    </div>
  );
}
