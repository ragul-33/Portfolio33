import React, { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import CapabilityGlyph from './CapabilityGlyph';
import { CAPABILITIES, DISCIPLINES } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';
import { gsap, revealLines, reveal } from '../lib/motion';

const STATUS_TONE = {
  Demonstrated: '#7dd3fc',
  'Working knowledge': '#00d2ff',
  Developing: '#8b7dff',
  Exploring: '#94a3b8',
};

export default function Capabilities() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const headingRef = useRef(null);
  const lanesRef = useRef(null);
  const lanePanelRef = useRef(null);
  const [active, setActive] = useState(0);
  const [lane, setLane] = useState(0);
  const reduced = useReducedMotion();

  /* Scroll reveal for the list + heading + practice lanes */
  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, headingRef.current);
      reveal(lanesRef.current?.children, lanesRef.current, {
        y: 22,
        stagger: 0.08,
        start: 'top 88%',
      });
      reveal(listRef.current?.children, listRef.current, {
        y: 26,
        stagger: 0.06,
        start: 'top 86%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* The lane panel eases in when the selected practice changes. */
  useEffect(() => {
    if (reduced || !lanePanelRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lanePanelRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [lane, reduced]);

  /* Subtle parallax on the ambient glyph on scroll (desktop only) */
  const glyphRef = useRef(null);
  useEffect(() => {
    if (reduced || !glyphRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(glyphRef.current, {
        yPercent: -6,
        rotate: 6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.4,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  const item = CAPABILITIES[active];
  const currentLane = DISCIPLINES[lane];

  function moveLane(direction) {
    setLane((prev) => (prev + direction + DISCIPLINES.length) % DISCIPLINES.length);
  }

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="section"
      aria-labelledby="capabilities-title"
    >
      <div
        className="glow glow-blue w-[460px] h-[460px] sm:w-[620px] sm:h-[620px] right-[-14%] top-[6%]"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionHead
          index="02"
          label="Capabilities"
          meta="Data / Business / Creative // one profile"
        />

        <div className="max-w-[62rem]">
          <h2 id="capabilities-title" ref={headingRef} className="t-section text-white">
            <span data-reveal-line>
              <span>One profile.</span>
            </span>
            <span data-reveal-line>
              <span>
                Three connected <span className="text-[#00d2ff]">practices</span>.
              </span>
            </span>
          </h2>

          <p className="t-body mt-7 sm:mt-9">
            Creative craft is the foundation. Data and business thinking are the direction
            I&rsquo;m building into it — not separate identities, but connected ways of solving the
            same problem.
          </p>
        </div>

        {/* ── Three connected practices ─────────────────────────────────── */}
        <div className="mt-10 sm:mt-14">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="t-meta">Practices &amp; skills</p>
            <p className="t-meta text-[0.625rem]">
              Select a lane // status is stated honestly
            </p>
          </div>

          <div
            ref={lanesRef}
            role="tablist"
            aria-label="Capability practices"
            className="grid grid-cols-1 sm:grid-cols-3 border-t border-l border-white/[0.08]"
          >
            {DISCIPLINES.map((discipline, i) => {
              const isActive = i === lane;
              return (
                <button
                  key={discipline.id}
                  type="button"
                  role="tab"
                  id={`lane-tab-${discipline.id}`}
                  aria-selected={isActive}
                  aria-controls={`lane-panel-${discipline.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setLane(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') {
                      e.preventDefault();
                      moveLane(1);
                    }
                    if (e.key === 'ArrowLeft') {
                      e.preventDefault();
                      moveLane(-1);
                    }
                  }}
                  className="group relative text-left border-r border-b border-white/[0.08] p-5 sm:p-6 transition-colors duration-400 overflow-hidden"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${discipline.accent}14 0%, rgba(10,14,19,0.35) 62%)`
                      : 'rgba(7,9,13,0.35)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px transition-opacity duration-400"
                    style={{
                      background: `linear-gradient(to right, ${discipline.accent}, transparent)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  <span className="flex items-center justify-between gap-3">
                    <span
                      className="font-mono text-[0.625rem] tracking-[0.22em] uppercase transition-colors duration-300"
                      style={{ color: isActive ? discipline.accent : 'var(--dim)' }}
                    >
                      {String(i + 1).padStart(2, '0')} / {discipline.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                      style={{
                        background: isActive ? discipline.accent : 'rgba(148,163,184,0.35)',
                        boxShadow: isActive ? `0 0 10px ${discipline.accent}` : 'none',
                      }}
                    />
                  </span>
                  <span
                    className={`mt-4 block font-display font-bold tracking-[-0.02em] leading-[1.05] transition-colors duration-300 text-[clamp(1.35rem,3.2vw,1.9rem)] ${
                      isActive ? 'text-white' : 'text-[#94a3b8] group-hover:text-white'
                    }`}
                  >
                    {discipline.title}
                  </span>
                  <span
                    className="mt-2 block font-mono text-[0.5625rem] tracking-[0.16em] uppercase transition-colors duration-300"
                    style={{ color: isActive ? 'rgba(241,245,249,0.68)' : 'var(--dim)' }}
                  >
                    {discipline.groups[0].status} · {discipline.groups[1]?.status}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            ref={lanePanelRef}
            id={`lane-panel-${currentLane.id}`}
            role="tabpanel"
            aria-labelledby={`lane-tab-${currentLane.id}`}
            className="relative border-x border-b border-white/[0.08] bg-[#0a0e13]/40 p-5 sm:p-7 lg:p-8"
            style={{ '--lane-accent': currentLane.accent }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-[-6%] h-64 w-64 rounded-full"
              style={{
                background: `radial-gradient(circle, ${currentLane.accent}18 0%, transparent 70%)`,
                filter: 'blur(46px)',
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
              <div className="lg:col-span-4">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-none">
                    <CapabilityGlyph name={currentLane.glyph} active className="w-full h-full" />
                  </div>
                  <div>
                    <p
                      className="font-mono text-[0.625rem] tracking-[0.2em] uppercase"
                      style={{ color: currentLane.accent }}
                    >
                      Practice / {String(lane + 1).padStart(2, '0')}
                    </p>
                    <p className="mt-2 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      {currentLane.title}
                    </p>
                  </div>
                </div>

                <p className="t-body mt-5 text-[0.9375rem]">{currentLane.summary}</p>
                <p className="mt-4 font-mono text-[0.625rem] leading-relaxed tracking-[0.14em] uppercase text-[color:var(--dim)]">
                  {currentLane.note}
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                  {Object.entries(STATUS_TONE).map(([status, tone]) => (
                    <li
                      key={status}
                      className="flex items-center gap-1.5 font-mono text-[0.5625rem] tracking-[0.12em] uppercase text-[color:var(--dim)]"
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: tone }}
                        aria-hidden="true"
                      />
                      {status}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                {currentLane.groups.map((group) => (
                  <div key={group.status}>
                    <p className="t-meta flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: STATUS_TONE[group.status] ?? currentLane.accent }}
                        aria-hidden="true"
                      />
                      {group.status}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {group.items.map((skill) => (
                        <li
                          key={skill}
                          className="px-2.5 py-1.5 border border-white/[0.08] bg-white/[0.025] font-heading text-[0.75rem] sm:text-[0.8125rem] text-[#cbd5e1] transition-colors duration-300 hover:border-white/20 hover:text-white"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Creative craft in detail ──────────────────────────────────── */}
        <div className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Editorial list */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
              <p className="t-meta text-white/70">Creative craft — selected areas</p>
              <p className="t-meta">
                {String(CAPABILITIES.length).padStart(2, '0')} areas
              </p>
            </div>

            <ul ref={listRef} className="border-t border-white/[0.07]">
              {CAPABILITIES.map((cap, index) => {
                const isActive = index === active;
                return (
                  <li key={cap.id} className="relative">
                    {/* atmospheric glow behind the active row */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0 transition-opacity duration-500"
                      style={{
                        background:
                          'radial-gradient(420px circle at 0% 50%, rgba(0,210,255,0.10) 0%, transparent 68%)',
                        opacity: isActive ? 1 : 0,
                      }}
                    />

                    <button
                      type="button"
                      id={`capability-trigger-${cap.id}`}
                      aria-expanded={isActive}
                      aria-controls={`capability-panel-${cap.id}`}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      className="group relative w-full text-left py-5 sm:py-6 pl-1 pr-2 focus-visible:outline-offset-4"
                    >
                      {/* blue line that appears on hover / active */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] bg-[#00d2ff] origin-top transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          height: 'calc(100% - 2rem)',
                          transform: `translateY(-50%) scaleY(${isActive ? 1 : 0})`,
                          boxShadow: isActive ? '0 0 14px rgba(0,210,255,0.6)' : 'none',
                        }}
                      />

                      <span className="flex items-baseline gap-4 sm:gap-7">
                        <span
                          className={`font-mono text-[0.6875rem] tracking-[0.2em] transition-all duration-300 ${
                            isActive
                              ? 'text-[#00d2ff] translate-x-1'
                              : 'text-[color:var(--dim)] group-hover:text-[#94a3b8]'
                          }`}
                        >
                          {cap.id}
                        </span>

                        <span className="min-w-0">
                          <span
                            className={`block font-display font-bold leading-[1.05] tracking-[-0.02em] transition-all duration-300 text-[clamp(1.25rem,4.4vw,2.35rem)] ${
                              isActive
                                ? 'text-white translate-x-1.5'
                                : 'text-[#94a3b8] group-hover:text-white'
                            }`}
                          >
                            {cap.title}
                          </span>
                          <span
                            className={`mt-1 block font-mono text-[0.625rem] tracking-[0.18em] uppercase transition-colors duration-300 ${
                              isActive ? 'text-[#00d2ff]/80' : 'text-[color:var(--dim)]'
                            }`}
                          >
                            {cap.note}
                          </span>
                        </span>
                      </span>
                    </button>

                    {/* Detail — visible inline on mobile, as the panel everywhere */}
                    <div
                      id={`capability-panel-${cap.id}`}
                      role="region"
                      aria-labelledby={`capability-trigger-${cap.id}`}
                      className="relative pl-1 pb-6 lg:hidden"
                      hidden={!isActive}
                    >
                      <p className="t-body text-[0.95rem]">{cap.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sticky abstract panel — desktop */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-5">
            <div className="sticky top-28 self-start w-full">
              <div
                className="relative border border-white/[0.08] bg-[#0a0e13]/50 backdrop-blur-sm p-8 xl:p-10 overflow-hidden"
                aria-hidden="true"
              >
                <div
                  className="absolute -top-20 -right-16 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-700"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,210,255,0.16) 0%, transparent 70%)',
                    filter: 'blur(46px)',
                  }}
                />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="t-meta">
                    Field <span className="text-[#00d2ff]">{item.id}</span> /{' '}
                    {String(CAPABILITIES.length).padStart(2, '0')}
                  </span>
                  <span className="t-meta text-right max-w-[11rem]">{item.group ?? item.note}</span>
                </div>

                <div ref={glyphRef} className="mt-6 aspect-square w-full max-w-[340px] mx-auto">
                  <CapabilityGlyph name={item.glyph} active className="w-full h-full" />
                </div>

                <p className="relative mt-6 font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                  {item.title}
                </p>
                <p className="relative mt-3 t-body text-[0.95rem]">{item.text}</p>

                <div className="relative mt-7 pt-5 border-t border-white/[0.07] flex items-center justify-between">
                  <span className="t-meta">Creative craft</span>
                  <span className="font-mono text-[0.625rem] tracking-[0.18em] text-[#00d2ff]">
                    {String(active + 1).padStart(2, '0')} /{' '}
                    {String(CAPABILITIES.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
