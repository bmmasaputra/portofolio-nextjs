import type { IconType } from "react-icons";
import {
  // Languages
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiPython,
  SiCplusplus,
  // Frontend
  SiReact,
  SiNextdotjs,
  SiVite,
  SiFramer,
  SiTailwindcss,
  // Backend
  SiNodedotjs,
  SiHono,
  SiFastapi,
  SiLaravel,
  SiExpress,
  SiPrisma,
  SiMysql,
  // Infrastructure
  SiDocker,
  SiGooglecloud,
  SiTerraform,
  SiGrafana,
  SiVercel,
  SiFilament
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { TbBrandPhp } from "react-icons/tb";

/**
 * Maps a skill name (as it appears in src/lib/data.ts) to its icon component.
 * Falls back to a generic code icon if no match is found.
 */
export const skillIconMap: Record<string, IconType> = {
  // Languages
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  Python: SiPython,
  Java: FaJava,
  "C++": SiCplusplus,

  // Frontend
  React: SiReact,
  "Next.js": SiNextdotjs,
  Vite: SiVite,
  "Framer Motion": SiFramer,
  "Tailwind CSS": SiTailwindcss,
  Filament: SiFilament, // Filament is a Laravel admin panel — no dedicated simple-icon yet

  // Backend
  "Node.js": SiNodedotjs,
  "Hono.js": SiHono,
  FastAPI: SiFastapi,
  Laravel: SiLaravel,
  "Express.js": SiExpress,
  Prisma: SiPrisma,
  "SQL Databases": SiMysql,

  // Infrastructure
  Docker: SiDocker,
  GCP: SiGooglecloud,
  AWS: FaAws,
  Terraform: SiTerraform,
  Grafana: SiGrafana,
  Vercel: SiVercel,
};
