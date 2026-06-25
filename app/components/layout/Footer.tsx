import { siteConfig } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle mt-8 px-6 py-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs font-mono text-text-muted">
          © {year} {siteConfig.name}. Built with Next.js & Tailwind CSS.
        </p>
        <p className="text-xs font-mono text-text-muted">
          Designed & developed by{" "}
          <span className="text-text-secondary">{siteConfig.name}</span>
        </p>
      </div>
    </footer>
  );
}
