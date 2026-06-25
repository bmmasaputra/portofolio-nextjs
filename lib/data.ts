// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  link?: string;
  repo?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  stack: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Bima Saputra",
  role: "Software Engineer",
  tagline: "I build systems that scale and interfaces that matter.",
  bio: "Full-stack engineer with 5+ years shipping production software. I care deeply about performance, developer experience, and the craft of writing code that other people can actually maintain.",
  location: "Remote — Open to opportunities",
  email: "alex@example.dev",
  github: "https://github.com/alexrivera",
  linkedin: "https://linkedin.com/in/alexrivera",
  twitter: "https://twitter.com/alexrivera",
} as const;

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "infra-dashboard",
    title: "Infra Dashboard",
    description:
      "Real-time infrastructure monitoring with sub-100ms latency alerts.",
    longDescription:
      "A production-grade observability platform processing 50M+ events/day. Built with a CQRS architecture, WebSocket event streaming, and a custom query DSL for alerting rules.",
    tags: ["Next.js", "Go", "Kafka", "ClickHouse", "WebSocket"],
    year: "2024",
    link: "https://example.com",
    repo: "https://github.com/alexrivera/infra-dashboard",
    featured: true,
  },
  {
    id: "vector-search",
    title: "Semantic Search Engine",
    description:
      "Vector similarity search over 10M+ documents with hybrid ranking.",
    longDescription:
      "Combines BM25 lexical search with dense vector retrieval using pgvector. Built a custom re-ranking pipeline with cross-encoder models, serving p99 latency under 200ms.",
    tags: ["Python", "FastAPI", "pgvector", "PostgreSQL", "Redis"],
    year: "2024",
    repo: "https://github.com/alexrivera/semantic-search",
    featured: true,
  },
  {
    id: "design-system",
    title: "Component Library",
    description:
      "Accessible, headless UI primitives used across 3 production apps.",
    longDescription:
      "A zero-dependency component library built on Radix UI primitives with full WAI-ARIA compliance. Includes automated visual regression tests and Storybook documentation.",
    tags: ["TypeScript", "Radix UI", "Storybook", "Vitest"],
    year: "2023",
    repo: "https://github.com/alexrivera/ui",
    featured: true,
  },
  {
    id: "cli-tool",
    title: "Deploy CLI",
    description: "A zero-config deployment tool for containerized Node apps.",
    longDescription:
      "CLI that wraps Docker + cloud provider APIs to give a Heroku-like experience for self-hosted environments. Handles secrets injection, health checks, and rollback.",
    tags: ["Node.js", "Docker", "AWS SDK", "Ink"],
    year: "2023",
    repo: "https://github.com/alexrivera/deploy-cli",
    featured: false,
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Vercel",
    role: "Senior Software Engineer",
    period: "2023 — Present",
    description:
      "Working on the Edge Runtime team. Shipped improvements to the V8 isolate startup path, reducing cold-start latency by 40%. Led the migration of internal tooling from CRA to Turbopack.",
    stack: ["Rust", "TypeScript", "V8", "Next.js"],
  },
  {
    id: "exp-2",
    company: "Linear",
    role: "Software Engineer",
    period: "2021 — 2023",
    description:
      "Built real-time collaboration features using CRDTs and Yjs. Owned the notification system, redesigning it to handle 200K+ daily active users with zero cold notifications.",
    stack: ["TypeScript", "React", "Yjs", "GraphQL", "PostgreSQL"],
  },
  {
    id: "exp-3",
    company: "Stripe",
    role: "Software Engineer",
    period: "2019 — 2021",
    description:
      "Worked on the Dashboard team. Migrated the revenue reporting pipeline to streaming aggregation, reducing nightly job runtime from 6 hours to under 15 minutes.",
    stack: ["Ruby", "React", "Kafka", "Spark"],
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Go", "Python", "Rust", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "WebGL"],
  },
  {
    category: "Backend",
    items: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Kubernetes", "AWS", "Terraform", "Grafana"],
  },
];
