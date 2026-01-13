import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaLinkedinIn, FaGithub, FaMedium, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      
      toast.success('Thank you for subscribing to my newsletter!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/waqas-naveed-630297247/', icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: 'https://github.com/Waqas56jb', icon: FaGithub, label: 'GitHub' },
    { href: 'https://medium.com/@waqas56jb', icon: FaMedium, label: 'Medium' },
  ];

  return (
    <footer className="bg-dark dark:bg-[#0b1220] text-white py-20 pb-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-12 sm:mb-16">
          <div className="flex flex-col gap-5">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1 text-[1.8rem] font-bold font-serif text-white hover:text-primary transition-colors"
            >
              <span>WN</span>
              <span className="text-primary">.</span>
            </a>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              AI Engineer & Data Scientist with 3+ years of experience, delivering 100+ AI/ML projects. Creating intelligent solutions through cutting-edge technology for international clients.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary hover:-translate-y-1 transition-all"
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl mb-2.5 text-white font-semibold">Quick Links</h3>
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
            <h3 className="text-xl mb-2.5 text-white font-semibold">Services</h3>
            <ul className="flex flex-col gap-3">
              {['Machine Learning', 'Data Science', 'Data Engineering', 'Web Development', 'Mobile Apps'].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-[#94a3b8] text-sm hover:text-primary hover:pl-1 transition-all">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-xl mb-2.5 text-white font-semibold">Newsletter</h3>
            <p className="text-[#94a3b8] text-sm">Subscribe to my newsletter for the latest updates on AI/ML, Data Science, and technology trends.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex bg-white/10 rounded-lg overflow-hidden border border-white/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="flex-1 px-4 py-3 border-none bg-transparent text-white placeholder:text-[#94a3b8] font-sans outline-none text-sm"
                required
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-12 bg-primary text-white border-none cursor-pointer hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-white/10 gap-4 sm:gap-0 text-center sm:text-left">
          <p className="text-[#94a3b8] text-xs sm:text-sm">
            &copy; 2025 Waqas Naveed. All Rights Reserved. | General Manager & AI Engineer at PropertyReply (UK)
          </p>
          <div className="flex gap-4 sm:gap-5 justify-center">
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
