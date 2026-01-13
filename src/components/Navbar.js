import React, { useState, useEffect } from 'react';

const Navbar = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
    { href: '#certifications', label: 'Certifications' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full py-5 bg-white/95 dark:bg-[#0d1220]/85 backdrop-blur-[10px] shadow-sm z-[1000] transition-all ${
      isScrolled ? 'py-[15px] shadow-md' : ''
    }`}>
      <div className="container mx-auto px-4 max-w-[1200px] flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-[1.8rem] font-bold text-dark dark:text-[#e5e7eb] font-serif flex items-center"
          data-aos="fade-right"
        >
          <span>WN</span>
          <span className="text-primary">.</span>
        </a>

        <div className={`nav-links flex items-center gap-8 md:static md:flex-row md:w-auto md:h-auto md:bg-transparent md:dark:bg-transparent fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-white dark:bg-[#0b1220] flex-col justify-center gap-8 transition-all z-[999] ${
          isMobileMenuOpen ? 'left-0' : '-left-full'
        }`}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link font-medium text-[0.95rem] relative text-secondary dark:text-[#e2e8f0] transition-colors ${
                activeSection === link.href.substring(1) ? 'text-primary' : ''
              }`}
              data-aos="fade-down"
              data-aos-delay={100 + index * 50}
            >
              {link.label}
              <span className={`absolute bottom-[-5px] left-0 h-0.5 bg-primary transition-all ${
                activeSection === link.href.substring(1) ? 'w-full' : 'w-0'
              }`} />
            </a>
          ))}
          <a
            href="/assets/Rana Waqas Naveed Data Science CV.pdf"
            download
            className="btn-primary px-5 py-2.5 rounded-lg font-semibold text-[0.9rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-md transition-all"
            data-aos="fade-down"
            data-aos-delay="600"
          >
            Download CV
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="border-none bg-transparent text-secondary dark:text-[#e2e8f0] text-[1.1rem] ml-3 cursor-pointer hover:text-primary transition-colors"
            aria-label="Toggle dark mode"
            aria-pressed={isDark}
            title="Toggle theme"
            data-aos="fade-left"
          >
            <i className={isDark ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
          <div
            className="hamburger hidden md:hidden flex-col gap-1.5 cursor-pointer z-[1001]"
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
  );
};

export default Navbar;
