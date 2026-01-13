import React from 'react';

const Hero = () => {
  const techIcons = [
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', alt: 'Python', delay: 0 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', alt: 'TensorFlow', delay: 1 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', alt: 'PyTorch', delay: 2 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', alt: 'Flask', delay: 3 },
    { src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', delay: 4 },
  ];

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/waqas-naveed-630297247/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://github.com/Waqas56jb', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://medium.com/@waqas56jb', icon: 'fab fa-medium', label: 'Medium' },
    { href: 'https://twitter.com/', icon: 'fab fa-twitter', label: 'Twitter' },
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
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1200px] flex items-center gap-12 relative z-10 max-lg:flex-col max-lg:text-center max-lg:gap-10">
        <div className="flex-1">
          <h4 className="text-xl font-medium text-accent mb-5 uppercase tracking-wider" data-aos="fade-up" data-aos-delay="200">
            AI & Data Science Specialist
          </h4>
          <h1 className="text-[3.5rem] mb-4 leading-tight max-lg:text-[3rem] max-md:text-[2.5rem] max-sm:text-[2rem]" data-aos="fade-up" data-aos-delay="300">
            <span className="block text-2xl font-normal font-sans text-accent mb-2.5">
              Hello, I'm
            </span>
            <span className="block text-dark dark:text-[#e5e7eb] bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              Waqas Naveed
            </span>
          </h1>
          <p className="text-lg mb-8 max-w-[600px] text-secondary dark:text-[#e2e8f0] max-lg:mx-auto" data-aos="fade-up" data-aos-delay="400">
            Transforming raw data into intelligent solutions through cutting-edge machine learning and artificial intelligence techniques.
          </p>
          <div className="flex gap-5 mb-10 max-lg:justify-center max-md:flex-col max-md:gap-4" data-aos="fade-up" data-aos-delay="500">
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, '#projects')}
              className="btn-primary px-8 py-3 rounded-lg font-semibold text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-1 hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-outline px-8 py-3 rounded-lg font-semibold text-[0.95rem] bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              Contact Me
            </a>
          </div>
          <div className="flex items-center gap-4 max-lg:justify-center" data-aos="fade-up" data-aos-delay="600">
            <span className="font-medium text-accent">Follow me:</span>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-white dark:bg-[#0f172a] flex items-center justify-center text-dark dark:text-[#e5e7eb] shadow-sm hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-md transition-all"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center" data-aos="fade-left" data-aos-delay="700">
          <div className="relative w-full max-w-[500px] rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
              alt="Data Science"
              className="w-full h-auto object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute top-0 left-0 w-full h-full">
              {techIcons.map((icon, index) => {
                const positions = [
                  { top: '10%', left: '10%' },
                  { top: '70%', left: '15%' },
                  { top: '20%', right: '10%' },
                  { bottom: '10%', left: '20%' },
                  { top: '60%', right: '15%' },
                ];
                return (
                  <div
                    key={index}
                    className="absolute w-[60px] h-[60px] bg-white dark:bg-[#0f172a] rounded-full flex items-center justify-center shadow-md animate-float opacity-90"
                    style={{
                      ...positions[index],
                      animationDelay: `${icon.delay}s`,
                    }}
                  >
                    <img src={icon.src} alt={icon.alt} className="w-[70%] h-[70%] object-contain" loading="lazy" />
                  </div>
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
