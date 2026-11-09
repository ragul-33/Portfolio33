import { useEffect, useRef } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';

/**
 * Canvas particle field for the hero.
 *
 * - Adaptive density (fewer, larger points on small screens)
 * - Single rAF loop, paused whenever the tab is hidden
 * - Fully disabled when the user prefers reduced motion
 * - Connects dots within a threshold distance for depth
 */
export default function ParticleField() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let points = [];
    let rafId = null;
    let running = true;

    const isSmall = () => window.matchMedia('(max-width: 640px)').matches;

    const palette = [
      '0, 210, 255',
      '56, 189, 248',
      '37, 99, 235',
      '125, 211, 252',
    ];

    function build() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const small = isSmall();
      const area = width * height;
      const count = Math.round(
        Math.min(small ? 34 : 78, Math.max(small ? 16 : 30, area / 26000))
      );

      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: small ? Math.random() * 1.1 + 0.7 : Math.random() * 1.5 + 0.7,
        c: palette[(Math.random() * palette.length) | 0],
        a: Math.random() * 0.45 + 0.25,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const linkDist = width < 640 ? 110 : 150;

      for (let i = 0; i < points.length; i += 1) {
        const p = points[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < points.length; j += 1) {
          const q = points[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDist) continue;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,210,255,${0.12 * (1 - dist / linkDist)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      if (running) rafId = requestAnimationFrame(draw);
    }

    function onResize() {
      build();
      if (!running) draw();
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!running) {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    }

    build();
    rafId = requestAnimationFrame(draw);

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}