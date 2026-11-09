import React from 'react';

/**
 * The header every section shares: `01 / ABOUT` on the left, a quiet
 * monospace note on the right, separated by a single hairline.
 */
export default function SectionHead({ index, label, meta, id }) {
  return (
    <div className="section-head" id={id}>
      <p className="section-index">
        <span>{index}</span>
        <span aria-hidden="true">/</span>
        <span>{label}</span>
      </p>
      <p className="section-meta">{meta}</p>
    </div>
  );
}