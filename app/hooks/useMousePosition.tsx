"use client";

import { useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Tracks mouse position at window level.
 * Returns a ref (not state) to avoid re-renders on every mousemove.
 * Consumers read `.current` inside animation loops or event handlers.
 */
export function useMousePosition() {
  const position = useRef<MousePosition>({ x: -1, y: -1 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return position;
}
