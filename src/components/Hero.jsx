import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ArrowDown, MoveRight } from 'lucide-react';
import ParticleField from './ParticleField';
import useReducedMotion from '../hooks/useReducedMotion';
import { handleAnchorClick } from '../lib/scroll';
import { gsap } from '../lib/motion';
import { IDENTITY } from '../site.config';

/**
 * 01 / HERO
 *
 * The portrait is the centre of the opening screen. On phones it reads as a
 * centred poster (label → name → portrait → copy → actions); from `lg` up it
 * becomes a single layered stage, with the artwork bottom-anchored and behind
 * the type, and the typography composed around it:
 *
 *   top bar        — availability + location + index
 *   flanking labels— "CREATIVE" / "DESIGNER" either side of the head
 *   headline       — set across the chest, below the face
 *   foot           — lead + supporting copy, with the actions opposite
 *
 * Layers are kept on separate elements (scrub / intro / pointer) so no two
 * tweens ever own the same transform on the same node.
 */
export default function Hero() {
  const sectionRef = useRef(null);
  const fieldRef = useRef(null);

  const haloScrubRef = useRef(null);
  const haloParallaxRef = useRef(null);
  const haloIntroRef = useRef(null);

  const portraitScrubRef = useRef(null);
  const portraitIntroRef = useRef(null);
  const portraitParallaxRef = useRef(null);

  const topScrubRef = useRef(null);
  const topIntroRef = useRef(null);
  const headlineRef = useRef(null);
  const sideMetaRef = useRef(null);
  const sideLeftRef = useRef(null);
  const sideRightRef = useRef(null);
  const footRef = useRef(null);
  const cueRef = useRef(null);

  const reduced = useReducedMotion();

  /* Entrance choreography + scroll exit ------------------------------------ */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const lines = headlineRef.current
        ? Array.from(headlineRef.current.querySelectorAll('[data-reveal-line] > span'))
        : [];
      const footItems = footRef.current ? Array.from(footRef.current.children) : [];

      if (!reduced) {
        /* `fromTo` applies its "from" values synchronously, so nothing flashes
           before the first paint. */
        const intro = gsap.timeline({ delay: 0.08 });

        intro
          .fromTo(
            haloIntroRef.current,
            { opacity: 0, scale: 0.84 },
            { opacity: 1, scale: 1, duration: 1.7, ease: 'power2.out' },
            0
          )
          .fromTo(
            portraitIntroRef.current,
            { opacity: 0, yPercent: 5, scale: 0.965 },
            { opacity: 1, yPercent: 0, scale: 1, duration: 1.7, ease: 'power3.out' },
            0.05
          )
          .fromTo(
            topIntroRef.current,
            { opacity: 0, y: -14 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
            0.15
          )
          .fromTo(
            sideLeftRef.current,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
            0.5
          )
          .fromTo(
            sideRightRef.current,
            { opacity: 0, x: 16 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
            0.58
          )
          .fromTo(
            lines,
            { yPercent: 112, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
            0.4
          )
          .fromTo(
            footItems,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' },
            0.72
          )
          .fromTo(cueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 1.2);
      }

      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      exit
        .to(headlineRef.current, { yPercent: -16, opacity: 0.06, ease: 'none' }, 0)
        .to(portraitScrubRef.current, { yPercent: -7, scale: 1.05, opacity: 0.3, ease: 'none' }, 0)
        .to(haloScrubRef.current, { scale: 1.35, opacity: 0.5, ease: 'none' }, 0)
        .to(sideMetaRef.current, { yPercent: -34, opacity: 0, ease: 'none' }, 0)
        .to(footRef.current, { yPercent: -24, opacity: 0, ease: 'none' }, 0)
        .to(topScrubRef.current, { opacity: 0, ease: 'none' }, 0)
        .to(fieldRef.current, { y: 80, opacity: 0.06, ease: 'none' }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  /* Pointer parallax — desktop, fine pointers only -------------------------- */
  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;

    const layers = [
      { el: portraitParallaxRef.current, x: 16, y: 11 },
      { el: haloParallaxRef.current, x: -26, y: -18 },
      { el: sideLeftRef.current, x: -7, y: -4 },
      { el: sideRightRef.current, x: 7, y: -4 },
    ].filter((l) => l.el);
    if (!layers.length) return;

    let rafId = null;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (rafId === null) rafId = requestAnimationFrame(tick);
    };

    function tick() {
      cx += (tx - cx) * 0.075;
      cy += (ty - cy) * 0.075;
      for (const l of layers) {
        l.el.style.transform = `translate3d(${(cx * l.x).toFixed(2)}px, ${(cy * l.y).toFixed(2)}px, 0)`;
      }
      if (Math.abs(tx - cx) > 0.0015 || Math.abs(ty - cy) > 0.0015) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
      for (const l of layers) l.el.style.transform = '';
    };
  }, [reduced]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#07090e]"
      aria-labelledby="hero-title"
    >
      {/* ── Atmosphere ─────────────────────────────────────────────────── */}
      <div ref={fieldRef} className="grid-field absolute inset-0 z-0 opacity-70" aria-hidden="true" />
      <ParticleField />

      {/* Warm counter-light — echoes the portrait's skin + lime tones */}
      <div
        className="pointer-events-none absolute bottom-[-14%] left-1/2 z-0 h-[42vh] w-[92vw] max-w-[860px] -translate-x-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(255,176,92,0.11) 0%, rgba(0,210,255,0.05) 46%, transparent 72%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      {/* Cyan halo, centred on the head */}
      <div
        ref={haloScrubRef}
        className="pointer-events-none absolute left-1/2 top-[32%] z-[1] h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 sm:h-[440px] sm:w-[440px] lg:top-[27%] lg:h-[760px] lg:w-[760px]"
        aria-hidden="true"
      >
        <div ref={haloParallaxRef} className="h-full w-full">
          <div
            ref={haloIntroRef}
            className="h-full w-full rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(0,210,255,0.20) 0%, rgba(37,99,235,0.10) 42%, transparent 70%)',
              filter: 'blur(70px)',
            }}
          />
        </div>
      </div>

      {/* ── Head block: top bar + headline ─────────────────────────────── */}
      <div className="relative w-full lg:static">
        {/* top bar */}
        <div
          ref={topScrubRef}
          className="container-custom pt-[calc(var(--nav-h)_+_0.75rem)] lg:absolute lg:inset-x-0 lg:top-0 lg:z-30 lg:pt-[calc(var(--nav-h)_+_1.75rem)]"
        >
          <div
            ref={topIntroRef}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2"
          >
            <span className="pill-status text-[#00d2ff] border-[#00d2ff]/25 bg-[#00d2ff]/[0.06]">
              <span className="status-dot" aria-hidden="true" />
              {IDENTITY.ROLES[0]}
            </span>
            <p className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[color:var(--dim)] sm:gap-3">
              <span>{IDENTITY.LOCATION_SHORT}</span>
              <span aria-hidden="true" className="text-white/15">
                /
              </span>
              <span className="hidden sm:inline">{IDENTITY.TIMEZONE}</span>
            </p>
          </div>
        </div>

        {/* headline — across the chest on desktop, above the portrait on phones */}
        <h1
          id="hero-title"
          ref={headlineRef}
          className="container-custom t-hero t-hero-cq mt-6 text-center text-white lg:absolute lg:inset-x-0 lg:top-[62%] lg:z-30 lg:mt-0 lg:-translate-y-1/2"
        >
          <span data-reveal-line className="block overflow-hidden pb-[0.06em]">
            <span className="block">
              RAGUL<span className="text-[#00d2ff]">.</span>
            </span>
          </span>
        </h1>
      </div>

      {/* ── Portrait ───────────────────────────────────────────────────── */}
      <div className="relative z-10 mt-7 flex w-full justify-center sm:mt-9 lg:absolute lg:inset-0 lg:z-10 lg:mt-0 lg:block">
        <div ref={portraitScrubRef} className="hero-portrait-box">
          <div ref={portraitIntroRef} className="flex h-full w-full items-end justify-center">
            <div ref={portraitParallaxRef} className="flex h-full w-full items-end justify-center">
              <picture className="contents">
                <source srcSet="/hero-portrait.webp" type="image/webp" />
                <img
                  src="/hero-portrait.png"
                  alt="Painted portrait illustration of Ragul — a person in a dark top, drawn rather than photographed."
                  width="1165"
                  height="1345"
                  className="hero-portrait-img h-auto w-[min(80vw,330px)] object-contain object-bottom sm:w-[min(58vw,390px)] lg:h-full lg:w-full"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>

      {/* ── Flanking labels — either side of the head (desktop) ────────── */}
      <div
        ref={sideMetaRef}
        className="pointer-events-none absolute inset-x-0 top-[23%] z-30 hidden lg:block"
        aria-hidden="true"
      >
        <div className="container-custom flex items-start justify-between gap-8">
          <div ref={sideLeftRef} className="max-w-[180px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#00d2ff]">
              Creative
            </p>
            <div className="hero-rule my-2.5 w-full" />
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[color:var(--dim)]">
              Thinking in
              <br />
              systems
            </p>
          </div>
          <div ref={sideRightRef} className="max-w-[180px] text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#00d2ff]">
              Designer
            </p>
            <div className="hero-rule hero-rule--flip my-2.5 w-full" />
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[color:var(--dim)]">
              Building in
              <br />
              details
            </p>
          </div>
        </div>
      </div>

      {/* ── Foot: copy + actions ───────────────────────────────────────── */}
      <div className="relative z-30 mt-auto w-full lg:static lg:mt-0">
        <div
          ref={footRef}
          className="container-custom flex flex-col gap-6 pb-12 lg:absolute lg:inset-x-0 lg:bottom-[6%] lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-0"
        >
          <div className="max-w-[46ch]">
            <p className="t-lead">Turning ideas into visual experiences.</p>
            <p className="t-body mt-3">
              I create visual identities, digital experiences and creative content for ideas that
              deserve to stand out.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-none">
            <a
              href="#collaboration"
              onClick={(e) => handleAnchorClick(e, '#collaboration')}
              className="btn-primary group w-full sm:w-auto"
            >
              <span>Let&rsquo;s create</span>
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              onClick={(e) => handleAnchorClick(e, '#about')}
              className="btn-secondary group w-full sm:w-auto"
            >
              <span>Explore</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Scroll cue (desktop) ───────────────────────────────────────── */}
      <a
        ref={cueRef}
        href="#about"
        onClick={(e) => handleAnchorClick(e, '#about')}
        className="absolute bottom-4 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-1.5 py-2 text-[10px] font-mono tracking-[0.2em] text-[color:var(--dim)] transition-colors hover:text-[#00d2ff] lg:flex"
      >
        <span>SCROLL</span>
        <ArrowDown className="h-3.5 w-3.5" style={{ animation: 'driftY 2.4s ease-in-out infinite' }} />
      </a>
    </section>
  );
}
