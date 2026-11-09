import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  initSmoothScroll,
  cleanupSmoothScroll,
  getLenis,
  scrollToTarget,
} from "./smoothScroll";

export {
  initSmoothScroll,
  cleanupSmoothScroll,
  getLenis,
  scrollToTarget,
};

let isInitialized = false;

/**
 * Initialize animations: Lenis smooth scroll and diagonal image reveals.
 */
export function initAnimations() {
  if (typeof window === "undefined") return;
  const lenis = initSmoothScroll();

  ScrollTrigger.refresh();
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
