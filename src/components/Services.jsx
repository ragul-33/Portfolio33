import React, { useEffect, useRef, useState } from 'react';
import SectionHead from './SectionHead';
import { SERVICES, SERVICE_GROUPS } from '../data/content';
import { ArrowUpRight } from 'lucide-react';
import { handleAnchorClick } from '../lib/scroll';
import { gsap, revealLines, reveal } from '../lib/motion';

export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, headingRef.current);
      reveal(rowsRef.current?.children, rowsRef.current, {
        y: 22,
        stagger: 0.055,
        start: 'top 88%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section" aria-labelledby="services-title">
      <div
        className="glow glow-cyan w-[400px] h-[400px] sm:w-[520px] sm:h-[520px] right-[-10%] bottom-[6%]"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionHead
          index="05"
          label="Services"
          meta="Data / business / creative // 09 areas"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Heading block */}
          <div className="lg:col-span-5 xl:col-span-5">
            <h2 id="services-title" ref={headingRef} className="t-section text-white">
              <span data-reveal-line>
                <span>What I can</span>
              </span>
              <span data-reveal-line>
                <span>
                  help <span className="text-[#00d2ff]">with</span>
                </span>
              </span>
            </h2>

            <div className="mt-8 sm:mt-10 max-w-[42ch]">
              <p className="t-body">
                Different problems need different shapes. Some need a cleaner spreadsheet, some a
                clearer process, some a stronger interface.
              </p>
              <p className="t-body mt-4 text-[#cbd5e1]">
                Some of this is demonstrated work. Some is capability I&rsquo;m actively
                developing. I&rsquo;ll be explicit about which is which.
              </p>
            </div>

            <a
              href="#collaboration"
              onClick={(e) => handleAnchorClick(e, '#collaboration')}
              className="btn-secondary group mt-8"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Editorial index, grouped by practice */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div ref={rowsRef}>
              {SERVICE_GROUPS.map((group) => {
                const groupServices = SERVICES.filter((service) => service.group === group.id);
                return (
                  <div key={group.id} className="mb-10 last:mb-0" style={{ '--group-accent': group.accent }}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-white/[0.07]">
                      <p
                        className="font-mono text-[0.625rem] tracking-[0.22em] uppercase"
                        style={{ color: group.accent }}
                      >
                        {group.label}
                      </p>
                      <p className="font-mono text-[0.5625rem] tracking-[0.16em] uppercase text-[color:var(--dim)]">
                        {group.note}
                      </p>
                    </div>

                    <ul className="border-t border-white/[0.03]">
                      {groupServices.map((service) => {
                        const index = SERVICES.findIndex((s) => s.id === service.id);
                        const isActive = index === active;
                        return (
                          <li key={service.id} className="relative border-b border-white/[0.07]">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                              style={{
                                background:
                                  'linear-gradient(to right, rgba(0,210,255,0.07) 0%, rgba(0,210,255,0) 78%)',
                                opacity: isActive ? 1 : 0,
                              }}
                            />

                            <button
                              type="button"
                              aria-expanded={isActive}
                              aria-controls={`service-${service.id}`}
                              onMouseEnter={() => setActive(index)}
                              onFocus={() => setActive(index)}
                              onClick={() => setActive((prev) => (prev === index ? -1 : index))}
                              className="group relative w-full text-left py-5 sm:py-6 pl-1 pr-1 sm:pr-2"
                            >
                              {/* the line that draws across on hover */}
                              <span
                                aria-hidden="true"
                                className="absolute left-0 bottom-0 h-px w-full origin-left transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{
                                  background: `linear-gradient(to right, ${group.accent}, ${group.accent}00)`,
                                  transform: `scaleX(${isActive ? 1 : 0})`,
                                }}
                              />

                              <span className="flex items-center gap-4 sm:gap-8">
                                <span
                                  className={`font-mono text-[0.6875rem] tracking-[0.2em] transition-colors duration-300 ${
                                    isActive ? 'text-[#00d2ff]' : 'text-[color:var(--dim)]'
                                  }`}
                                >
                                  {service.id}
                                </span>
                                <span
                                  className={`flex-1 font-display font-bold tracking-[-0.02em] leading-[1.1] transition-all duration-300 text-[clamp(1.05rem,3.2vw,1.7rem)] ${
                                    isActive
                                      ? 'text-white translate-x-1.5'
                                      : 'text-[#94a3b8] group-hover:text-white'
                                  }`}
                                >
                                  {service.title}
                                </span>
                                <span
                                  aria-hidden="true"
                                  className={`shrink-0 transition-all duration-300 ${
                                    isActive
                                      ? 'text-[#00d2ff] opacity-100'
                                      : 'text-[color:var(--dim)] opacity-0 group-hover:opacity-100'
                                  }`}
                                >
                                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </span>
                              </span>
                            </button>

                            <div
                              id={`service-${service.id}`}
                              role="region"
                              hidden={!isActive}
                              className="relative pb-6 pl-8 sm:pl-[4.6rem] pr-2"
                            >
                              <p className="t-body text-[0.95rem] max-w-[54ch]">{service.text}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            <p className="t-meta mt-6 leading-relaxed">
              Scope and timeline are agreed per project — no fixed packages, no invented promises.
              Analysis and reporting work is offered at a developing level, supported by a design,
              documentation and web-build foundation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
