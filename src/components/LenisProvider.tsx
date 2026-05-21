import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { useLocation } from "@tanstack/react-router";

// ─── Context so child components can access the Lenis instance ────────────────
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

// ─── Premium easing — silky quintic ease-out ─────────────────────────────────
const premiumEase = (t: number): number => {
  // Expo-out: feels alive, not mechanical
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,                // slightly longer = more luxurious feel
      easing: premiumEase,
      smoothWheel: true,
      wheelMultiplier: 0.9,         // slightly slower wheel = feels premium
      touchMultiplier: 1.5,         // touch feels responsive on mobile
      infinite: false,
      autoRaf: false,               // we manage our own RAF for GSAP compatibility
    });

    lenisRef.current = lenis;

    // Expose on window for GSAP ScrollTrigger to hook in if needed
    if (typeof window !== "undefined") {
      (window as typeof window & { __lenis?: Lenis }).__lenis = lenis;
    }

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change (immediate — no animation across routes)
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
