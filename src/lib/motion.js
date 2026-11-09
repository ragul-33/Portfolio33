import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

export function isCompactViewport() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 900px)').matches;
}

export const EASE = 'power3.out';
export const EASE_IO = 'power2.inOut';

export function refreshOnFontLoad() {
  if (typeof document === 'undefined') return;
  try {
    document.fonts?.ready?.then(() => {
      ScrollTrigger.refresh();
    });
  } catch {}
}

export function reveal(targets, trigger, options = {}) {
  const {
    y = 28,
    stagger = 0.14,
    duration = 0.9,
    fromOpacity = 0,
    toOpacity = 1,
    scrub = false,
    markers = false,
    once = true,
    ease = EASE,
    start = 'top 85%',
    end = 'bottom top',
    invalidateOnRefresh = true,
  } = options;

  /* `children` / NodeList / HTMLCollection are common call sites; GSAP needs a
     real array, otherwise the collection is treated as a single target. */
  const isList =
    targets &&
    typeof targets !== 'string' &&
    !targets.nodeType &&
    typeof targets.length === 'number';
  const els = Array.isArray(targets)
    ? targets
    : isList
      ? Array.from(targets)
      : [targets].filter(Boolean);
  if (!els.length) return gsap.context(() => {}, trigger || document);

  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      gsap.set(els, { opacity: 1, y: 0 });
      return;
    }
    gsap.set(els, { opacity: fromOpacity, y });
    gsap.to(els, {
      opacity: toOpacity,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: { trigger: trigger || els[0], start, end, scrub, markers, once, invalidateOnRefresh },
    });
  }, trigger || els[0]);
  return ctx;
}

export function revealLines(targets, trigger, options = {}) {
  return reveal(targets, trigger, options);
}

export { ScrollTrigger, gsap };
export default gsap;