import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import useActiveSection from '../hooks/useActiveSection';
import { scrollToId } from '../lib/scroll';
import { IDENTITY, NAV_LINKS } from '../site.config';

const SECTION_IDS = ['hero', ...NAV_LINKS.map((l) => l.href.slice(1))];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  /* A link tapped while the overlay was open, deferred until the page unlocks. */
  const pendingTarget = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock the page while the mobile overlay is open. */
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      /*
       * The lock makes `window.scrollTo` a no-op, so a link tapped inside the
       * overlay must be scrolled to only after the page can move again.
       */
      const target = pendingTarget.current;
      pendingTarget.current = null;
      if (target) requestAnimationFrame(() => scrollToId(target));
    };
  }, [open]);

  /* Escape closes, focus moves into and back out of the overlay. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    const first = panelRef.current?.querySelector('a[href], button');
    first?.focus();

    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, href) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (open) {
      /* Wait for the scroll lock to be released before moving the page. */
      pendingTarget.current = href;
      setOpen(false);
      return;
    }
    scrollToId(href);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-3 sm:py-5 pointer-events-none">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => go(e, '#hero')}
            className="pointer-events-auto group inline-flex items-center gap-2 font-display font-extrabold tracking-tight text-white transition-colors hover:text-[#00d2ff]"
          >
            <span className="text-xl sm:text-2xl">{IDENTITY.WORDMARK}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] shadow-[0_0_10px_#00d2ff] transition-transform group-hover:scale-125" />
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className={`pointer-events-auto hidden lg:flex items-center gap-1 px-4 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 ${
              scrolled
                ? 'bg-[#0a0e13]/85 border-[#00d2ff]/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                : 'bg-[#0a0e13]/45 border-white/10'
            }`}
          >
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-3 py-1.5 text-[11px] font-mono tracking-[0.18em] transition-colors ${
                    isActive ? 'text-[#00d2ff]' : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0.5 h-[1.5px] bg-[#00d2ff] transition-all duration-300 ${
                      isActive ? 'w-3/4' : 'w-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Status + CTA */}
          <div className="hidden lg:flex items-center gap-3 pointer-events-auto">
            <span className="pill-status">
              <span className="status-dot" aria-hidden="true" />
              <span className="hidden xl:inline">{IDENTITY.AVAILABILITY}</span>
              <span className="xl:hidden">Open to work</span>
            </span>
            <a
              href="#contact"
              onClick={(e) => go(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-heading font-semibold tracking-[0.08em] uppercase text-[#05070a] bg-gradient-to-r from-[#00d2ff] to-[#38bdf8] transition-shadow hover:shadow-[0_0_22px_rgba(0,210,255,0.4)]"
            >
              <span>Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="pointer-events-auto lg:hidden inline-grid place-items-center w-10 h-10 rounded-full border border-white/10 bg-[#0a0e13]/80 backdrop-blur-md text-white"
          >
            {open ? <X className="w-4 h-4 text-[#00d2ff]" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        ref={panelRef}
        className={`lg:hidden fixed inset-0 z-40 bg-[#07090e] flex flex-col transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span
          className="absolute inset-0 grid-field opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-[22%] mx-auto h-[320px] max-w-[420px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,210,255,0.14) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
          aria-hidden="true"
        />

        {/* Spacer for the fixed header */}
        <div className="h-[calc(var(--nav-h)_+_8px)] flex-none" />

        <nav aria-label="Mobile" className="relative flex-1 flex flex-col justify-center px-6 sm:px-10">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li key={link.label} className="border-b border-white/[0.06]">
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="flex items-baseline gap-4 py-4 font-display text-[clamp(1.6rem,7vw,2.4rem)] font-bold tracking-[-0.02em] text-white active:text-[#00d2ff] transition-colors"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0)' : 'translateY(10px)',
                    transition: `opacity 420ms ease ${i * 55 + 80}ms, transform 420ms ease ${
                      i * 55 + 80
                    }ms, color 200ms ease`,
                  }}
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.2em] text-[#00d2ff]">
                    {link.index}
                  </span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#collaboration"
            onClick={(e) => go(e, '#collaboration')}
            className="btn-primary mt-8 self-start"
          >
            <span>Let&rsquo;s create something</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <div className="mt-8 flex items-center gap-3">
            <span className="pill-status">
              <span className="status-dot" aria-hidden="true" />
              {IDENTITY.AVAILABILITY}
            </span>
            <span className="t-meta">{IDENTITY.LOCATION_SHORT}</span>
          </div>
        </nav>
      </div>
    </>
  );
}