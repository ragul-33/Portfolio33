import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/motion';

/**
 * A single hairline that traces the whole page — the thread that ties the
 * sections into one continuous read.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
        if (pctRef.current) {
          pctRef.current.textContent = String(Math.round(self.progress * 100)).padStart(2, '0');
        }
        setVisible(self.progress > 0.002);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-px pointer-events-none"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 400ms ease' }}
    >
      <div
        ref={barRef}
        className="h-px w-full origin-left"
        style={{
          transform: 'scaleX(0)',
          background: 'linear-gradient(to right, #00d2ff, #38bdf8 55%, rgba(0,210,255,0.25))',
          boxShadow: '0 0 10px rgba(0,210,255,0.5)',
        }}
      />
      <span
        ref={pctRef}
        className="absolute right-3 top-1 font-mono text-[9px] tracking-[0.2em] text-[#00d2ff]/80"
      >
        00
      </span>
    </div>
  );
}