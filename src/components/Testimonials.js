import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: '"Waqas delivered a robust ML pipeline and deployed it seamlessly to production. Outstanding quality."',
      name: 'Product Lead',
      role: 'HealthTech Startup',
      delay: 0,
    },
    {
      quote: '"Great communication and engineering rigor. The model exceeded our accuracy targets."',
      name: 'CTO',
      role: 'FinTech Company',
      delay: 100,
    },
  ];

  return (
    <section id="testimonials" className="section-padding">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            What clients say
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            Testimonials
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] rounded-xl shadow-md p-6"
              data-aos="fade-up"
              data-aos-delay={testimonial.delay}
            >
              <p className="italic text-secondary dark:text-[#e2e8f0] mb-3">{testimonial.quote}</p>
              <div className="flex flex-col text-accent dark:text-[#94a3b8]">
                <span className="font-semibold text-dark dark:text-[#e5e7eb]">{testimonial.name}</span>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
