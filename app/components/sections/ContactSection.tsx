"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/data";
import { SectionLabel } from "@/app/components/ui/SectionLabel";
import { Reveal } from "@/app/components/ui/Reveal";
import { Mail, Send, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { ContactResponse } from "@/types/api";
import { sendContactForm } from "@/lib/services/contact";
import type { ContactForm } from "@/lib/validation/contact";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormErrors = Partial<Record<keyof ContactForm, string>>;

type Status = "idle" | "sending" | "sent" | "error";

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  id,
  error,
  className,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("group/field relative flex flex-col gap-0", className)}>
      {/* Floating label */}
      <label
        htmlFor={id}
        className="text-[10px] font-mono text-text-muted tracking-widest uppercase mb-2 block"
      >
        {label}
      </label>

      {children}

      {/* Animated bottom border — slides in from left on focus */}
      <div className="relative h-px mt-0">
        <div className="absolute inset-0 bg-border-subtle" />
        <div className="absolute inset-0 bg-text-secondary scale-x-0 origin-left transition-transform duration-300 group-focus-within/field:scale-x-100" />
      </div>

      {error && (
        <p className="text-[10px] font-mono text-red-400/80 mt-1.5">{error}</p>
      )}
    </div>
  );
}

// Shared input/textarea base styles — borderless, let Field handle the bottom line
const inputBase = [
  "w-full bg-transparent",
  "px-0 py-2.5",
  "text-sm text-text-primary placeholder:text-text-muted",
  "focus:outline-none",
  "transition-colors duration-200",
].join(" ");

// ─── Contact form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange =
    (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));

      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    setStatus("sending");

    try {
      const result = await sendContactForm(form);

      if (!result.success) {
        switch (result.code) {
          case "VALIDATION_ERROR":
            setErrors({
              name: result.errors?.name?.[0],
              email: result.errors?.email?.[0],
              subject: result.errors?.subject?.[0],
              message: result.errors?.message?.[0],
            });
            setStatus("idle");
            return;

          case "SMTP_ERROR":
            alert(result.message); // Replace later with a toast
            setStatus("error");
            return;

          default:
            alert(result.message);
            setStatus("error");
            return;
        }
      }

      setStatus("sent");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus("error");
      alert("Unable to connect to the server.");
    }
  };

  if (status === "sent") {
    return (
      <div className="h-full flex flex-col items-start justify-center gap-5 py-12">
        <div
          className="w-10 h-10 rounded-full border border-border-default flex items-center justify-center text-text-secondary"
          aria-hidden="true"
        >
          <Send size={16} />
        </div>
        <div>
          <p className="text-text-primary font-display font-black text-2xl tracking-tight mb-2">
            Message received.
          </p>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Thanks for reaching out — I&apos;ll get back to you as soon as
            possible.
          </p>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors duration-200 underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <Field label="Name" id="name" error={errors.name}>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Your name or Organization"
            autoComplete="name"
            className={inputBase}
          />
        </Field>

        <Field label="Email" id="email" error={errors.email}>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="Where can I reach you back?"
            autoComplete="email"
            className={inputBase}
          />
        </Field>
      </div>

      {/* Subject */}
      <Field label="Subject" id="subject" error={errors.subject}>
        <input
          id="subject"
          type="text"
          value={form.subject}
          onChange={handleChange("subject")}
          placeholder="What's this about?"
          className={inputBase}
        />
      </Field>

      {/* Message — textarea, vertical resize only */}
      <Field label="Message" id="message" error={errors.message}>
        <textarea
          id="message"
          value={form.message}
          onChange={handleChange("message")}
          placeholder="I'd love to hear what's on your mind"
          rows={5}
          className={cn(inputBase, "resize-y min-h-30")}
        />
      </Field>

      {/* Submit */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-[10px] font-mono text-text-muted">
          * Required fields
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "group relative overflow-hidden inline-flex items-center gap-2.5",

            "px-6 py-3 rounded-sm",

            "bg-text-primary text-surface-base",

            "font-mono text-sm font-semibold",

            "shadow-sm hover:shadow-xl",

            "hover:-translate-y-0.5 active:translate-y-0",

            "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm",

            "transition-all duration-300 ease-out",
          )}
        >
          {/* Glass glare */}
          <span
            aria-hidden
            className="
            pointer-events-none
            absolute
            inset-y-0
            left-[-140%]
            w-[55%]
            rotate-20
            bg-gradient-to-r
            from-transparent
          via-white/70
            to-transparent
            blur-md
            transition-transform
            duration-700
            ease-[cubic-bezier(.22,1,.36,1)]
            group-hover:translate-x-[420%]
          "
          />

          {status === "sending" ? (
            <>
              <span
                className="relative z-10 w-3.5 h-3.5 rounded-full border-2 border-surface-base/30 border-t-surface-base animate-spin"
                aria-hidden="true"
              />
              <span className="relative z-10">Sending...</span>
            </>
          ) : (
            <>
              <span className="relative z-10">Send message</span>

              <Send
                size={13}
                className="
            relative z-10
            transition-transform
            duration-300
            ease-out
            group-hover:translate-x-1
            group-hover:-translate-y-1
          "
              />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-section px-6 max-w-6xl mx-auto"
      aria-labelledby="contact-heading"
    >
      <Reveal variant="clip-left" duration={700}>
        <SectionLabel>Contact</SectionLabel>
      </Reveal>

      <Reveal variant="fade-up" delay={80}>
        <h2
          id="contact-heading"
          className="text-display-md font-display font-black tracking-tighter text-text-primary mt-4 mb-16"
        >
          Let&apos;s work together.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-4 lg:gap-24 items-start">
        {/* ── Left: info ── */}
        <div className="flex flex-col gap-10">
          <Reveal variant="fade-up" delay={140}>
            <p className="text-text-secondary leading-relaxed">
              I&apos;m open to new opportunities — full-time, contract, or
              interesting side-projects. If you have something in mind, my inbox
              is always open.
            </p>
          </Reveal>

          {/* Direct email — kept prominent */}
          <Reveal variant="fade-up" delay={200}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group inline-flex items-center gap-3 text-display-sm font-display font-black tracking-tighter text-primary border-b-2 border-border-default hover:border-text-primary transition-all duration-200 pb-1"
            >
              <Mail size={24} className="text-text-muted" />
              {siteConfig.email}
              <ArrowUpRight
                size={24}
                className="text-text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
              />
            </a>
          </Reveal>

          <Reveal variant="fade-up" delay={260}>
            <div className="mt-8 pt-4 pb-4 pl-4 pr-4 rounded-lg bg-surface-raised xl:w-120 border border-border-subtle flex flex-col xl:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-xs font-mono text-text-muted tracking-widest uppercase">
                Or find me elsewhere
              </p>

              <div className="flex items-center gap-6">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <FaGithub size={16} />
                  GitHub
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <FaLinkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href={siteConfig.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex items-center gap-2 text-sm font-mono text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  <FaTwitter size={16} />
                  Twitter
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Right: form ── */}
        <Reveal variant="fade-left" delay={180}>
          {/* Form card — subtle surface lift, scanline texture reference */}
          <div className="relative rounded-xl border border-border-subtle bg-surface-raised p-8 overflow-hidden">
            {/* Subtle top-edge glow */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--border-default), transparent)",
              }}
            />

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
