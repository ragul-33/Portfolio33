import React, { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '../lib/motion';
import { IDENTITY } from '../site.config';

/* ---------------------------------------------------------------------------
 * SECTION 08 — THE PRINCE'S CLOSING
 * ---------------------------------------------------------------------------
 * A cinematic final scene: the supplied Vegeta artwork is the atmosphere,
 * the royal crest is the symbol, and the quote is the quiet centre of gravity.
 * The Ragul wordmark stays present as the author's signature.
 * ------------------------------------------------------------------------- */

const WORDMARK = IDENTITY.WORDMARK;
const HAS_DOT = WORDMARK.endsWith('.');
const NAME = HAS_DOT ? WORDMARK.slice(0, -1) : WORDMARK;

const LIGHTNING = [
  {
    className: 'hf-bolt--one',
    d: 'M53 2 16 88l29-13-13 84 55-111-34 12L79 2Z',
  },
  {
    className: 'hf-bolt--two',
    d: 'M78 3 31 79l28-10-16 83 58-107-31 11L102 3Z',
  },
];

export default function HumanFile() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const artRef = useRef(null);
  const watermarkRef = useRef(null);
  const quoteWrapRef = useRef(null);
  const reduced = useReducedMotion();

  /* ── Ambient star field + cursor light ─────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let last = 0;

    const stars = [];
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const palette = [
      '0,210,255',
      '56,189,248',
      '125,211,252',
      '139,125,255',
      '231,254,255',
    ];

    const build = () => {
      const compact = width < 700;
      const target = Math.round((width * height) / (compact ? 15000 : 12000));
      const count = Math.max(compact ? 38 : 75, Math.min(compact ? 78 : 160, target));
      stars.length = 0;
      for (let i = 0; i < count; i++) {
        const layer = Math.random() * 0.9 + 0.35;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.09 * layer,
          vy: (Math.random() - 0.5) * 0.07 * layer,
          r: (Math.random() * 1.1 + 0.5) * layer,
          a: Math.random() * 0.34 + 0.2,
          layer,
          colour: palette[Math.floor(Math.random() * palette.length)],
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = (time = 0) => {
      const dt = Math.min(32, time - last || 16);
      last = time;
      ctx.clearRect(0, 0, width, height);

      const mx = pointer.x * width;
      const my = pointer.y * height;

      /* A very low-opacity cursor light keeps the scene responsive without
         turning the closing section into a flashlight. */
      if (!reduced) {
        const light = ctx.createRadialGradient(mx, my, 0, mx, my, Math.max(width, height) * 0.58);
        light.addColorStop(0, 'rgba(0,210,255,0.09)');
        light.addColorStop(0.2, 'rgba(14,165,233,0.045)');
        light.addColorStop(0.58, 'rgba(37,99,235,0.012)');
        light.addColorStop(1, 'rgba(4,7,12,0)');
        ctx.fillStyle = light;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      const compact = width < 700;
      const maxDist = compact ? 96 : 126;

      for (let i = 0; i < stars.length; i++) {
        const p = stars[i];
        if (!reduced) {
          p.x += p.vx * (dt / 16) + Math.sin(time * 0.00028 + p.phase) * 0.035;
          p.y += p.vy * (dt / 16) + Math.cos(time * 0.00024 + p.phase) * 0.028;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const dxm = p.x - mx;
        const dym = p.y - my;
        const near = Math.max(0, 1 - Math.hypot(dxm, dym) / 250);

        for (let j = i + 1; j < stars.length; j++) {
          const q = stars[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const d = Math.sqrt(d2);
            const falloff = 1 - d / maxDist;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96,165,250,${(0.035 + falloff * 0.075 + near * 0.04).toFixed(3)})`;
            ctx.lineWidth = 0.55 + falloff * 0.45;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        const twinkle = reduced ? 1 : 0.82 + Math.sin(time * 0.00055 + p.phase) * 0.18;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.colour},${Math.min(0.9, (p.a + near * 0.22) * twinkle).toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r * (1 + near * 0.9), 0, Math.PI * 2);
        ctx.fill();

        if (near > 0.58 && !reduced) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(0,210,255,${(near * 0.06).toFixed(3)})`;
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      pointer.x += (pointer.tx - pointer.x) * 0.1;
      pointer.y += (pointer.ty - pointer.y) * 0.1;

      if (running) raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = section.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      pointer.x = pointer.tx = width > 700 ? 0.42 : 0.5;
      pointer.y = pointer.ty = 0.48;
      if (!running) draw(performance.now());
    };

    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      const rect = section.getBoundingClientRect();
      pointer.tx = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      pointer.ty = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    };

    const onLeave = () => {
      pointer.tx = width > 700 ? 0.42 : 0.5;
      pointer.ty = 0.48;
    };

    const start = () => {
      if (reduced || running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) start();
        else stop();
      },
      { threshold: 0.03 }
    );

    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;

    resize();
    io.observe(section);
    if (ro) ro.observe(section);
    else window.addEventListener('resize', resize);

    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);

    if (reduced) draw(performance.now());

    return () => {
      stop();
      io.disconnect();
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', resize);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced]);

  /* ── Pointer parallax + scroll drift ────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    const art = artRef.current;
    const watermark = watermarkRef.current;
    const quote = quoteWrapRef.current;
    if (!section || !art) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced) return;

    let raf = 0;
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      px += (tx - px) * 0.075;
      py += (ty - py) * 0.075;
      const strength = window.innerWidth < 768 ? 0.35 : 1;

      art.style.setProperty('--ax', `${(px * 10 * strength).toFixed(2)}px`);
      art.style.setProperty('--ay', `${(py * 8 * strength).toFixed(2)}px`);
      if (watermark) {
        watermark.style.setProperty('--wx', `${(px * 15 * strength).toFixed(2)}px`);
        watermark.style.setProperty('--wy', `${(py * 11 * strength).toFixed(2)}px`);
      }
      if (quote) {
        quote.style.setProperty('--qx', `${(px * 4 * strength).toFixed(2)}px`);
        quote.style.setProperty('--qy', `${(py * 3 * strength).toFixed(2)}px`);
      }

      if (Math.abs(tx - px) > 0.001 || Math.abs(ty - py) > 0.001) {
        raf = requestAnimationFrame(apply);
      } else {
        raf = 0;
      }
    };

    const onMove = (event) => {
      if (event.pointerType === 'touch') return;
      const rect = section.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = (event) => {
      if (event?.pointerType === 'touch') return;
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    if (finePointer) {
      section.addEventListener('pointermove', onMove, { passive: true });
      section.addEventListener('pointerleave', onLeave);
    }

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const drift = (self.progress - 0.5) * (window.innerWidth < 768 ? 14 : 28);
        art.style.setProperty('--sy', `${(-drift).toFixed(2)}px`);
        if (watermark) {
          watermark.style.setProperty('--wy-scroll', `${(drift * 0.65).toFixed(2)}px`);
        }
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      st.kill();
      if (finePointer) {
        section.removeEventListener('pointermove', onMove);
        section.removeEventListener('pointerleave', onLeave);
      }
      art.style.removeProperty('--ax');
      art.style.removeProperty('--ay');
      art.style.removeProperty('--sy');
      watermark?.style.removeProperty('--wx');
      watermark?.style.removeProperty('--wy');
      watermark?.style.removeProperty('--wy-scroll');
      quote?.style.removeProperty('--qx');
      quote?.style.removeProperty('--qy');
    };
  }, [reduced]);

  /* ── Staggered, one-shot entrance ───────────────────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) return;

    const ctx = gsap.context(() => {
      const art = section.querySelector('.hf-art-media');
      const brand = section.querySelector('.hf-brand');
      const rule = section.querySelector('.hf-brand-rule');
      const crest = section.querySelector('.hf-crest-seal');
      const lines = Array.from(section.querySelectorAll('.hf-quote-line'));
      const cite = section.querySelector('.hf-quote-footer');
      const closing = section.querySelector('.hf-closing');
      const bolt = section.querySelector('.hf-bolts');

      gsap.set(art, { opacity: 0, scale: 1.045 });
      gsap.set(brand, { opacity: 0, y: 16 });
      gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(crest, { opacity: 0, scale: 0.66, rotate: -12 });
      gsap.set(lines, { opacity: 0, y: 24 });
      gsap.set(cite, { opacity: 0, y: 10 });
      gsap.set(closing, { opacity: 0, y: 10 });
      if (bolt) gsap.set(bolt, { opacity: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      tl.to(art, { opacity: 1, scale: 1, duration: 1.5 }, 0)
        .to(brand, { opacity: 1, y: 0, duration: 0.8 }, 0.16)
        .to(rule, { scaleX: 1, duration: 0.9 }, 0.28)
        .to(crest, { opacity: 1, scale: 1, rotate: 0, duration: 1 }, 0.34)
        .to(lines, { opacity: 1, y: 0, duration: 0.85, stagger: 0.13 }, 0.42)
        .to(cite, { opacity: 1, y: 0, duration: 0.65 }, '-=0.38')
        .to(closing, { opacity: 1, y: 0, duration: 0.8 }, '-=0.38')
        .to(bolt, { opacity: 1, duration: 1.2 }, 0.8);

      ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        once: true,
        onEnter: () => tl.play(),
      });

      if (section.getBoundingClientRect().top < window.innerHeight * 0.8) {
        tl.play();
      }
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="human"
      ref={sectionRef}
      className="hf-section relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#04070c]"
      aria-labelledby="human-finale-title"
    >
      <h2 id="human-finale-title" className="sr-only">
        {IDENTITY.WORDMARK} — the final signature
      </h2>

      <div className="hf-sky pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

      <canvas
        ref={canvasRef}
        className="hf-canvas pointer-events-none absolute inset-0 z-[4]"
        aria-hidden="true"
      />

      <div className="hf-aura pointer-events-none z-[3]" aria-hidden="true" />

      <div ref={artRef} className="hf-art-layer z-[1]">
        <div className="hf-art-media">
          <img
            className="hf-art"
            src="/img/vegeta-portrait.webp"
            alt="Vegeta, prince of all Saiyans, lit by a blue energy aura"
            width="1920"
            height="1076"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="hf-art-wash" aria-hidden="true" />
        <div className="hf-art-glow" aria-hidden="true" />
      </div>

      <div ref={watermarkRef} className="hf-crest-watermark z-[2]" aria-hidden="true" />

      <div className="hf-bolts z-[5]" aria-hidden="true">
        {LIGHTNING.map((bolt) => (
          <svg
            key={bolt.className}
            className={`hf-bolt ${bolt.className}`}
            viewBox="0 0 110 180"
            fill="none"
            role="presentation"
          >
            <path d={bolt.d} stroke="rgba(125,231,255,0.9)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d={bolt.d} stroke="rgba(0,210,255,0.32)" strokeWidth="8" strokeLinejoin="round" />
          </svg>
        ))}
      </div>

      <div className="hf-frame relative z-[7] mx-auto flex w-full max-w-[1600px] flex-col justify-center px-5 pb-8 pt-28 sm:px-8 lg:px-12">
        <div className="hf-content">
          <div className="hf-brand">
            <span className="hf-brand-name">{NAME}</span>
            <span className="hf-brand-dot" aria-hidden="true">
              {HAS_DOT ? '.' : ''}
            </span>
          </div>

          <span className="hf-brand-rule" aria-hidden="true" />

          <div ref={quoteWrapRef} className="hf-quote-wrap">
            <div className="hf-quote-mark" aria-hidden="true">
              &ldquo;
            </div>

            <div className="hf-crest-seal" aria-hidden="true">
              <span className="hf-seal-ring" />
              <span className="hf-seal-mark" />
            </div>

            <blockquote className="hf-quote">
              <p className="hf-quote-text">
                <span className="hf-quote-line">&ldquo;I do not fear this new challenge,</span>
                <span className="hf-quote-line">
                  rather like a <span className="hf-em">true warrior</span>
                </span>
                <span className="hf-quote-line">
                  I will <span className="hf-em hf-em--rise">rise</span> to meet it.&rdquo;
                </span>
              </p>
              <footer className="hf-quote-footer">
                <span className="hf-cite-rule" aria-hidden="true" />
                <cite>— VEGETA</cite>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="hf-closing">
          <span className="hf-closing-rule" aria-hidden="true" />
          <p>© 2026 Ragul. Built with curiosity.</p>
          <span className="hf-closing-rule" aria-hidden="true" />
        </div>
      </div>

      <div className="hf-edge-fade pointer-events-none absolute inset-x-0 bottom-0 z-[6]" aria-hidden="true" />
    </section>
  );
}
