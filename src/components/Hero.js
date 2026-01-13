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
    <section id="home" className="min-h-screen flex items-center pt-20 pb-10 sm:pt-24 sm:pb-12 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50/50 dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
        <div className="flex-1 w-full text-center lg:text-left">
          <h4 className="text-base sm:text-lg lg:text-xl font-medium text-accent mb-4 sm:mb-5 uppercase tracking-wider" data-aos="fade-up" data-aos-delay="200">
            AI Engineer & Data Scientist | 100+ Projects Delivered
          </h4>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] mb-4 leading-tight" data-aos="fade-up" data-aos-delay="300">
            <span className="block text-lg sm:text-xl lg:text-2xl font-normal font-sans text-accent mb-2 sm:mb-2.5">
              Hello, I'm
            </span>
            <span className="block text-dark dark:text-[#e5e7eb] bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Waqas Naveed
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-[600px] mx-auto lg:mx-0 text-secondary dark:text-[#e2e8f0] leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            Transforming raw data into intelligent solutions through cutting-edge machine learning and artificial intelligence. Specializing in AI/ML, Data Science, Data Engineering, and full-stack development with 3+ years of experience delivering production-ready solutions for international clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-8 sm:mb-10 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="500">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
            >
              Contact Me
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="600">
            <span className="font-medium text-sm sm:text-base text-accent">Follow me:</span>
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
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-[#0f172a] flex items-center justify-center text-dark dark:text-[#e5e7eb] shadow-sm hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-md transition-all"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex-1 w-full flex justify-center items-center mt-8 lg:mt-0" data-aos="fade-left" data-aos-delay="700">
          <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px]">
            {/* Profile Image Container - Balanced Design */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <div className="relative w-full aspect-[5/6] overflow-hidden">
                <img
                  src="/profile1.png"
                  alt="Waqas Naveed"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl animate-pulse -z-10" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
