import { useEffect, useRef } from 'react';

const INTERACTIVE =
  'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]';

/**
 * Lightweight custom cursor: one dot that follows exactly, one ring that lags.
 * Uses refs + a single rAF loop (no React state per frame) and only mounts on
 * devices with a fine pointer.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ring = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    let rafId = null;
    let visible = false;
    let hovering = false;

    function loop() {
      const r = ring.current;
      r.x += (target.current.x - r.x) * 0.16;
      r.y += (target.current.y - r.y) * 0.16;
      ringEl.style.transform = `translate3d(${r.x}px, ${r.y}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    }

    function start() {
      if (rafId === null) rafId = requestAnimationFrame(loop);
    }

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        dot.classList.add('is-visible');
        ringEl.classList.add('is-visible');
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
      }
      start();
    };

    const onLeave = () => {
      visible = false;
      dot.classList.remove('is-visible');
      ringEl.classList.remove('is-visible');
    };

    /* Event delegation — no per-element listeners to clean up. */
    const onOver = (e) => {
      const hit = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      const next = Boolean(hit);
      if (next === hovering) return;
      hovering = next;
      ringEl.classList.toggle('is-active', next);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else if (visible) {
        start();
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('visibilitychange', onVisibility);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}