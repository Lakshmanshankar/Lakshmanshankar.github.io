import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;
let anchorClickHandler: ((e: MouseEvent) => void) | null = null;

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("reduce-animations");
  if (stored !== null) {
    return stored === "true";
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function initSmoothScroll(): Lenis | null {
  if (typeof window === "undefined") return null;

  // Respect prefers-reduced-motion and user preference
  if (isReducedMotion()) {
    if (lenisInstance) {
      cleanupSmoothScroll();
    }
    return null;
  }

  // If already initialized on this page, return existing instance
  if (lenisInstance) {
    return lenisInstance;
  }

  // Create single Lenis instance per page with natural, responsive feel
  lenisInstance = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
    infinite: false,
    autoRaf: false, // GSAP ticker drives RAF for unified synchronization
  });

  // Synchronize Lenis scrolling with ScrollTrigger
  lenisInstance.on("scroll", ScrollTrigger.update);

  // Drive Lenis RAF from GSAP ticker
  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Preserve and enhance native anchor navigation (TOC, headings, internal hashes)
  anchorClickHandler = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest?.("a");
    if (!target) return;

    const href = target.getAttribute("href");
    if (href && href.startsWith("#") && href.length > 1) {
      const el = document.querySelector(href);
      if (el && lenisInstance) {
        e.preventDefault();
        try {
          window.history.pushState(null, "", href);
        } catch {
          // ignore history errors
        }
        lenisInstance.scrollTo(el as HTMLElement, {
          offset: -28,
          duration: 0.9,
        });
      }
    }
  };
  document.addEventListener("click", anchorClickHandler);

  // If page loads with a hash anchor, scroll smoothly to it after brief layout stabilization
  if (window.location.hash && window.location.hash.length > 1) {
    const hashEl = document.querySelector(window.location.hash);
    if (hashEl && lenisInstance) {
      setTimeout(() => {
        lenisInstance?.scrollTo(hashEl as HTMLElement, { offset: -28, duration: 0.8 });
      }, 150);
    }
  }

  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement | number, options: { offset?: number; duration?: number } = {}) {
  if (lenisInstance && !isReducedMotion()) {
    lenisInstance.scrollTo(target as any, {
      offset: options.offset ?? -28,
      duration: options.duration ?? 0.9,
    });
  } else {
    const behavior = isReducedMotion() ? "auto" : "smooth";
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior });
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior });
    }
  }
}

export function cleanupSmoothScroll() {
  if (anchorClickHandler) {
    document.removeEventListener("click", anchorClickHandler);
    anchorClickHandler = null;
  }

  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
