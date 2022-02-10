import { useState, useEffect } from "react";

export const useReducedMotion = (defaultVal = true): boolean => {
  const [reducedMotion, setReducedMotion] = useState(defaultVal);

  function queryCnangeHandler(event: MediaQueryListEvent): void {
    const target = event.target as unknown as { matches: boolean };
    setReducedMotion(target.matches);
  }

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery) {
      setReducedMotion(mediaQuery.matches);

      mediaQuery.addEventListener("change", queryCnangeHandler);

      return () => mediaQuery.removeEventListener("change", queryCnangeHandler);
    }
  }, []);

  return reducedMotion;
};
