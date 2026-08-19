import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-[104px] right-[34px] z-[65] flex h-11 w-11 items-center justify-center rounded-xl text-white transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
      style={{
        background: 'linear-gradient(135deg,#22D3EE,#2563EB)',
        boxShadow: '0 14px 34px -14px rgba(37,99,235,0.9)',
      }}
    >
      <FaArrowUp className="text-[13px]" />
    </button>
  );
};

export default BackToTop;
