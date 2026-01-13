import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    alert('Thank you for subscribing to my newsletter!');
    setEmail('');
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/waqas-naveed-630297247/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://github.com/Waqas56jb', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://medium.com/@waqas56jb', icon: 'fab fa-medium', label: 'Medium' },
  ];

  return (
    <footer className="bg-dark dark:bg-[#0b1220] text-white py-20 pb-5">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 mb-16 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="flex flex-col gap-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-[1.8rem] font-bold font-serif text-white"
            >
              <span>WN</span>
              <span className="text-primary">.</span>
            </a>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              AI Engineer & Data Scientist creating intelligent solutions through cutting-edge technology.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:-translate-y-1 transition-all"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl mb-2.5 text-white">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(`#${link.toLowerCase()}`);
                      if (element) {
                        window.scrollTo({
                          top: element.offsetTop - 80,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="text-[#94a3b8] text-sm hover:text-primary hover:pl-1 transition-all"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl mb-2.5 text-white">Services</h3>
            <ul className="flex flex-col gap-3">
              {['Machine Learning', 'Data Engineering', 'Model Deployment', 'AI Integration', 'MLOps'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-[#94a3b8] text-sm hover:text-primary hover:pl-1 transition-all">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl mb-2.5 text-white">Newsletter</h3>
            <p className="text-[#94a3b8] text-sm">Subscribe to my newsletter for the latest updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex bg-white/10 rounded-lg overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="flex-1 px-4 py-3 border-none bg-transparent text-white placeholder:text-[#94a3b8] font-sans outline-none"
                required
              />
              <button
                type="submit"
                className="w-12 bg-primary text-white border-none cursor-pointer hover:bg-primary-dark transition-all"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="flex justify-between items-center pt-5 border-t border-white/10 max-md:flex-col max-md:gap-4 max-md:text-center">
          <p className="text-[#94a3b8] text-xs">&copy; 2025 Waqas Naveed. All Rights Reserved.</p>
          <div className="flex gap-5 max-md:justify-center">
            <button type="button" className="text-[#94a3b8] text-xs hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
              Privacy Policy
            </button>
            <button type="button" className="text-[#94a3b8] text-xs hover:text-primary transition-colors bg-transparent border-none cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
