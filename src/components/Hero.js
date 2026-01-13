import React from 'react';
import { FaLinkedinIn, FaGithub, FaMedium, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  const socialLinks = [
    { href: 'https://www.linkedin.com/in/waqas-naveed-630297247/', icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: 'https://github.com/Waqas56jb', icon: FaGithub, label: 'GitHub' },
    { href: 'https://medium.com/@waqas56jb', icon: FaMedium, label: 'Medium' },
    { href: 'https://twitter.com/', icon: FaTwitter, label: 'Twitter' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 relative overflow-hidden bg-[#f8fafc] dark:bg-[#0b1220] z-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Text Content */}
          <div className="flex-[2] w-full text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] mb-3 sm:mb-4 leading-tight" data-aos="fade-up" data-aos-delay="300">
              <span className="block text-lg sm:text-xl lg:text-2xl font-normal font-sans text-accent mb-1.5 sm:mb-2 md:mb-2.5">
                Hello, I'm
              </span>
              <span className="block text-primary dark:text-[#e5e7eb] font-serif font-bold">
                Waqas Naveed
              </span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8 max-w-[600px] mx-auto lg:mx-0 text-secondary dark:text-[#e2e8f0] leading-relaxed font-sans" data-aos="fade-up" data-aos-delay="400">
              Transforming raw data into intelligent solutions through cutting-edge machine learning and artificial intelligence. Specializing in AI/ML, Data Science, Data Engineering, and full-stack development with 3+ years of experience delivering production-ready solutions for international clients.
            </p>
            
            {/* Buttons and Social - Only visible on desktop, hidden on mobile */}
            <div className="hidden lg:block">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-6 sm:mb-8 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="500">
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark transition-all inline-flex items-center justify-center gap-2"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-white dark:bg-[#0f172a] text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all inline-flex items-center justify-center gap-2"
                >
                  Contact Me
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="600">
                <span className="font-medium text-sm sm:text-base text-secondary dark:text-[#e2e8f0]">Follow me:</span>
                <div className="flex gap-3 sm:gap-4">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#0f172a] flex items-center justify-center text-secondary dark:text-[#e5e7eb] shadow-sm hover:bg-primary hover:text-white transition-all"
                      >
                        <IconComponent />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Profile Image (appears after intro on mobile, side-by-side on desktop) */}
          <div className="flex-1 w-full flex justify-center items-center" data-aos="fade-left" data-aos-delay="500">
            <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px]">
              {/* Profile Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-[#0f172a]">
                <div className="relative w-full aspect-[5/6] overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-[#0f172a] dark:to-[#1e293b]">
                  <img
                    src="/profile1.png"
                    alt="Waqas Naveed"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Buttons and Social - Only visible on mobile, below image */}
        <div className="lg:hidden mt-6 sm:mt-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-6 sm:mb-8 justify-center" data-aos="fade-up" data-aos-delay="600">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark transition-all inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-white dark:bg-[#0f172a] text-primary border-2 border-primary hover:bg-primary hover:text-white transition-all inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Contact Me
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center" data-aos="fade-up" data-aos-delay="700">
            <span className="font-medium text-sm sm:text-base text-secondary dark:text-[#e2e8f0]">Follow me:</span>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#0f172a] flex items-center justify-center text-secondary dark:text-[#e5e7eb] shadow-sm hover:bg-primary hover:text-white transition-all"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
