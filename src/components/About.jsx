import React, { useEffect, useRef } from 'react';
import SectionHead from './SectionHead';
import IdentityMark from './IdentityMark';
import useReducedMotion from '../hooks/useReducedMotion';
import { gsap, revealLines, reveal } from '../lib/motion';
import { CONTACT, IDENTITY } from '../site.config';

export default function About() {
  const sectionRef = useRef(null);
  const markRef = useRef(null);
  const statementRef = useRef(null);
  const bodyRef = useRef(null);
  const metaRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(statementRef.current, statementRef.current);
      reveal(bodyRef.current?.children, bodyRef.current, {
        y: 22,
        stagger: 0.1,
        start: 'top 88%',
      });
      reveal(metaRef.current?.children, metaRef.current, {
        y: 14,
        stagger: 0.06,
        start: 'top 92%',
      });

      const mark = markRef.current;
      if (!mark || reduced) return;

      const letter = mark.querySelector('[data-idm="letter"]');
      const guides = mark.querySelector('[data-idm="guides"]');
      const nodes = mark.querySelectorAll('[data-idm="nodes"] circle');
      const satellites = mark.querySelector('[data-idm="satellites"]');

      gsap.set(nodes, { scale: 0, transformOrigin: 'center' });
      gsap.set(satellites, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: mark,
            start: 'top 84%',
            end: 'bottom 62%',
            scrub: 0.8,
          },
        })
        .fromTo(guides, { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
        .fromTo(
          letter,
          { strokeDasharray: 900, strokeDashoffset: 900, opacity: 0.25 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.6, ease: 'none' },
          0.1
        )
        .to(nodes, { scale: 1, duration: 0.5, stagger: 0.06, ease: 'back.out(2.4)' }, 0.5)
        .to(satellites, { opacity: 1, duration: 0.8 }, 0.9);

      /* Slow rotation + parallax drift of the whole mark. */
      gsap.to(mark, {
        rotate: 360,
        transformOrigin: '50% 50%',
        duration: 120,
        ease: 'none',
        repeat: -1,
      });

      gsap.to(mark, {
        yPercent: -7,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" ref={sectionRef} className="section" aria-labelledby="about-title">
      <div
        className="glow glow-cyan w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] left-[-12%] top-[12%]"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionHead index="01" label="About" meta="Point of view // Creative + analytical" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Statement + copy */}
          <div className="lg:col-span-7 xl:col-span-7">
            <h2 id="about-title" ref={statementRef} className="t-section text-white">
              <span data-reveal-line>
                <span>Creative instinct.</span>
              </span>
              <span data-reveal-line>
                <span>
                  Analytical <span className="text-[#00d2ff]">thinking</span>.
                </span>
              </span>
              <span data-reveal-line>
                <span>One perspective.</span>
              </span>
            </h2>

            <div ref={bodyRef} className="mt-8 sm:mt-10 flex flex-col gap-6 max-w-[58ch]">
              <p className="t-body">
                I&rsquo;m a creative thinker who loves turning ideas into things people can see, use and connect with.
              </p>
              <p className="t-body">
                ◈ My world started with design interfaces, websites and visual storytelling.Now I&rsquo;m exploring the exciting space between creativity, technology, data and business.
              </p>
              <p className="t-body">
                ⌘ I enjoy learning, experimenting, solving problems and working with good people. Always curious, never afraid to start something new.
              </p>
              <p className="t-body text-white/90">
                <strong className="font-semibold text-white">
                  A creative mind, a curious learner and always a work in progress.
                </strong>{' '}
                <span aria-hidden="true">⟡</span>
              </p>
            </div>

            <div
              ref={metaRef}
              className="mt-10 sm:mt-14 pt-6 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5"
            >
              <div>
                <p className="t-meta">Based in</p>
                <p className="mt-1.5 font-heading text-sm text-white">{IDENTITY.LOCATION}</p>
              </div>
              <div>
                <p className="t-meta">Focus</p>
                <p className="mt-1.5 font-heading text-sm text-white">
                  Data, business &amp; creative
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="t-meta">Status</p>
                <p className="mt-1.5 font-heading text-sm text-[#00d2ff] flex items-center gap-2">
                  <span className="status-dot" aria-hidden="true" />
                  Open to work
                </p>
              </div>
              <div className="col-span-2 sm:col-span-3 pt-1">
                <p className="t-meta">Connect</p>
                <div className="mt-2 flex flex-col items-start gap-2">
                  {CONTACT.LINKEDIN_URL ? (
                    <a
                      href={CONTACT.LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading text-sm text-white transition-colors hover:text-[#00d2ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff]/50 rounded-sm"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                  {CONTACT.RESUME_URL ? (
                    <a
                      href={CONTACT.RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-heading text-sm text-[#00d2ff] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d2ff]/50 rounded-sm"
                    >
                      View resume
                      <span aria-hidden="true" className="text-xs">
                        ↗
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Identity graphic */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[440px] aspect-square">
              <div
                className="absolute inset-[12%] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0,210,255,0.12) 0%, transparent 68%)',
                  filter: 'blur(50px)',
                }}
                aria-hidden="true"
              />
              <div ref={markRef} className="absolute inset-0 grid place-items-center">
                <IdentityMark className="w-[82%] h-[82%]" />
              </div>
              <p className="t-meta absolute left-0 top-1/2 -translate-y-1/2 hidden xl:block">
                <span className="block">Identity system</span>
                <span className="block text-[#00d2ff]">R / 01</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}