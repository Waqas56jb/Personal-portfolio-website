import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <a
      href="#home"
      onClick={(e) => {
        e.preventDefault();
        scrollToTop();
      }}
      className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl opacity-0 invisible transition-all z-[999] shadow-md hover:bg-primary-dark hover:-translate-y-1 ${
        isVisible ? 'opacity-100 visible' : ''
      }`}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </a>
  );
};

export default BackToTop;
