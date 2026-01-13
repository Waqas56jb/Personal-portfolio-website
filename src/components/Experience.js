import React from 'react';
import { FaBriefcase, FaBuilding } from 'react-icons/fa';

const Experience = () => {
  const experiences = [
    {
      title: 'General Manager & AI Engineer',
      company: 'PropertyReply (UK-based)',
      period: '2023 – Present',
      description: 'Leading AI initiatives and technical operations at PropertyReply, a UK-based technology company. Collaborating with Saqib Hussain to develop and deploy innovative AI solutions for property management and real estate applications.',
      bullets: [
        'Architecting and implementing end-to-end AI systems for property analytics and automation',
        'Managing technical teams and coordinating cross-functional projects',
        'Developing scalable ML models for real estate data analysis and prediction',
        'Establishing best practices for AI deployment and MLOps pipelines',
        'Driving strategic technical decisions and technology roadmap planning',
      ],
      icon: FaBuilding,
      delay: 0,
    },
    {
      title: 'AI Engineer & Data Scientist (Freelance)',
      company: 'Fiverr & International Clients',
      period: '2022 – Present',
      description: 'Delivering 100+ AI/ML projects for international clients through Fiverr and long-term partnerships. Specializing in machine learning, data science, and full-stack AI integration across multiple industries.',
      bullets: [
        'Completed 100+ projects in AI/ML, Data Science, and Data Engineering',
        'Developed production-ready ML models for healthcare, finance, and e-commerce',
        'Built end-to-end data pipelines and ETL systems for large-scale data processing',
        'Integrated AI capabilities into web and mobile applications',
        'Maintained long-term relationships with international clients',
      ],
      icon: FaBriefcase,
      delay: 100,
    },
    {
      title: 'Data Science Intern',
      company: 'Industry Internship',
      period: 'Summer 2022',
      description: 'Worked on predictive analytics projects, developed data pipelines, and created stakeholder-ready dashboards. Gained hands-on experience in production ML systems and data visualization.',
      bullets: [
        'Developed predictive models for business analytics',
        'Performed feature engineering and data preprocessing',
        'Created interactive dashboards for data visualization',
        'Collaborated with cross-functional teams on data-driven solutions',
      ],
      icon: FaBriefcase,
      delay: 200,
    },
  ];

  return (
    <section id="experience" className="section-padding bg-gradient-to-b from-blue-50/30 to-white dark:from-[#0f172a] dark:to-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Career journey
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            Professional Experience
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            3+ years of experience delivering AI/ML solutions and managing technical operations
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="relative mx-auto max-w-[900px] pl-6 sm:pl-8">
          <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary-dark" />
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={index}
                className="relative mb-8 sm:mb-10 pl-6 sm:pl-8"
                data-aos="fade-up"
                data-aos-delay={exp.delay}
              >
                <div className="absolute -left-[2px] sm:-left-[3px] top-1.5 sm:top-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-primary rounded-full shadow-[0_0_0_4px_rgba(37,99,235,0.15)] flex items-center justify-center border-2 border-white dark:border-[#0f172a]" aria-hidden="true">
                  <IconComponent className="text-white text-xs" />
                </div>
                <div className="bg-white dark:bg-[#0f172a] rounded-xl shadow-md hover:shadow-lg p-5 sm:p-6 border border-blue-100 dark:border-blue-900/30 transition-all">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <IconComponent className="text-lg sm:text-xl" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl mb-1 sm:mb-1.5 text-dark dark:text-[#e5e7eb] font-semibold">{exp.title}</h3>
                      <p className="text-sm sm:text-base text-primary dark:text-blue-400 font-medium mb-1">{exp.company}</p>
                      <span className="text-xs sm:text-sm text-accent dark:text-[#94a3b8] inline-block mb-2 sm:mb-2.5">{exp.period}</span>
                    </div>
                  </div>
                  <p className="mb-3 sm:mb-4 text-sm sm:text-base text-secondary dark:text-[#e2e8f0] leading-relaxed">{exp.description}</p>
                  {exp.bullets.length > 0 && (
                    <ul className="list-disc list-inside mt-2 sm:mt-3 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-secondary dark:text-[#e2e8f0]">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="leading-relaxed">{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
