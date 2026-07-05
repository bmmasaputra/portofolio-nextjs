// ─── Types ────────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  year: string;
  image: string;
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
  bio: "Full-stack engineer with hands-on experience building production web applications through internships, apprenticeship programs, and freelance work. I care deeply about performance, developer experience, and writing code that's clean, scalable, and easy to maintain.",
  location: "Remote — Open to opportunities",
  email: "bimagung2203@gmail.com",
  github: "https://github.com/bmmasaputra",
  linkedin: "https://linkedin.com/in/bima-saputra-462160247/",
  twitter: "https://x.com/bmmasaputra",
  photo: "/photo.png",
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
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=1200&q=80",
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
    image:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80",
    repo: "https://github.com/alexrivera/deploy-cli",
    featured: true,
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Freelancer",
    role: "Full-stack Web Dev",
    period: "2025 — Present",
    description:
      "Working on the Edge Runtime team. Shipped improvements to the V8 isolate startup path, reducing cold-start latency by 40%. Led the migration of internal tooling from CRA to Turbopack.",
    stack: ["Rust", "TypeScript", "V8", "Next.js"],
  },
  {
    id: "exp-2",
    company: "Directorate of Student Affairs UPR",
    role: "Intern Web Dev",
    period: "2025",
    description:
      "Built real-time collaboration features using CRDTs and Yjs. Owned the notification system, redesigning it to handle 200K+ daily active users with zero cold notifications.",
    stack: ["TypeScript", "React", "Yjs", "GraphQL", "PostgreSQL"],
  },
  {
    id: "exp-3",
    company: "Bangkit Academy",
    role: "Cloud Engineer Apprentice",
    period: "2024",
    description:
      "Worked on the Dashboard team. Migrated the revenue reporting pipeline to streaming aggregation, reducing nightly job runtime from 6 hours to under 15 minutes.",
    stack: ["Ruby", "React", "Kafka", "Spark"],
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "PHP", "Python", "Java", "C++"],
  },
  {
    category: "Frontend",
    items: [
      "React",
      "Next.js",
      "Vite",
      "Framer Motion",
      "Tailwind CSS",
      "Filament",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Hono.js",
      "FastAPI",
      "Laravel",
      "Express.js",
      "Prisma",
      "SQL Databases",
    ],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "GCP", "AWS", "Terraform", "Grafana", "Vercel"],
  },
];
