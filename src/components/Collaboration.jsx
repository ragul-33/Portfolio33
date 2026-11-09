import React, { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import SectionHead from './SectionHead';
import { handleAnchorClick } from '../lib/scroll';
import { gsap, revealLines, reveal } from '../lib/motion';
import { CONTACT } from '../site.config';

export default function Collaboration() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, headingRef.current, { start: 'top 80%' });
      reveal(bodyRef.current?.children, bodyRef.current, {
        y: 22,
        stagger: 0.1,
        start: 'top 86%',
      });
      reveal(notesRef.current?.children, notesRef.current, {
        y: 14,
        stagger: 0.08,
        start: 'top 92%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collaboration"
      ref={sectionRef}
      className="section relative"
      aria-labelledby="collaboration-title"
    >
      <div
        className="glow glow-blue w-[560px] h-[560px] sm:w-[820px] sm:h-[820px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"
        aria-hidden="true"
      />
      <div className="grid-field absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <SectionHead index="06" label="Let's create" meta="The invitation // open channel" />

        <div className="max-w-[62rem] mx-auto text-center">
          <h2 id="collaboration-title" ref={headingRef} className="t-section text-white">
            <span data-reveal-line>
              <span>LET&rsquo;S CREATE</span>
            </span>
            <span data-reveal-line>
              <span>
                SOMETHING<span className="text-[#00d2ff]">.</span>
              </span>
            </span>
          </h2>

          <div ref={bodyRef} className="mt-8 sm:mt-10 flex flex-col items-center gap-5">
            <p className="t-lead max-w-[34ch] sm:max-w-[46ch]">
              Have an idea, a brand, a website, a visual problem, a dataset to make sense of — or
              something completely different?
            </p>
            <p className="t-body text-center">
              Let&rsquo;s turn it into something worth experiencing.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, '#contact')}
              className="btn-primary group"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a href={`mailto:${CONTACT.EMAIL}`} className="btn-secondary group">
              <Mail className="w-4 h-4" />
              <span>Contact me</span>
            </a>
          </div>

          <ul
            ref={notesRef}
            className="mt-14 sm:mt-20 pt-7 border-t border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-center gap-x-8 gap-y-4"
          >
            {[
              'Direct contact — you work with me',
              'Scope agreed per project',
              'Remote, worldwide',
            ].map((note) => (
              <li key={note} className="t-meta flex items-center gap-2.5">
                <span className="status-dot" aria-hidden="true" />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}