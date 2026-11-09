import React from 'react';

/**
 * A small abstract composition per capability. Never a fake product shot —
 * pure geometry that responds to the selected item.
 */
export default function CapabilityGlyph({ name, active = true, className = '' }) {
  const stroke = active ? '#00d2ff' : 'rgba(148,163,184,0.55)';
  const faint = active ? 'rgba(0,210,255,0.28)' : 'rgba(148,163,184,0.22)';

  const common = {
    fill: 'none',
    stroke,
    strokeWidth: 1.6,
    strokeLinecap: 'square',
    style: { transition: 'stroke 420ms ease' },
  };

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      style={{ transition: 'opacity 420ms ease' }}
    >
      {/* frame */}
      <rect x="14" y="14" width="212" height="212" fill="none" stroke={faint} strokeWidth="1" />
      <circle cx="120" cy="120" r="86" fill="none" stroke={faint} strokeWidth="1" strokeDasharray="2 8" />

      {name === 'grid' && (
        <g {...common}>
          <rect x="60" y="60" width="120" height="120" />
          <line x1="120" y1="60" x2="120" y2="180" stroke={faint} />
          <line x1="60" y1="120" x2="180" y2="120" stroke={faint} />
          <circle cx="120" cy="120" r="6" fill={stroke} stroke="none" />
        </g>
      )}

      {name === 'bars' && (
        <g {...common}>
          <line x1="46" y1="184" x2="194" y2="184" stroke={faint} />
          <rect x="56" y="112" width="22" height="72" fill={faint} stroke="none" />
          <rect x="90" y="76" width="22" height="108" fill={faint} stroke="none" />
          <rect x="124" y="52" width="22" height="132" fill={faint} stroke="none" />
          <rect x="158" y="128" width="22" height="56" fill={faint} stroke="none" />
          <line x1="46" y1="128" x2="194" y2="128" stroke={stroke} strokeDasharray="4 5" />
        </g>
      )}

      {name === 'brackets' && (
        <g {...common}>
          <path d="M92 62 L58 62 L58 178 L92 178" />
          <path d="M148 62 L182 62 L182 178 L148 178" />
          <line x1="106" y1="96" x2="134" y2="96" stroke={faint} />
          <line x1="106" y1="120" x2="134" y2="120" stroke={faint} />
          <line x1="106" y1="144" x2="134" y2="144" stroke={faint} />
          <circle cx="120" cy="120" r="4" fill={stroke} stroke="none" />
        </g>
      )}

      {name === 'rings' && (
        <g {...common}>
          <circle cx="120" cy="120" r="62" />
          <circle cx="120" cy="120" r="40" />
          <circle cx="120" cy="120" r="18" />
          <line x1="120" y1="34" x2="120" y2="206" stroke={faint} />
          <line x1="34" y1="120" x2="206" y2="120" stroke={faint} />
        </g>
      )}

      {name === 'squares' && (
        <g {...common}>
          <rect x="58" y="58" width="56" height="56" />
          <rect x="126" y="58" width="56" height="56" stroke={faint} />
          <rect x="58" y="126" width="56" height="56" stroke={faint} />
          <rect x="126" y="126" width="56" height="56" fill={faint} stroke="none" />
        </g>
      )}

      {name === 'stack' && (
        <g {...common}>
          <rect x="52" y="140" width="136" height="46" />
          <rect x="66" y="98" width="108" height="34" stroke={faint} />
          <rect x="80" y="56" width="80" height="34" stroke={faint} />
          <line x1="52" y1="128" x2="188" y2="128" stroke={stroke} />
        </g>
      )}

      {name === 'waves' && (
        <g {...common}>
          <path d="M42 120 C 74 74, 106 166, 138 120 S 202 74, 210 120" />
          <path d="M42 92 C 74 46, 106 138, 138 92" stroke={faint} />
          <path d="M42 148 C 74 102, 106 194, 138 148 S 202 102, 210 148" stroke={faint} />
          <circle cx="138" cy="120" r="5" fill={stroke} stroke="none" />
        </g>
      )}

      {name === 'orbit' && (
        <g {...common}>
          <ellipse cx="120" cy="120" rx="74" ry="30" />
          <ellipse cx="120" cy="120" rx="74" ry="30" transform="rotate(60 120 120)" stroke={faint} />
          <ellipse cx="120" cy="120" rx="74" ry="30" transform="rotate(-60 120 120)" stroke={faint} />
          <circle cx="120" cy="120" r="16" fill={faint} />
          <circle cx="194" cy="120" r="5" fill={stroke} stroke="none" />
        </g>
      )}
    </svg>
  );
}