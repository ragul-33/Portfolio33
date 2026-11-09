import React, { useEffect, useRef, useState } from 'react';
import { Send, Copy, Check, MapPin, Clock } from 'lucide-react';
import SectionHead from './SectionHead';
import { InstagramIcon, LinkedInIcon } from './SocialIcons';
import { gsap, revealLines, reveal } from '../lib/motion';
import { CONTACT, IDENTITY, MAILTO_SUBJECT } from '../site.config';

const FALLBACK_LINK =
  'inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-[#cbd5e1] transition-colors hover:border-[#00d2ff]/40 hover:text-white';

function Field({ id, label, type = 'text', value, onChange, placeholder, required = true, ...rest }) {
  const Tag = type === 'textarea' ? 'textarea' : 'input';
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-meta">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={type === 'textarea' ? undefined : type}
        rows={type === 'textarea' ? 5 : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={rest.autoComplete}
        className="w-full px-4 py-3 bg-[#07090e] border border-white/10 text-[#f1f5f9] text-[0.9375rem] placeholder:text-[color:var(--dim)] transition-colors duration-300 focus:border-[#00d2ff]/60 focus:outline-none resize-none"
        {...rest}
      />
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [delivery, setDelivery] = useState(null);
  const [messageCopied, setMessageCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealLines(headingRef.current, headingRef.current, { start: 'top 82%' });
      reveal(formRef.current?.children, formRef.current, {
        y: 24,
        stagger: 0.08,
        start: 'top 88%',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(t);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const subject = `${MAILTO_SUBJECT} — from ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    const mailto = `mailto:${CONTACT.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      CONTACT.EMAIL
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setDelivery({ subject, body, mailto, gmail });
    setMessageCopied(false);

    /* A real user gesture is required. Gmail compose is the reliable browser
       path; the panel below also exposes the mail-app and copy fallbacks. */
    const link = document.createElement('a');
    link.href = gmail;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async function copyDraft() {
    if (!delivery) return;
    const draft = `To: ${CONTACT.EMAIL}\nSubject: ${delivery.subject}\n\n${delivery.body}`;

    try {
      await navigator.clipboard.writeText(draft);
      setMessageCopied(true);
      return;
    } catch {
      /* Clipboard API can be blocked outside a focused/secure tab. */
    }

    try {
      const area = document.createElement('textarea');
      area.value = draft;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-1000px';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      const copied = document.execCommand('copy');
      area.remove();
      setMessageCopied(copied);
    } catch {
      setMessageCopied(false);
    }
  }

  const socials = [
    { label: 'Instagram', url: CONTACT.INSTAGRAM_URL, Icon: InstagramIcon, handle: '@ragul_.33' },
    {
      label: 'LinkedIn',
      url: CONTACT.LINKEDIN_URL,
      Icon: LinkedInIcon,
      handle: CONTACT.LINKEDIN_URL.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, ''),
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section" aria-labelledby="contact-title">
      <div
        className="glow glow-cyan w-[420px] h-[420px] sm:w-[560px] sm:h-[560px] right-[-8%] top-[4%]"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <SectionHead index="07" label="Contact" meta="Direct line // no middlemen" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Left — identity + channels */}
          <div className="lg:col-span-5 xl:col-span-5">
            <h2 id="contact-title" ref={headingRef} className="t-section text-white">
              <span data-reveal-line>
                <span>HAVE</span>
              </span>
              <span data-reveal-line>
                <span>SOMETHING</span>
              </span>
              <span data-reveal-line>
                <span>IN MIND?</span>
              </span>
            </h2>

            <p className="t-lead mt-8 max-w-[26ch] sm:mt-10">
              Tell me what you&rsquo;re thinking.{' '}
              <span aria-hidden="true">{IDENTITY.SIGNATURE_EMOJI}</span>
            </p>

            {/* Email */}
            <div className="mt-9 border border-white/[0.08] bg-[#0a0e13]/50 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="t-meta">Email</p>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="t-meta inline-flex items-center gap-1.5 hover:text-[#00d2ff] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#00d2ff]" aria-hidden="true" />
                      <span className="text-[#00d2ff]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <a
                href={`mailto:${CONTACT.EMAIL}`}
                className="mt-3 block font-mono text-[0.875rem] sm:text-base text-white hover:text-[#00d2ff] transition-colors break-all"
              >
                {CONTACT.EMAIL}
              </a>
            </div>

            {/* Social */}
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07]">
              {socials.map(({ label, url, Icon, handle }) => (
                <li key={label}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-full flex items-center gap-3 px-4 py-3.5 bg-[#07090e] transition-colors duration-300 hover:bg-[#0d1117] group"
                    >
                      <span className="w-8 h-8 grid place-items-center border border-white/10 text-[#94a3b8] group-hover:border-[#00d2ff]/40 group-hover:text-[#00d2ff] transition-colors">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading text-[0.8125rem] text-white group-hover:text-[#00d2ff] transition-colors">
                          {label}
                        </span>
                        <span className="block font-mono text-[0.625rem] text-[color:var(--dim)] truncate">
                          {handle}
                        </span>
                      </span>
                    </a>
                  ) : (
                    /* Honest placeholder: no invented URL. */
                    <span className="h-full flex items-center gap-3 px-4 py-3.5 bg-[#07090e] opacity-70">
                      <span className="w-8 h-8 grid place-items-center border border-white/10 text-[color:var(--dim)]">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading text-[0.8125rem] text-[color:var(--dim)]">
                          {label}
                        </span>
                        <span className="block font-mono text-[0.5625rem] tracking-[0.14em] text-[color:var(--dim)] uppercase">
                          Add URL in site.config.js
                        </span>
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
              <div className="flex items-center gap-2">
                <dt className="sr-only">Location</dt>
                <MapPin className="w-3.5 h-3.5 text-[#00d2ff]" aria-hidden="true" />
                <dd className="t-meta">{IDENTITY.LOCATION}</dd>
              </div>
              <div className="flex items-center gap-2">
                <dt className="sr-only">Timezone</dt>
                <Clock className="w-3.5 h-3.5 text-[#00d2ff]" aria-hidden="true" />
                <dd className="t-meta">{IDENTITY.TIMEZONE}</dd>
              </div>
            </dl>
          </div>

          {/* Right — the form */}
          <div className="lg:col-span-7 xl:col-span-7">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="border border-white/[0.08] bg-[#0a0e13]/50 backdrop-blur-sm p-5 sm:p-8 flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  id="contact-name"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  maxLength={80}
                />
                <Field
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={120}
                />
              </div>

              <Field
                id="contact-message"
                label="Message"
                type="textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What are you thinking about?"
                maxLength={2000}
              />

              <button type="submit" className="btn-primary group self-start w-full sm:w-auto">
                <span>Send message</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {delivery ? (
                <div className="border border-[#00d2ff]/20 bg-[#00d2ff]/[0.045] p-4 sm:p-5">
                  <p role="status" aria-live="polite" className="t-meta text-[#00d2ff]">
                    Email draft ready
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={delivery.gmail}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={FALLBACK_LINK}
                    >
                      Open Gmail
                    </a>
                    <a href={delivery.mailto} className={FALLBACK_LINK}>
                      Open mail app
                    </a>
                    <button type="button" onClick={copyDraft} className={FALLBACK_LINK}>
                      {messageCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#00d2ff]" aria-hidden="true" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copy message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}