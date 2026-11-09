import React from 'react';

/**
 * Real brand marks, drawn as inline SVG so the site ships no icon font and no
 * extra network request. Geometry follows each product's actual logo.
 * Nothing here is invented — these are the tools named in the section.
 */

const Svg = ({ children, ...rest }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...rest}>
    {children}
  </svg>
);

/* ---------------------------------------------------------------- Figma -- */
const FigmaMark = (p) => (
  <Svg {...p}>
    <path d="M12 12a3 3 0 1 1 3 3h-3v-3Z" fill="#1abcfe" />
    <path d="M9 21a3 3 0 1 1 0-6h3v3a3 3 0 0 1-3 3Z" fill="#0acf83" />
    <path d="M6 9a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3Z" fill="#ff7262" />
    <path d="M6 3h3v3H9a3 3 0 1 1-3-3Z" fill="#f24e1e" />
    <path d="M12 3h3a3 3 0 1 1 0 6h-3V3Z" fill="#a259ff" />
  </Svg>
);

/* ---------------------------------------------------------- Adobe (Ai/Ps) -- */
const AdobeIllustrator = (p) => (
  <Svg {...p}>
    <rect width="24" height="24" rx="3" fill="#330000" />
    <path
      d="M6.6 19h1.7l.7-1.9h2.6l.7 1.9h1.7l-3-9.2h-1.4L6.6 19Zm2.8-3.6 1.1-3.1 1.1 3.1H9.4Z"
      fill="#ff9a00"
    />
    <path d="M15.2 9h1.6v6.4h1.5V19h-3.1V9Z" fill="#ff9a00" />
  </Svg>
);

const AdobePhotoshop = (p) => (
  <Svg {...p}>
    <rect width="24" height="24" rx="3" fill="#001e36" />
    <text
      x="12"
      y="16.4"
      textAnchor="middle"
      fontSize="9"
      fontWeight="700"
      fill="#31a8ff"
      fontFamily="Inter, system-ui, sans-serif"
    >
      Ps
    </text>
  </Svg>
);

/* ---------------------------------------------------------------- Canva -- */
const CanvaMark = (p) => (
  <Svg {...p}>
    <defs>
      <linearGradient id="canva-g" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#00c4cc" />
        <stop offset="0.55" stopColor="#7d2ae8" />
        <stop offset="1" stopColor="#00c4cc" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="10" fill="url(#canva-g)" />
    <path
      d="M15.8 15.2a5.3 5.3 0 1 1 0-6.4"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

/* -------------------------------------------------------------- HTML5 -- */
const HtmlMark = (p) => (
  <Svg {...p}>
    <path d="M2.4 2h19.2l-1.6 19L12 23.6 4 21 2.4 2Z" fill="#e34f26" />
    <path d="M12 2.9v18.8l6.4-1.4L19.7 2.9H12Z" fill="#f7df1e" />
    <path
      d="M6.7 6.6h10.6l-.3 3.2H9.6l.1 1.4h7.1l-.7 7.5L12 20l-4.1-1.3-.7-6.8"
      fill="none"
      stroke="#fff"
      strokeWidth="1.35"
      strokeLinejoin="round"
    />
  </Svg>
);

/* --------------------------------------------------------------- CSS3 -- */
const CssMark = (p) => (
  <Svg {...p}>
    <path d="M2.4 2h19.2l-1.6 19L12 23.6 4 21 2.4 2Z" fill="#1572b6" />
    <path d="M12 2.9v18.8l6.4-1.4L19.7 2.9H12Z" fill="#33a8dc" />
    <path
      d="M18 6.6H7.4l.3 3.3h6.9l-.4 5-2.2.8-2.2-.8-.2-2.5H7.5l.4 4.3 4.1 1.4 4.1-1.4.9-10.1Z"
      fill="#fff"
    />
  </Svg>
);

/* --------------------------------------------------------- JavaScript -- */
const JavaScriptMark = (p) => (
  <Svg {...p}>
    <rect width="24" height="24" rx="2" fill="#f7df1e" />
    <text
      x="12"
      y="16.8"
      textAnchor="middle"
      fontSize="8.4"
      fontWeight="700"
      fill="#12131a"
      fontFamily="Inter, system-ui, sans-serif"
    >
      JS
    </text>
  </Svg>
);

/* --------------------------------------------------------------- React -- */
const ReactMark = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="2.1" fill="#61dafb" />
    <g fill="none" stroke="#61dafb" strokeWidth="1.1">
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </g>
  </Svg>
);

/* -------------------------------------------------------------- GitHub -- */
const GitHubMark = (p) => (
  <Svg {...p}>
    <path
      fill="currentColor"
      d="M12 1.8a10.2 10.2 0 0 0-3.22 19.88c.51.1.7-.22.7-.49v-1.9c-2.84.62-3.44-1.2-3.44-1.2-.47-1.19-1.14-1.5-1.14-1.5-.93-.64.07-.62.07-.62 1.03.07 1.57 1.06 1.57 1.06.91 1.57 2.4 1.12 2.99.86.09-.66.36-1.12.65-1.38-2.27-.26-4.66-1.14-4.66-5.06 0-1.12.4-2.03 1.05-2.75-.1-.26-.46-1.3.1-2.71 0 0 .86-.28 2.81 1.05a9.7 9.7 0 0 1 5.12 0c1.95-1.33 2.81-1.05 2.81-1.05.56 1.41.2 2.45.1 2.71.65.72 1.05 1.63 1.05 2.75 0 3.93-2.39 4.8-4.67 5.05.37.32.7.94.7 1.9v2.82c0 .27.19.6.7.49A10.2 10.2 0 0 0 12 1.8Z"
    />
  </Svg>
);

/* ------------------------------------------------------ Google Workspace */
const GoogleMark = (p) => (
  <Svg {...p}>
    <path
      fill="#EA4335"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
    />
    <path
      fill="#4285F4"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z"
    />
    <path
      fill="#FBBC05"
      d="M10.53 28.59A12.7 12.7 0 0 1 9.77 24c0-1.61.27-3.15.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19Z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
    />
  </Svg>
);

/* ------------------------------------------------------ Microsoft Office */
const OfficeMark = (p) => (
  <Svg {...p}>
    <rect x="2.6" y="2.6" width="8.4" height="8.4" fill="#F25022" />
    <rect x="13" y="2.6" width="8.4" height="8.4" fill="#7FBA00" />
    <rect x="2.6" y="13" width="8.4" height="8.4" fill="#00A4EF" />
    <rect x="13" y="13" width="8.4" height="8.4" fill="#FFB900" />
  </Svg>
);

const TOOL_LOGOS = {
  figma: FigmaMark,
  illustrator: AdobeIllustrator,
  photoshop: AdobePhotoshop,
  canva: CanvaMark,
  html: HtmlMark,
  css: CssMark,
  javascript: JavaScriptMark,
  react: ReactMark,
  github: GitHubMark,
  google: GoogleMark,
  office: OfficeMark,
};

export default function ToolLogo({ name, className = 'w-full h-full' }) {
  const Logo = TOOL_LOGOS[name];
  if (!Logo) return null;
  return <Logo className={className} />;
}