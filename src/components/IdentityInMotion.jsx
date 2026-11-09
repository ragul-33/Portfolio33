import React, { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '../lib/motion';

const WORD = 'IDENTITY';

/**
 * SCENE 01 — "IDENTITY IN MOTION"
 * ---------------------------------------------------------------------------
 * Redesigned to keep the portrait as the undisputed focal point. The
 * oversized type no longer crosses the face; instead it moves in the
 * negative space above the figure, creating depth without competing
 * for attention. The figure reveals through a controlled aperture,
 * settles naturally, and recedes cleanly into the next section.
 * ---------------------------------------------------------------------------
 */
export default function IdentityInMotion() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const glowRef = useRef(null);
  const figureRef = useRef(null);
  const revealRef = useRef(null);
  const backWordRef = useRef(null);
  const topWordRef = useRef(null);
  const scanRef = useRef(null);
  const vignetteRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const reveal = revealRef.current;
    const clamp01 = (n) => (n <= 0 ? 0 : n >= 1 ? 1 : n);

    const applyReveal = (progress) => {
      const v = clamp01(progress);

      if (reveal) {
        reveal.style.setProperty('--im-slat', `${(1 + 99 * v).toFixed(2)}%`);
        reveal.style.setProperty('--im-gap', `${(9 * (1 - v)).toFixed(2)}%`);
      }
      if (scanRef.current) {
        scanRef.current.style.transform = `translateY(${(v * 100).toFixed(2)}%)`;
        scanRef.current.style.opacity = String(
          clamp01(v * 6) * clamp01(1 - (v - 0.82) / 0.18)
        );
      }
    };

    applyReveal(reduced ? 1 : 0);

    const ctx = gsap.context(() => {
      if (reduced) return;

      ScrollTrigger.create({
        trigger: stageRef.current,
        start: 'top 88%',
        end: 'top 34%',
        onUpdate: (self) => applyReveal(self.progress),
        onRefresh: (self) => applyReveal(self.progress),
        onLeave: () => applyReveal(1),
        onLeaveBack: () => applyReveal(0),
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top 84%',
          end: 'bottom 16%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(
        glowRef.current,
        { opacity: 0.12, scale: 0.94 },
        { opacity: 0.9, scale: 1, ease: 'none', duration: 0.25 },
        0
      );

      tl.fromTo(
        backWordRef.current,
        { xPercent: -6, opacity: 0.08 },
        { xPercent: 6, opacity: 0.16, ease: 'none', duration: 0.9 },
        0.05
      );

      tl.fromTo(
        topWordRef.current,
        { xPercent: 8, opacity: 0 },
        { xPercent: -4, opacity: 0.95, ease: 'none', duration: 0.85 },
        0.15
      );

      tl.fromTo(
        figureRef.current,
        { yPercent: 1.5 },
        { yPercent: -1.5, ease: 'none', duration: 0.8 },
        0.15
      );

      tl.fromTo(
        vignetteRef.current,
        { opacity: 0.4 },
        { opacity: 1, ease: 'none', duration: 0.5 },
        0.55
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#05070a] py-[clamp(2rem,5vw,4rem)]"
      aria-labelledby="identity-title"
    >
      <h2 id="identity-title" className="sr-only">
        Identity in motion
      </h2>

      <div
        ref={stageRef}
        className="im-stage relative mx-auto h-[clamp(360px,66svh,720px)] w-full max-w-[1600px] overflow-hidden"
        aria-hidden="true"
      >
        <div className="grid-field absolute inset-0 opacity-35" />
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-[48%] h-[68%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,210,255,0.14) 0%, rgba(37,99,235,0.08) 46%, transparent 72%)',
            filter: 'blur(70px)',
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[1] flex items-start justify-center pt-[clamp(1rem,3vw,2.5rem)]">
          <span ref={topWordRef} className="im-word im-word--top whitespace-nowrap">
            {WORD}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
          <span ref={backWordRef} className="im-word im-word--ghost whitespace-nowrap">
            {WORD}
          </span>
        </div>

        <div
          ref={figureRef}
          className="im-figure pointer-events-none absolute inset-y-0 left-1/2 z-[3] -translate-x-1/2"
        >
          <div ref={revealRef} className="im-reveal absolute inset-0">
            <img
              src="/spline/x-mask-character-cut.webp"
              alt=""
              width="859"
              height="996"
              className="absolute inset-0 h-full w-full object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div ref={scanRef} className="im-scan z-[4]">
          <span className="im-scan-line block" />
        </div>

        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0 z-[7]"
          style={{
            background:
              'linear-gradient(to bottom, #05070a 0%, rgba(5,7,10,0) 26%, rgba(5,7,10,0) 72%, #05070a 100%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-[var(--hairline-soft)] py-3">
          <p className="t-meta">
            <span className="text-[#00d2ff]">01</span> — Identity in motion
          </p>
        </div>
      </div>
    </section>
  );
}
