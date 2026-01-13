import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedinIn, FaGithub, FaMedium, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      
      toast.success('Thank you for your message! I will get back to you soon.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { href: 'https://www.linkedin.com/in/waqas-naveed-630297247/', icon: FaLinkedinIn, label: 'LinkedIn' },
    { href: 'https://github.com/Waqas56jb', icon: FaGithub, label: 'GitHub' },
    { href: 'https://medium.com/@waqas56jb', icon: FaMedium, label: 'Medium' },
    { href: 'https://twitter.com/', icon: FaTwitter, label: 'Twitter' },
  ];

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-white to-blue-50/30 dark:from-[#0b1220] dark:to-[#0f172a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Get in touch
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            Contact Me
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            Available for freelance projects, long-term collaborations, and full-time opportunities
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12">
          <div className="flex-1 w-full" data-aos="fade-right">
            <h3 className="text-xl sm:text-2xl lg:text-[1.8rem] mb-4 sm:mb-5 text-dark dark:text-[#e5e7eb] font-bold">
              Let's talk about your project
            </h3>
            <p className="mb-6 sm:mb-8 text-sm sm:text-base text-accent dark:text-[#94a3b8] leading-relaxed">
              I'm available for freelance work, long-term international client partnerships, and full-time positions. Whether you need AI/ML solutions, data engineering, web development, or mobile applications, feel free to reach out. I specialize in delivering production-ready solutions that drive business value.
            </p>
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <FaEnvelope />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg mb-1 text-dark dark:text-[#e5e7eb] font-semibold">Email</h4>
                  <a
                    href="mailto:waqas56jb@gmail.com"
                    className="text-sm sm:text-base text-accent dark:text-[#94a3b8] hover:text-primary transition-colors"
                  >
                    waqas56jb@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <FaPhone />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg mb-1 text-dark dark:text-[#e5e7eb] font-semibold">Phone</h4>
                  <a
                    href="tel:+92477603854"
                    className="text-sm sm:text-base text-accent dark:text-[#94a3b8] hover:text-primary transition-colors"
                  >
                    +92 477 603854
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg mb-1 text-dark dark:text-[#e5e7eb] font-semibold">Location</h4>
                  <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8]">Faisalabad, Pakistan</p>
                  <p className="text-xs sm:text-sm text-accent dark:text-[#94a3b8] mt-1">Available for Remote Work Worldwide</p>
                </div>
              </div>
            </div>
            <div className="mt-8 sm:mt-10">
              <h4 className="text-base sm:text-lg mb-4 text-dark dark:text-[#e5e7eb] font-semibold">Follow Me</h4>
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
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#0f172a] flex items-center justify-center text-dark dark:text-[#e5e7eb] shadow-sm hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-md transition-all border border-blue-100 dark:border-blue-900/30"
                    >
                      <IconComponent />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <form
            className="flex-1 w-full bg-white dark:bg-[#0f172a] p-6 sm:p-8 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900/30"
            onSubmit={handleSubmit}
            data-aos="fade-left"
          >
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 font-medium text-sm sm:text-base text-dark dark:text-[#e5e7eb]">
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
                className="w-full px-4 py-3 border border-blue-200 dark:border-[#1e293b] rounded-lg text-sm sm:text-base transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 font-medium text-sm sm:text-base text-dark dark:text-[#e5e7eb]">
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
                className="w-full px-4 py-3 border border-blue-200 dark:border-[#1e293b] rounded-lg text-sm sm:text-base transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="subject" className="block mb-2 font-medium text-sm sm:text-base text-dark dark:text-[#e5e7eb]">
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
                className="w-full px-4 py-3 border border-blue-200 dark:border-[#1e293b] rounded-lg text-sm sm:text-base transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="message" className="block mb-2 font-medium text-sm sm:text-base text-dark dark:text-[#e5e7eb]">
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
                className="w-full px-4 py-3 border border-blue-200 dark:border-[#1e293b] rounded-lg text-sm sm:text-base transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-sans resize-y min-h-[150px] bg-white dark:bg-[#0f172a] text-dark dark:text-[#e2e8f0]"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 rounded-lg font-semibold text-sm sm:text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-1 hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaEnvelope /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
