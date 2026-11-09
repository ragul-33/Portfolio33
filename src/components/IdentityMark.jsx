import React from 'react';

/**
 * The R identity graphic: an R assembled from construction lines, nodes and
 * circles rather than a drawn letterform. Doubles as the site's identity mark.
 */
export default function IdentityMark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="R identity mark: the letter R drawn as a construction of lines, nodes and circles."
      fill="none"
    >
      <defs>
        <radialGradient id="rm-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#00d2ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rm-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#00d2ff" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* Construction grid */}
      <g stroke="rgba(255,255,255,0.07)" strokeWidth="1" data-idm="guides">
        <line x1="40" y1="110" x2="360" y2="110" />
        <line x1="40" y1="190" x2="360" y2="190" />
        <line x1="40" y1="270" x2="360" y2="270" />
        <line x1="150" y1="40" x2="150" y2="360" />
        <line x1="250" y1="40" x2="250" y2="360" />
      </g>

      {/* Orbit rings */}
      <circle
        cx="200"
        cy="200"
        r="160"
        stroke="rgba(0,210,255,0.14)"
        strokeWidth="1"
        strokeDasharray="2 7"
      />
      <circle
        cx="200"
        cy="200"
        r="128"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Tick marks on the outer ring */}
      <g stroke="rgba(0,210,255,0.35)" strokeWidth="1">
        <line x1="200" y1="36" x2="200" y2="52" />
        <line x1="200" y1="348" x2="200" y2="364" />
        <line x1="36" y1="200" x2="52" y2="200" />
        <line x1="348" y1="200" x2="364" y2="200" />
      </g>

      {/* The letterform */}
      <g stroke="url(#rm-stroke)" strokeWidth="7" strokeLinecap="square" data-idm="letter">
        <line x1="150" y1="110" x2="150" y2="290" />
        <path d="M150 110 H214 A44 44 0 0 1 214 198 H150" />
        <line x1="186" y1="198" x2="252" y2="290" />
      </g>

      {/* Nodes */}
      <g fill="#00d2ff" data-idm="nodes">
        <circle cx="150" cy="110" r="5" />
        <circle cx="150" cy="198" r="5" />
        <circle cx="150" cy="290" r="5" />
        <circle cx="214" cy="110" r="4" />
        <circle cx="258" cy="154" r="4" />
        <circle cx="214" cy="198" r="4" />
        <circle cx="186" cy="198" r="4" />
        <circle cx="252" cy="290" r="5" />
      </g>

      {/* Orbiting satellites */}
      <g data-idm="satellites">
        <circle cx="200" cy="40" r="3.5" fill="#38bdf8" />
        <circle cx="360" cy="200" r="3.5" fill="#38bdf8" />
        <circle cx="200" cy="360" r="3.5" fill="#38bdf8" />
        <circle cx="40" cy="200" r="3.5" fill="#38bdf8" />
      </g>

      {/* Soft core light */}
      <circle cx="200" cy="200" r="120" fill="url(#rm-core)" opacity="0.10" />
    </svg>
  );
}