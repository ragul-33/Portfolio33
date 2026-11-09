import React, { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import SystemCanvas from './SystemCanvas';
import { PROCESS } from '../data/content';
import useReducedMotion from '../hooks/useReducedMotion';
import { gsap, ScrollTrigger, revealLines } from '../lib/motion';

export default function HowIThink() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const stepsRef = useRef(null);
  const railRef = useRef(null);
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, headingRef.current);

      if (reduced || !stepsRef.current) return;

      /* Drive the visual system from the scroll position of the step list. */
      ScrollTrigger.create({
        trigger: stepsRef.current,
        start: 'top 62%',
        end: 'bottom 78%',
        onUpdate: (self) => {
          const next = Math.min(
            PROCESS.length - 1,
            Math.max(0, Math.floor(self.progress * PROCESS.length))
          );
          setStage((prev) => (prev === next ? prev : next));
        },
      });

      /* Each step reveals as it enters. */
      const items = stepsRef.current.querySelectorAll('[data-step]');
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          }
        );
      });

      /* The connecting rail extends as the sequence progresses. */
      if (railRef.current) {
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.6,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" ref={sectionRef} className="section" aria-labelledby="process-title">
      <div
        className="glow glow-blue w-[460px] h-[460px] sm:w-[640px] sm:h-[640px] left-1/2 top-[10%] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionHead
          index="04"
          label="How I think"
          meta="A working sequence // not a manual"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Sticky visual system */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="lg:sticky lg:top-24">
              <h2 id="process-title" ref={headingRef} className="t-section text-white">
                <span data-reveal-line>
                  <span>
                    How <span className="text-[#00d2ff]">I</span>
                  </span>
                </span>
                <span data-reveal-line>
                  <span>think</span>
                </span>
              </h2>

              <div className="relative mt-8 sm:mt-10 aspect-square w-full max-w-[400px]">
                <div
                  className="absolute inset-[14%] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, transparent 70%)',
                    filter: 'blur(46px)',
                  }}
                  aria-hidden="true"
                />
                <SystemCanvas stage={stage} className="relative w-full h-full" />

                <p className="t-meta absolute left-0 bottom-0">
                  Visual system{' '}
                  <span className="text-[#00d2ff]">
                    {String(stage + 1).padStart(2, '0')}
                  </span>{' '}
                  / 06
                </p>
              </div>
            </div>
          </div>

          {/* The sequence */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="relative">
              {/* rail */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.07]"
              >
                <span
                  ref={railRef}
                  className="absolute inset-0 w-px origin-top"
                  style={{
                    background: 'linear-gradient(to bottom, #00d2ff, rgba(0,210,255,0.15))',
                  }}
                />
              </span>

              <ol ref={stepsRef} className="pl-6 sm:pl-9">
                {PROCESS.map((step, i) => {
                  const isCurrent = i === stage;
                  return (
                    <li
                      key={step.id}
                      data-step
                      className="relative pb-12 last:pb-0 lg:pb-[14vh] lg:last:pb-0"
                    >
                      {/* node on the rail */}
                      <span
                        aria-hidden="true"
                        className="absolute -left-6 sm:-left-9 top-1.5 w-2.5 h-2.5 rounded-full border transition-all duration-500"
                        style={{
                          borderColor: isCurrent ? '#00d2ff' : 'rgba(255,255,255,0.18)',
                          background: isCurrent ? '#00d2ff' : '#07090d',
                          boxShadow: isCurrent ? '0 0 14px rgba(0,210,255,0.7)' : 'none',
                        }}
                      />

                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span
                          className={`font-mono text-[0.6875rem] tracking-[0.2em] transition-colors duration-500 ${
                            isCurrent ? 'text-[#00d2ff]' : 'text-[color:var(--dim)]'
                          }`}
                        >
                          {step.id}
                        </span>
                        <h3
                          className={`font-display font-bold tracking-[-0.02em] leading-[1.05] transition-colors duration-500 text-[clamp(1.6rem,5.4vw,2.9rem)] ${
                            isCurrent ? 'text-white' : 'text-[#94a3b8]'
                          }`}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-2.5 sm:mt-3 sm:pl-[3.1rem] t-body text-[0.95rem] sm:text-base">
                        {step.text}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}