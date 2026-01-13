import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      quote: '"Waqas delivered a robust ML pipeline and deployed it seamlessly to production. Outstanding quality and attention to detail. The solution exceeded our expectations and has been running flawlessly since deployment."',
      name: 'Product Lead',
      role: 'HealthTech Startup',
      delay: 0,
    },
    {
      quote: '"Great communication and engineering rigor. The model exceeded our accuracy targets and the integration was smooth. Waqas is professional, reliable, and delivers on time. Highly recommended for AI/ML projects."',
      name: 'CTO',
      role: 'FinTech Company',
      delay: 100,
    },
    {
      quote: '"Working with Waqas on our data engineering project was excellent. He built scalable pipelines that handle millions of records daily. His expertise in both data science and software engineering is impressive."',
      name: 'Data Engineering Manager',
      role: 'E-commerce Platform',
      delay: 200,
    },
  ];

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-blue-50/30 to-white dark:from-[#0f172a] dark:to-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Client feedback
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            Testimonials
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            What clients and collaborators say about working with me
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] rounded-xl shadow-md hover:shadow-xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 border border-blue-100 dark:border-blue-900/30 relative"
              data-aos="fade-up"
              data-aos-delay={testimonial.delay}
            >
              <div className="absolute top-4 left-4 text-primary/20 dark:text-primary/30">
                <FaQuoteLeft className="text-3xl sm:text-4xl" />
              </div>
              <p className="italic text-sm sm:text-base text-secondary dark:text-[#e2e8f0] mb-4 sm:mb-5 leading-relaxed relative z-10">
                {testimonial.quote}
              </p>
              <div className="flex flex-col text-accent dark:text-[#94a3b8] pt-4 border-t border-blue-100 dark:border-blue-900/30">
                <span className="font-semibold text-base sm:text-lg text-dark dark:text-[#e5e7eb] mb-1">{testimonial.name}</span>
                <span className="text-sm">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
