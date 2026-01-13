import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/waqas-naveed-630297247/', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { href: 'https://github.com/Waqas56jb', icon: 'fab fa-github', label: 'GitHub' },
    { href: 'https://medium.com/@waqas56jb', icon: 'fab fa-medium', label: 'Medium' },
    { href: 'https://twitter.com/', icon: 'fab fa-twitter', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            Get in touch
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            Contact Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="flex gap-12 max-lg:flex-col">
          <div className="flex-1" data-aos="fade-right">
            <h3 className="text-[1.8rem] mb-5 text-dark dark:text-[#e5e7eb]">
              Let's talk about your project
            </h3>
            <p className="mb-8 text-accent dark:text-[#94a3b8] leading-relaxed">
              I'm available for freelance work and full-time positions. Feel free to contact me for any questions or opportunities.
            </p>
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-lg mb-1 text-dark dark:text-[#e5e7eb]">Email</h4>
                  <a
                    href="mailto:waqas56jb@gmail.com"
                    className="text-sm text-accent dark:text-[#94a3b8] hover:text-primary transition-colors"
                  >
                    waqas56jb@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="text-lg mb-1 text-dark dark:text-[#e5e7eb]">Phone</h4>
                  <a
                    href="tel:+92477603854"
                    className="text-sm text-accent dark:text-[#94a3b8] hover:text-primary transition-colors"
                  >
                    +92 477 603854
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-lg mb-1 text-dark dark:text-[#e5e7eb]">Location</h4>
                  <p className="text-sm text-accent dark:text-[#94a3b8]">Faisalabad, Pakistan</p>
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h4 className="text-lg mb-4 text-dark dark:text-[#e5e7eb]">Follow Me</h4>
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
          <form
            className="flex-1 bg-white dark:bg-[#0f172a] p-8 rounded-xl shadow-md"
            onSubmit={handleSubmit}
            data-aos="fade-left"
          >
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 font-medium text-dark dark:text-[#e5e7eb]">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                aria-required="true"
                autoComplete="name"
                className="w-full px-4 py-3 border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 font-medium text-dark dark:text-[#e5e7eb]">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                aria-required="true"
                autoComplete="email"
                className="w-full px-4 py-3 border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="block mb-2 font-medium text-dark dark:text-[#e5e7eb]">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                autoComplete="off"
                className="w-full px-4 py-3 border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block mb-2 font-medium text-dark dark:text-[#e5e7eb]">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                required
                aria-required="true"
                rows="6"
                className="w-full px-4 py-3 border border-[#e2e8f0] dark:border-[#1e293b] rounded-lg text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans resize-y min-h-[150px] bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <button
              type="submit"
              className="btn-primary px-8 py-3 rounded-lg font-semibold text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-1 hover:shadow-md transition-all inline-flex items-center justify-center gap-2 w-full"
            >
              <i className="fas fa-paper-plane"></i> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
