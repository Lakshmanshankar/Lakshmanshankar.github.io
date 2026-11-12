import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  initSmoothScroll,
  cleanupSmoothScroll,
  getLenis,
  scrollToTarget,
  isReducedMotion,
} from "./smoothScroll";

export const REDUCE_ANIMATIONS_STORAGE_KEY = "reduce-animations";

export {
  initSmoothScroll,
  cleanupSmoothScroll,
  getLenis,
  scrollToTarget,
  isReducedMotion,
};

let isInitialized = false;

/**
 * Check whether animations are reduced (via user preference or system prefers-reduced-motion)
 */
export function isAnimationsReduced(): boolean {
  return isReducedMotion();
}

/**
 * Remove and kill all ScrollTrigger instances and disable ScrollTrigger
 */
export function removeScrollTrigger() {
  if (typeof window === "undefined") return;
  try {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    ScrollTrigger.clearMatchMedia();
    ScrollTrigger.disable();
  } catch {}
  isInitialized = false;
}

/**
 * Initialize animations: Lenis smooth scroll and ScrollTrigger.
 * If animations are reduced, removes ScrollTrigger and halts smooth scroll.
 */
export function initAnimations() {
  if (typeof window === "undefined") return;

  if (isAnimationsReduced()) {
    document.documentElement.classList.add("reduce-animations");
    document.documentElement.setAttribute("data-reduce-animations", "true");
    removeScrollTrigger();
    cleanupSmoothScroll();
    isInitialized = false;
    return;
  }

  document.documentElement.classList.remove("reduce-animations");
  document.documentElement.removeAttribute("data-reduce-animations");
  try {
    ScrollTrigger.enable();
  } catch {}
  const lenis = initSmoothScroll();

  try {
    ScrollTrigger.refresh();
  } catch {}
  isInitialized = true;
  return { lenis };
}

/**
 * Clean up all animation instances, listeners, and ScrollTriggers before page navigation
 */
export function cleanupAnimations() {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  cleanupSmoothScroll();
  isInitialized = false;
}

/**
 * Returns whether animations are currently initialized
 */
export function areAnimationsInitialized(): boolean {
  return isInitialized;
}

/**
 * Updates the UI state of the reduce animations button (aria attributes, tooltip, icons)
 */
export function updateReduceAnimationsButtonUI(isReduced?: boolean) {
  if (typeof window === "undefined") return;
  const reduced = isReduced ?? isAnimationsReduced();
  const button = document.getElementById("reduce-animations-button");
  if (!button) return;

  button.setAttribute("aria-pressed", String(reduced));
  button.setAttribute(
    "aria-label",
    reduced ? "Enable animations" : "Reduce animations"
  );
  button.setAttribute(
    "title",
    reduced ? "Enable animations" : "Reduce animations"
  );

  const enabledIcon = button.querySelector('[data-motion-icon="enabled"]');
  const disabledIcon = button.querySelector('[data-motion-icon="disabled"]');

  if (enabledIcon && disabledIcon) {
    if (reduced) {
      enabledIcon.classList.add("hidden");
      disabledIcon.classList.remove("hidden");
    } else {
      enabledIcon.classList.remove("hidden");
      disabledIcon.classList.add("hidden");
    }
  }
}

/**
 * Sets reduce animations state, saves to localStorage, updates DOM and animations instances.
 */
export function setReduceAnimations(reduce: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REDUCE_ANIMATIONS_STORAGE_KEY, String(reduce));

  if (reduce) {
    document.documentElement.classList.add("reduce-animations");
    document.documentElement.setAttribute("data-reduce-animations", "true");
    removeScrollTrigger();
    cleanupSmoothScroll();
    isInitialized = false;
  } else {
    document.documentElement.classList.remove("reduce-animations");
    document.documentElement.removeAttribute("data-reduce-animations");
    try {
      ScrollTrigger.enable();
    } catch {}
    initSmoothScroll();
    try {
      ScrollTrigger.refresh();
    } catch {}
    isInitialized = true;
  }

  updateReduceAnimationsButtonUI(reduce);
  window.dispatchEvent(
    new CustomEvent("reduce-animations-change", { detail: { reduce } })
  );
}

/**
 * Toggles the reduce animation state.
 */
export function toggleReduceAnimations(): boolean {
  const next = !isAnimationsReduced();
  setReduceAnimations(next);
  return next;
}

/**
 * Sets up the reduce animations button event listeners and synchronizes initial UI.
 */
export function setupReduceAnimationsButton() {
  if (typeof window === "undefined") return;
  const button = document.getElementById("reduce-animations-button");
  if (!button) return;

  const isReduced = isAnimationsReduced();
  if (isReduced) {
    document.documentElement.classList.add("reduce-animations");
    document.documentElement.setAttribute("data-reduce-animations", "true");
  } else {
    document.documentElement.classList.remove("reduce-animations");
    document.documentElement.removeAttribute("data-reduce-animations");
  }

  updateReduceAnimationsButtonUI(isReduced);

  if ((button as any)._reduceAnimationsBound) return;
  (button as any)._reduceAnimationsBound = true;

  button.addEventListener("click", () => {
    toggleReduceAnimations();
  });
}

// Listen to OS prefers-reduced-motion changes when user hasn't explicitly set a preference
if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const handleMediaChange = (e: MediaQueryListEvent) => {
    if (localStorage.getItem(REDUCE_ANIMATIONS_STORAGE_KEY) === null) {
      setReduceAnimations(e.matches);
    }
  };
  if (mediaQuery?.addEventListener) {
    mediaQuery.addEventListener("change", handleMediaChange);
  }
}
