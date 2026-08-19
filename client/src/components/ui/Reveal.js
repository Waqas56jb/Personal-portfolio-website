import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll reveal driven by IntersectionObserver.
 * Adds `.is-visible` once, so nothing re-animates on scroll-back.
 * A failsafe timer guarantees content appears even if the observer never fires.
 */
const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    // Never leave content hidden, whatever the environment does.
    const failsafe = setTimeout(() => setVisible(true), 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(node);

    return () => {
      clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
