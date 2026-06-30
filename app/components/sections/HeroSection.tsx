"use client";

import { useEffect, useRef, useCallback } from "react";
import { ArrowDownRight } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";

// ─── Dot Grid Canvas Background ───────────────────────────────────────────────

function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const DOT_SPACING = 28;
    const DOT_RADIUS = 1;
    const INFLUENCE_RADIUS = 140;
    const MAX_DISPLACEMENT = 10;

    let cols = 0;
    let rows = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      cols = Math.ceil(canvas.offsetWidth / DOT_SPACING) + 2;
      rows = Math.ceil(canvas.offsetHeight / DOT_SPACING) + 2;
    };

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * DOT_SPACING;
          const baseY = r * DOT_SPACING;

          const dx = baseX - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let dotX = baseX;
          let dotY = baseY;
          let opacity = 0.18;

          if (dist < INFLUENCE_RADIUS && dist > 0) {
            const strength = (1 - dist / INFLUENCE_RADIUS);
            const angle = Math.atan2(dy, dx);
            // Push dots AWAY from cursor
            dotX += Math.cos(angle) * strength * MAX_DISPLACEMENT;
            dotY += Math.sin(angle) * strength * MAX_DISPLACEMENT;
            // Dots near cursor brighten slightly
            opacity = 0.18 + strength * 0.32;
          }

          ctx.beginPath();
          ctx.arc(dotX, dotY, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(250, 250, 250, ${opacity})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Only track while mouse is inside the hero section bounds
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      } else {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}

// ─── Photo Card with 3D tilt ──────────────────────────────────────────────────

function PhotoCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const card = cardRef.current;
      const glare = glareRef.current;
      if (!card || !glare) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Max ±12deg tilt
      const rotateY = ((x - cx) / cx) * 12;
      const rotateX = -((y - cy) / cy) * 12;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

      // Glare position
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      glare.style.opacity = "1";
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card || !glare) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    glare.style.opacity = "0";
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Decorative geometric rings behind the card */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {/* Outer dashed ring */}
        <div
          className="absolute rounded-full border border-dashed border-border-subtle"
          style={{ width: "110%", height: "110%", animation: "spin 30s linear infinite" }}
        />
        {/* Inner solid ring */}
        <div
          className="absolute rounded-full border border-border-subtle"
          style={{ width: "90%", height: "90%" }}
        />
        {/* Corner accent dots */}
        {[
          { top: "6%", left: "6%" },
          { top: "6%", right: "6%" },
          { bottom: "6%", left: "6%" },
          { bottom: "6%", right: "6%" },
        ].map((style, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-border-strong"
            style={style}
          />
        ))}
      </div>

      {/* The tiltable photo card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-64 h-80 md:w-72 md:h-96"
        style={{
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Corner brackets */}
        {[
          "top-0 left-0 border-t border-l",
          "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l",
          "bottom-0 right-0 border-b border-r",
        ].map((cls, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`absolute w-5 h-5 ${cls} border-text-secondary z-10`}
          />
        ))}

        {/* Photo */}
        <div className="absolute inset-2 overflow-hidden bg-surface-overlay">
          <Image
            src={siteConfig.photo}
            alt={`Portrait of ${siteConfig.name}`}
            fill
            sizes="(max-width: 768px) 256px, 288px"
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
            onError={(e) => {
              // Fallback: hide broken img, show placeholder
              (e.target as HTMLImageElement).style.display = "none";
            }}
            priority
          />
          {/* Placeholder shown when no photo — remove once you add your photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-border-strong"
            style={{ zIndex: -1 }}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="18" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M6 42c0-9.941 8.059-18 18-18s18 8.059 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-xs font-mono tracking-widest uppercase">
              Add photo.jpg to /public
            </span>
          </div>

          {/* Glare overlay */}
          <div
            ref={glareRef}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none transition-opacity duration-200"
            style={{ opacity: 0 }}
          />

          {/* Bottom gradient + label */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-surface-base/90 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <p className="text-xs font-mono text-text-muted tracking-widest uppercase">
              {siteConfig.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Hero Section ─────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated dot grid — covers full hero */}
      <DotGrid />

      {/* Radial glow at top */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Vignette at bottom to blend into next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-surface-base to-transparent pointer-events-none z-10"
      />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto w-full px-6 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* ── Left: Text ── */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 border border-border-subtle rounded-full backdrop-blur-sm">
              <span
                className="w-1.5 h-1.5 rounded-full bg-text-secondary animate-pulse"
                aria-hidden="true"
              />
              <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
                Available for work
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-display-lg font-display font-black tracking-tighter text-text-primary mb-6 leading-none">
              <span className="cursor-blink">{siteConfig.name}</span>
              <br />
              <span className="text-text-muted">{siteConfig.role}</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-text-secondary max-w-lg mb-12 leading-relaxed font-light">
              {siteConfig.tagline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-surface-base font-mono text-sm font-semibold hover:bg-text-accent transition-colors duration-200 rounded-sm"
              >
                View my work
                <ArrowDownRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border-default text-text-secondary font-mono text-sm hover:border-border-strong hover:text-text-primary transition-all duration-200 rounded-sm"
              >
                Get in touch
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
                Find me on
              </span>
              <div className="h-px w-8 bg-border-subtle" aria-hidden="true" />
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={siteConfig.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
                className="text-text-muted hover:text-text-primary transition-colors duration-200"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* ── Right: Photo ── */}
          <div className="flex justify-center lg:justify-end">
            <PhotoCard />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted z-20"
        aria-hidden="true"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-border-default to-transparent" />
      </div>
    </section>
  );
}