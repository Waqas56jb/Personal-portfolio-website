import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Close mobile menu when clicking outside or on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && window.innerWidth < 1024) {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinks && hamburger && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[998] lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav className={`fixed top-0 left-0 w-full py-5 bg-white/95 dark:bg-[#0d1220]/85 backdrop-blur-[10px] shadow-sm z-[1000] transition-all ${
        isScrolled ? 'py-[15px] shadow-md' : ''
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-xl sm:text-2xl lg:text-[1.8rem] font-bold text-dark dark:text-[#e5e7eb] font-serif flex items-center hover:text-primary transition-colors"
          data-aos="fade-right"
        >
          <span>WN</span>
          <span className="text-primary">.</span>
        </a>

        <div className={`nav-links flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 lg:static lg:flex-row lg:w-auto lg:h-auto lg:bg-transparent lg:dark:bg-transparent fixed top-[70px] sm:top-20 left-0 w-full h-[calc(100vh-70px)] sm:h-[calc(100vh-80px)] bg-white dark:bg-[#0b1220] flex-col justify-start pt-6 sm:pt-8 lg:pt-0 lg:justify-center transition-all duration-300 ease-in-out z-[999] overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link font-medium text-sm sm:text-base lg:text-[0.95rem] relative text-secondary dark:text-[#e2e8f0] transition-colors px-3 sm:px-4 py-2 sm:py-2.5 rounded-md hover:bg-primary/10 dark:hover:bg-primary/20 w-full sm:w-auto text-center sm:text-left ${
                activeSection === link.href.substring(1) ? 'text-primary bg-primary/10 dark:bg-primary/20' : ''
              }`}
              data-aos="fade-down"
              data-aos-delay={100 + index * 50}
            >
              {link.label}
              <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 sm:left-0 sm:transform-none h-0.5 bg-primary transition-all ${
                activeSection === link.href.substring(1) ? 'w-[80%] sm:w-full' : 'w-0'
              }`} />
            </a>
          ))}
          <a
            href="/assets/Rana Waqas Naveed Data Science CV.pdf"
            download
            className="btn-primary px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-[0.85rem] md:text-[0.9rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-md transition-all whitespace-nowrap mt-2 lg:mt-0 ml-0 lg:ml-2 w-full sm:w-auto text-center"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            Download CV
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="border-none bg-transparent text-secondary dark:text-[#e2e8f0] text-xl ml-3 cursor-pointer hover:text-primary transition-colors p-2"
            aria-label="Toggle dark mode"
            aria-pressed={isDark}
            title="Toggle theme"
            data-aos="fade-left"
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
          <div
            className="hamburger flex lg:hidden flex-col gap-1.5 cursor-pointer z-[1001]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-aos="fade-left"
          >
            <div className={`w-6 h-0.5 bg-dark dark:bg-[#e5e7eb] transition-all ${
              isMobileMenuOpen ? 'rotate-45 translate-x-1 translate-y-1' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-dark dark:bg-[#e5e7eb] transition-all ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`} />
            <div className={`w-6 h-0.5 bg-dark dark:bg-[#e5e7eb] transition-all ${
              isMobileMenuOpen ? '-rotate-45 translate-x-1 -translate-y-1' : ''
            }`} />
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
