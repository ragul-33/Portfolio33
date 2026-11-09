import { prefersReducedMotion } from './motion';

/** Vertical space to leave above a section when jumping to it. */
function navOffset() {
  if (typeof window === 'undefined') return 0;
  // Mobile header is 64px tall, desktop 80px; both get breathing room.
  if (window.matchMedia('(max-width: 639px)').matches) return 80;
  if (window.matchMedia('(max-width: 1023px)').matches) return 88;
  return 96;
}

/**
 * Smooth-scrolls the document to a section id with a sensible offset so the
 * fixed navigation never covers the heading. Falls back to native behaviour.
 */
export function scrollToId(id, options = {}) {
  if (typeof document === 'undefined') return false;

  const selector = id.startsWith('#') ? id : `#${id}`;
  const target = document.querySelector(selector);
  if (!target) return false;

  const top =
    target.getBoundingClientRect().top + window.scrollY - navOffset() + (options.extra || 0);

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });

  // Keep the URL meaningful without triggering the browser's own jump.
  if (window.history?.replaceState) {
    window.history.replaceState(null, '', selector);
  }
  return true;
}

/** Click handler for in-page anchor links. */
export function handleAnchorClick(event, id, options = {}) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  event.preventDefault();
  scrollToId(id, options);
}

export function scrollToTop() {
  if (typeof window === 'undefined') return;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}