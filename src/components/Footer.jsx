import React from 'react';
import { ArrowUp } from 'lucide-react';
import { handleAnchorClick, scrollToTop } from '../lib/scroll';
import { IDENTITY, FOOTER_LINKS } from '../site.config';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#05070a] pt-14 pb-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8">
          {/* Wordmark + roles */}
          <div className="md:col-span-5">
            <a
              href="#hero"
              onClick={(e) => handleAnchorClick(e, '#hero')}
              className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white hover:text-[#00d2ff] transition-colors"
            >
              {IDENTITY.WORDMARK}
            </a>
            <ul className="mt-4 space-y-1">
              {IDENTITY.ROLES.map((role) => (
                <li key={role} className="t-meta">
                  {role}
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="md:col-span-4">
            <p className="t-meta">Navigate</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="font-heading text-sm text-[#94a3b8] hover:text-[#00d2ff] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Back to top */}
          <div className="md:col-span-3 md:text-right">
            <button type="button" onClick={scrollToTop} className="btn-secondary group">
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
            <p className="t-meta mt-5 md:ml-auto max-w-[24ch]">
              {IDENTITY.LOCATION_SHORT} — open to data, business &amp; creative roles
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="t-meta">&copy; 2026 Ragul. Built with curiosity.</p>
          <p className="t-meta">
            Designed, drawn and built by Ragul.{' '}
            <span aria-hidden="true">{IDENTITY.SIGNATURE_EMOJI}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}