import React, { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import ToolLogo from './ToolLogos';
import { TOOLS } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';
import { gsap, revealLines, reveal } from '../lib/motion';

const VB = { w: 100, h: 100 };

export default function Tools() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const svgRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, headingRef.current);
      reveal(gridRef.current?.children, gridRef.current, {
        y: 26,
        stagger: 0.05,
        start: 'top 88%',
      });

      if (reduced || !svgRef.current) return;

      /* Thin connections draw themselves in on entry. */
      const lines = svgRef.current.querySelectorAll('[data-tool-line]');
      gsap.fromTo(
        lines,
        { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: { trigger: svgRef.current, start: 'top 84%' },
        }
      );

      /* Very slow rotation of the diagram so it never feels frozen. */
      const ring = svgRef.current.querySelector('[data-tool-ring]');
      if (ring) {
        gsap.to(ring, {
          rotate: 360,
          transformOrigin: '50% 50%',
          duration: 140,
          ease: 'none',
          repeat: -1,
        });
      }

      /* Gentle drift on the whole map. */
      gsap.to(svgRef.current, {
        yPercent: -3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const current = TOOLS[active];

  return (
    <section id="tools" ref={sectionRef} className="section" aria-labelledby="tools-title">
      <div
        className="glow glow-cyan w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] left-[-8%] bottom-[4%]"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionHead index="03" label="Tools" meta="The toolkit behind the work // visual + analytical" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Heading */}
          <div className="lg:col-span-4 xl:col-span-4">
            <h2 id="tools-title" ref={headingRef} className="t-section text-white">
              <span data-reveal-line>
                <span>The tools</span>
              </span>
              <span data-reveal-line>
                <span>I think with</span>
              </span>
            </h2>
            <p className="t-body mt-8 sm:mt-10">
              Software is a tool, not a personality. These are the ones in the actual workflow —
              a connected toolkit for thinking, making and organising, from the first vector
              sketch to the deployed page, with spreadsheets and documents carrying the
              structured side of the work.
            </p>

            {/* Active tool detail */}
            <div
              ref={gridRef}
              className="mt-8 border-t border-white/[0.07] pt-6 min-h-[148px]"
              aria-live="polite"
            >
              <p className="t-meta">
                {String(active + 1).padStart(2, '0')} / {String(TOOLS.length).padStart(2, '0')}{' '}
                <span className="text-[#00d2ff]">{current.group}</span>
              </p>
              <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                {current.name}
              </p>
              <p className="mt-3 t-body text-[0.95rem]">{current.text}</p>
            </div>
          </div>

          {/* Ecosystem */}
          <div className="lg:col-span-8 xl:col-span-8">
            {/* Desktop: central node with connected tools */}
            <div className="relative hidden md:block aspect-[16/11] w-full">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${VB.w} ${VB.h}`}
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <radialGradient id="core-glow">
                    <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <circle cx="50" cy="50" r="34" fill="url(#core-glow)" />

                {/* rotating dashed ring */}
                <g data-tool-ring opacity="0.5">
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="rgba(0,210,255,0.22)"
                    strokeWidth="0.25"
                    strokeDasharray="1 3"
                  />
                </g>

                {/* connections */}
                {TOOLS.map((tool, i) => {
                  const [x, y] = tool.place;
                  const isActive = i === active;
                  return (
                    <line
                      key={tool.id}
                      data-tool-line
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke={isActive ? '#00d2ff' : 'rgba(255,255,255,0.10)'}
                      strokeWidth={isActive ? 0.5 : 0.3}
                      style={{ transition: 'stroke 400ms ease, stroke-width 400ms ease' }}
                    >
                      <title>{tool.name}</title>
                    </line>
                  );
                })}

                {/* small junction dots at midpoints */}
                {TOOLS.map((tool, i) => {
                  const [x, y] = tool.place;
                  const isActive = i === active;
                  return (
                    <circle
                      key={`${tool.id}-mid`}
                      cx={(50 + x) / 2}
                      cy={(50 + y) / 2}
                      r={isActive ? 0.7 : 0.45}
                      fill={isActive ? '#00d2ff' : 'rgba(255,255,255,0.2)'}
                      style={{ transition: 'fill 400ms ease, r 400ms ease' }}
                    />
                  );
                })}
              </svg>

              {/* central node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[104px] h-[104px] rounded-full border border-[#00d2ff]/30 bg-[#07090e]/80 backdrop-blur-sm grid place-items-center text-center px-2">
                <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-[#00d2ff] leading-tight">
                  RAGUL
                  <br />
                  <span className="text-[color:var(--dim)]">WORKFLOW</span>
                </span>
                <span
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: '0 0 40px rgba(0,210,255,0.18) inset' }}
                  aria-hidden="true"
                />
              </div>

              {/* tool nodes */}
              {TOOLS.map((tool, i) => {
                const [x, y] = tool.place;
                const isActive = i === active;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-label={`${tool.name} — ${tool.group}`}
                    aria-pressed={isActive}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 focus-visible:outline-offset-4"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span
                      className="grid place-items-center w-11 h-11 sm:w-13 sm:h-13 rounded-[10px] border bg-[#0a0e13] transition-all duration-400"
                      style={{
                        borderColor: isActive ? 'rgba(0,210,255,0.6)' : 'rgba(255,255,255,0.09)',
                        boxShadow: isActive
                          ? '0 0 26px rgba(0,210,255,0.28)'
                          : '0 8px 22px rgba(0,0,0,0.4)',
                        transform: isActive ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      <ToolLogo name={tool.logo} className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </span>

                    {/* label appears on hover / focus */}
                    <span
                      className={`whitespace-nowrap font-mono text-[0.5625rem] sm:text-[0.625rem] tracking-[0.16em] uppercase transition-all duration-300 ${
                        isActive
                          ? 'text-[#00d2ff] opacity-100'
                          : 'text-[color:var(--dim)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                      }`}
                    >
                      {tool.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile / tablet: elegant grid system */}
            <ul className="md:hidden grid grid-cols-1 min-[480px]:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07]">
              {TOOLS.map((tool, i) => {
                const isActive = i === active;
                return (
                  <li key={tool.id}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={isActive}
                      className="w-full h-full text-left px-3.5 py-4 flex items-center gap-3 transition-colors duration-300"
                      style={{ background: isActive ? '#0d1117' : '#07090e' }}
                    >
                      <span
                        className="grid place-items-center w-9 h-9 rounded-[8px] border flex-none transition-colors duration-300"
                        style={{
                          borderColor: isActive ? 'rgba(0,210,255,0.5)' : 'rgba(255,255,255,0.08)',
                        }}
                      >
                        <ToolLogo name={tool.logo} className="w-5 h-5 text-white" />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-heading text-[0.8125rem] font-medium leading-tight truncate transition-colors ${
                            isActive ? 'text-white' : 'text-[#cbd5e1]'
                          }`}
                        >
                          {tool.name}
                        </span>
                        <span className="block font-mono text-[0.5625rem] tracking-[0.14em] uppercase text-[color:var(--dim)] mt-0.5 truncate">
                          {tool.group}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="md:hidden t-meta mt-4">
              Select a tool to see how it is used.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}