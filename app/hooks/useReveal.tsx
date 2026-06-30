"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  /** Delay before animation starts (ms) */
  delay?: number;
  /** How much of the element must be visible before triggering (0–1) */
  threshold?: number;
  /** Root margin — shifts the trigger point */
  rootMargin?: string;
  /** Only trigger once (default: true) */
  once?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
) {
  const {
    delay = 0,
    threshold = 0.15,
    rootMargin = "0px 0px -60px 0px",
    once = true,
  } = options;

  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion — reveal immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setVisible(true), delay);
          if (once) observer.disconnect();
        } else if (!once) {
          clearTimeout(timer);
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay, threshold, rootMargin, once]);

  return { ref, visible };
}
