import React from 'react';
import Reveal from './Reveal';

const SectionHeading = ({ eyebrow, title, accent, description, align = 'left', id }) => {
  const centered = align === 'center';

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <Reveal>
        <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="mt-4 text-[1.75rem] leading-[1.12] sm:text-[2.1rem] lg:text-[2.5rem]">
          {title} {accent && <span className="accent-text">{accent}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={140}>
          <p className="muted mt-4 text-[0.95rem] leading-relaxed">{description}</p>
        </Reveal>
      )}
    </div>
  );
};

export default SectionHeading;
