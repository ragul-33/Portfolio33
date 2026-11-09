import React from 'react';

/**
 * A single cross-fading layer. Hoisted out of the component so React can keep
 * the same element identity between renders (CSS transitions stay smooth).
 */
function Layer({ show, children }) {
  return (
    <g
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translate(0,0) scale(1)' : 'translate(0,10px) scale(0.96)',
        transformOrigin: '160px 160px',
        transition: 'opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {children}
    </g>
  );
}

/**
 * The visual system that evolves across the six thinking steps.
 * Each stage is a separate layer; the section cross-fades between them as the
 * reader scrolls. Drawn from the same primitives as the identity mark —
 * lines, nodes, circles — so the section belongs to the same system.
 */
export default function SystemCanvas({ stage = 0, className = '' }) {
  const stroke = '#00d2ff';
  const soft = 'rgba(0,210,255,0.24)';
  const faint = 'rgba(255,255,255,0.10)';

  return (
    <svg
      viewBox="0 0 320 320"
      className={className}
      role="img"
      aria-label={`Abstract visual system, stage ${stage + 1} of 6.`}
      fill="none"
    >
      {/* 01 OBSERVE — a single point, read closely */}
      <Layer show={stage === 0}>
        <circle cx="160" cy="160" r="72" stroke={soft} strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="160" cy="160" r="44" stroke={faint} strokeWidth="1" />
        <circle cx="160" cy="160" r="7" fill={stroke} />
        <circle cx="160" cy="160" r="18" stroke={stroke} strokeWidth="1" opacity="0.6" />
        <line x1="160" y1="60" x2="160" y2="104" stroke={soft} />
        <line x1="160" y1="216" x2="160" y2="260" stroke={soft} />
        <line x1="60" y1="160" x2="104" y2="160" stroke={soft} />
        <line x1="216" y1="160" x2="260" y2="160" stroke={soft} />
      </Layer>

      {/* 02 QUESTION — the opening, and the doubt */}
      <Layer show={stage === 1}>
        <path
          d="M128 118a34 34 0 1 1 44 46v18"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="172" cy="206" r="4" fill={stroke} />
        <line x1="96" y1="232" x2="224" y2="232" stroke={faint} />
        <line x1="96" y1="232" x2="128" y2="176" stroke={soft} />
        <line x1="224" y1="232" x2="196" y2="248" stroke={soft} />
        <circle cx="96" cy="232" r="3" fill={stroke} />
        <circle cx="224" cy="232" r="3" fill="rgba(255,255,255,0.35)" />
      </Layer>

      {/* 03 EXPLORE — many directions, none decided */}
      <Layer show={stage === 2}>
        {[
          [160, 62, 160, 108],
          [232, 108, 200, 138],
          [246, 176, 206, 172],
          [216, 240, 186, 200],
          [160, 258, 160, 212],
          [104, 240, 134, 200],
          [74, 176, 114, 172],
          [88, 108, 120, 138],
          [74, 108, 128, 152],
          [246, 108, 192, 152],
          [74, 244, 130, 190],
          [246, 244, 190, 190],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 3 === 0 ? stroke : soft}
            strokeWidth={i % 3 === 0 ? 1.6 : 1}
            strokeLinecap="round"
          />
        ))}
        <circle cx="160" cy="160" r="16" stroke={stroke} strokeWidth="1.4" />
        <circle cx="160" cy="160" r="4" fill={stroke} />
      </Layer>

      {/* 04 DESIGN — one direction, resolved into a system */}
      <Layer show={stage === 3}>
        <rect x="72" y="72" width="176" height="176" stroke={stroke} strokeWidth="1.6" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`v${i}`} x1={72 + i * 44} y1="72" x2={72 + i * 44} y2="248" stroke={faint} />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`h${i}`} x1="72" y1={72 + i * 44} x2="248" y2={72 + i * 44} stroke={faint} />
        ))}
        <line x1="72" y1="160" x2="248" y2="160" stroke={stroke} strokeWidth="1.2" />
        <line x1="160" y1="72" x2="160" y2="248" stroke={stroke} strokeWidth="1.2" />
        <circle cx="160" cy="160" r="5" fill={stroke} />
      </Layer>

      {/* 05 REFINE — noise removed, detail kept */}
      <Layer show={stage === 4}>
        <rect x="96" y="96" width="128" height="128" stroke={stroke} strokeWidth="1.6" />
        {[0, 1, 2].map((i) => (
          <line key={`v${i}`} x1={96 + i * 64} y1="96" x2={96 + i * 64} y2="224" stroke={faint} />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`h${i}`} x1="96" y1={96 + i * 64} x2="224" y2={96 + i * 64} stroke={faint} />
        ))}
        <circle cx="160" cy="160" r="34" stroke={soft} strokeWidth="1" />
        <circle cx="160" cy="160" r="6" fill={stroke} />
        {[
          [96, 96],
          [224, 96],
          [96, 224],
          [224, 224],
        ].map(([cx, cy], i) => (
          <rect key={i} x={cx - 4} y={cy - 4} width="8" height="8" fill={stroke} />
        ))}
        <line x1="78" y1="160" x2="96" y2="160" stroke={soft} />
        <line x1="224" y1="160" x2="242" y2="160" stroke={soft} />
      </Layer>

      {/* 06 BUILD — the system becomes a real thing */}
      <Layer show={stage === 5}>
        <rect x="64" y="64" width="192" height="192" stroke={stroke} strokeWidth="1.8" />
        <rect x="96" y="96" width="128" height="128" stroke={faint} strokeWidth="1" />
        <line x1="64" y1="160" x2="256" y2="160" stroke={stroke} strokeWidth="1.1" />
        <line x1="160" y1="64" x2="160" y2="256" stroke={stroke} strokeWidth="1.1" />
        <circle cx="160" cy="160" r="22" stroke={soft} strokeWidth="1" />
        <circle cx="160" cy="160" r="7" fill={stroke} />
        {[
          [64, 64],
          [256, 64],
          [64, 256],
          [256, 256],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill={stroke} />
            <line
              x1={cx}
              y1={cy}
              x2={cx < 160 ? cx - 26 : cx + 26}
              y2={cy < 160 ? cy - 26 : cy + 26}
              stroke={soft}
            />
            <circle
              cx={cx < 160 ? cx - 26 : cx + 26}
              cy={cy < 160 ? cy - 26 : cy + 26}
              r="3"
              fill="rgba(255,255,255,0.4)"
            />
          </g>
        ))}
      </Layer>
    </svg>
  );
}