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
    id: "kalteng24",
    title: "Kalteng24 News Portal",
    description:
      "User-friendly news portal with comprehensive content management system for editorial workflows",
    longDescription:
      "As part of my freelance work, I developed a user-friendly full-stack news portal featuring a comprehensive content management system designed to streamline editorial workflows. The platform includes dedicated user, editorial, and administration panels, enabling efficient content creation, review, publishing, and platform management. I implemented features that support modern digital publishing operations, including scheduled article publishing, integrated image editing, role-based content management, and a centralized advertisement management system, with a focus on balancing performance, usability, and maintainable code.",
    tags: ["Laravel", "Filament", "React", "Tailwind", "Inertia.js"],
    year: "2026",
    image: "/project1.png",
    link: "https://kalteng24.com",
    repo: "https://github.com/jrdrwn/kalteng24-inertia",
    featured: true,
  },
  {
    id: "adaapi",
    title: "Adaapi",
    description:
      "A community-driven fire reporting and emergency response platform with real-time public alerts and incident monitoring",
    longDescription:
      "Built as part of a hackathon where my team earned 3rd place, this project is a community-driven fire reporting and emergency response platform designed to connect the public with local fire departments. Citizens can report fire incidents in real time, enabling emergency responders to monitor incoming reports through a dedicated dashboard while automatically notifying users within a 100 km radius of the reported location. I was responsible for designing and developing the backend, including the database architecture, API development, deployment of the entire application, and deployment of our fire detection machine learning model.",
    tags: ["Hono.js", "FastAPI", "Next.js", "YOLO", "PostgreSQL"],
    year: "2025",
    image: "/project2.png",
    repo: "https://github.com/PyroSentinel",
    featured: true,
  },
  {
    id: "fits-ai",
    title: "FITS AI",
    description:
      "AI-powered nutrition tracker app that analyse packaged food and beverages health impact with OCR and our own LLM",
    longDescription:
      "Developed as the capstone project for the Bangkit Academy Program. FITS AI helps users make healthier dietary choices by scanning the ingredient list and nutrition table of packaged food and beverages using OCR model. The app analyzes nutritional content, assigns an A–D health rating, and generates personalized health insights through a transfer learning–based large language model while adapting recommendations to users food allergies and chronic conditions. \n\nFor my role at the team as a Cloud Engineer, I designed and developed the entire backend system, including the database architecture and REST APIs, deployed the backend on GCP Compute Engine, containerized and deployed our inhouse API-based LLM service with Docker, and implemented a GitHub Actions–based CI/CD pipeline to automate deployments. I also configured the cloud infrastructure with scalability in mind, leveraging Google Cloud services to support reliable and efficient application deployment.",
    tags: ["Kotlin", "Hapi.js", "FastAPI", "GCP", "Docker"],
    year: "2024",
    image: "/project3.png",
    repo: "https://github.com/FITS-AI",
    featured: true,
  },
  {
    id: "road-mark-detection",
    title: "Research on Low-light Object Detection",
    description:
      "A research project evaluating the impact of image enhancement model on object detection performance on YOLOv8",
    longDescription:
      "Conducted as my undergraduate thesis, this research investigates the impact of low-light image enhancement on the performance of road marking detection under nighttime conditions. I compared the traditional CLAHE algorithm against EnlightenGAN, a deep learning–based image enhancement model selected for its ability to improve image brightness while preserving color fidelity and minimizing noise. YOLOv8 was used as the object detection model to evaluate detection performance across multiple experimental runs with different random seeds. Although EnlightenGAN consistently outperformed CLAHE overall and achieved substantial improvements for several road marking classes, statistical analysis using a paired t-test showed that the overall performance difference was not statistically significant due to high variation across classes and training seeds. This study demonstrates the importance of combining empirical performance evaluation with statistical validation when assessing computer vision techniques.",
    tags: ["YOLO", "Python", "Roboflow"],
    year: "2026",
    image: "/project4.png",
    repo: "https://github.com/bmmasaputra/ROAD_MARK_EnlightenGAN_v_CLAHE_YOLOv8",
    featured: true,
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Freelance",
    role: "Full-stack Developer",
    period: "2025 — Present",
    description:
      "Designed, built, and deployed custom full-stack web applications for clients, managing the entire development lifecycle from requirements gathering to production deployment and maintenance.",
    stack: ["React", "Filament", "Laravel", "Node.js", "MySQL", "PostgreQL"],
  },
  {
    id: "exp-2",
    company: "University of Palangka Raya",
    role: "Web Dev Internship",
    period: "2025",
    description:
      "Modernized a legacy web applications for the Directorate of Student Affairs, redeveloping the Student Achievement Digitalization platform and Alumni Tracer Study system to improve usability.",
    stack: ["PHP", "Laravel", "Filament", "Tailwind", "MySQL"],
  },
  {
    id: "exp-3",
    company: "Bangkit Academy",
    role: "Cloud Engineering Cohort",
    period: "2024",
    description:
      "Completed an industry-led cloud computing program, gaining hands-on experience with Google Cloud PaaS and IaaS, backend, cloud infrastructure, containerization, and DevOps practices while delivering AI-powered capstone project.",
    stack: [
      "GCP",
      "Docker",
      "HAPI.js",
      "GitHub Actions",
      "Kubernetes",
      "Cloud Run",
    ],
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
