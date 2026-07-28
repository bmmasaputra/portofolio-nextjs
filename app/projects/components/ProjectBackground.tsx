"use client";

import { motion } from "framer-motion";

interface Props {
  motif: "editorial" | "radar" | "organic" | "technical";
  accent: string;
}

export default function ProjectBackground({
  motif,
  accent,
}: Props) {
  return (
    <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
      {motif === "editorial" && <Editorial accent={accent} />}

      {motif === "radar" && <Radar accent={accent} />}

      {motif === "organic" && <Organic accent={accent} />}

      {motif === "technical" && <Technical accent={accent} />}
    </div>
  );
}

function Editorial({ accent }: { accent: string }) {
  return (
    <>
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${accent}22 1px, transparent 1px),
            linear-gradient(to bottom, ${accent}22 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
        }}
      />

      {/* Editorial Lines */}
      <motion.div
        animate={{
          x: [0, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "linear",
        }}
        className="absolute left-0 top-1/3 h-px w-[60%]"
        style={{
          background: `linear-gradient(to right, ${accent}, transparent)`,
        }}
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "linear",
        }}
        className="absolute right-0 bottom-1/4 h-px w-[40%]"
        style={{
          background: `linear-gradient(to left, ${accent}, transparent)`,
        }}
      />
    </>
  );
}

function Radar({ accent }: { accent: string }) {
  return (
    <>
      {[220, 380, 560].map((size) => (
        <motion.div
          key={size}
          animate={{
            scale: [0.95, 1.05, 0.95],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            delay: size / 100,
          }}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `${accent}33`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />
      ))}
    </>
  );
}

function Organic({ accent }: { accent: string }) {
  return (
    <>
      <motion.div
        animate={{
          x: [-20, 20, -20],
          y: [-10, 20, -10],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
        }}
        className="
          absolute
          left-1/3
          top-1/3
          h-[420px]
          w-[420px]
          rounded-full
          blur-[140px]
          opacity-20
        "
        style={{
          background: accent,
        }}
      />

      <motion.div
        animate={{
          x: [20, -20, 20],
          y: [10, -10, 10],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
        }}
        className="
          absolute
          right-20
          bottom-10
          h-[280px]
          w-[280px]
          rounded-full
          blur-[120px]
          opacity-10
        "
        style={{
          background: accent,
        }}
      />
    </>
  );
}

function Technical({ accent }: { accent: string }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(${accent}22 1px, transparent 1px),
            linear-gradient(90deg, ${accent}22 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {[20, 40, 60].map((y) => (
        <motion.div
          key={y}
          animate={{
            x: ["-20%", "120%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            delay: y / 10,
            ease: "linear",
          }}
          className="absolute h-px w-40"
          style={{
            top: `${y}%`,
            background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
          }}
        />
      ))}
    </>
  );
}