import React from 'react';

const Experience = () => {
  const experiences = [
    {
      title: 'AI Engineer (Freelance)',
      period: '2023 – Present',
      description: 'Delivered end-to-end ML solutions: data pipelines, model training, deployment, and monitoring across NLP and CV.',
      bullets: [
        'Built real-time inference APIs with Flask/FastAPI and Docker',
        'Implemented CI/CD and experiment tracking (MLflow)',
      ],
      delay: 0,
    },
    {
      title: 'Data Science Intern',
      period: 'Summer 2022',
      description: 'Developed predictive models, performed feature engineering, and produced stakeholder-ready dashboards.',
      bullets: [],
      delay: 100,
    },
  ];

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            Career journey
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="relative mx-auto max-w-[900px] pl-6">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-dark" />
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative mb-8 pl-6"
              data-aos="fade-up"
              data-aos-delay={exp.delay}
            >
              <div className="absolute -left-[2px] top-1.5 w-3.5 h-3.5 bg-primary rounded-full shadow-[0_0_0_4px_rgba(37,99,235,0.15)]" aria-hidden="true" />
              <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-md p-5">
                <h3 className="text-xl mb-1.5 text-dark dark:text-[#e5e7eb]">{exp.title}</h3>
                <span className="text-sm text-accent dark:text-[#94a3b8] inline-block mb-2.5">{exp.period}</span>
                <p className="mb-2 text-secondary dark:text-[#e2e8f0]">{exp.description}</p>
                {exp.bullets.length > 0 && (
                  <ul className="list-disc list-inside mt-2 space-y-1 text-secondary dark:text-[#e2e8f0]">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
