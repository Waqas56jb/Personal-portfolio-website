import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

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
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg sm:text-xl opacity-0 invisible transition-all z-[999] shadow-lg hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl ${
        isVisible ? 'opacity-100 visible' : ''
      }`}
      aria-label="Back to top"
    >
      <FaArrowUp />
    </a>
  );
};

export default BackToTop;
