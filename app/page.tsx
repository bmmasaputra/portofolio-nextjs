import { TopNav } from "@/app/components/layout/TopNav";
import { NavDots } from "@/app/components/layout/NavDots";
import { Footer } from "@/app/components/layout/Footer";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { WorkSection } from "@/app/components/sections/WorkSection";
import { ProjectsSection } from "@/app/components/sections/ProjectsSection";
import { ContactSection } from "@/app/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      {/* Texture overlays */}
      <div className="scanline-overlay" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* Navigation */}
      <TopNav />
      <NavDots />

      {/* Skip to main content — accessibility */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-text-primary focus:text-surface-base focus:text-sm focus:font-mono focus:rounded-sm"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
