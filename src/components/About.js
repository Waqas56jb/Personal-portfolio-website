import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('skills');

  const tabs = [
    { id: 'skills', label: 'Main Skills' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
  ];

  const skillsData = [
    { name: 'Machine Learning', percentage: 95 },
    { name: 'Data Engineering', percentage: 90 },
    { name: 'Model Deployment', percentage: 88 },
  ];

  const educationData = [
    {
      title: 'BS Computer Science - AI Specialization',
      period: 'FAST National University (2021-2025)',
    },
    {
      title: 'Advanced Data Science Certification',
      period: 'Coursera (2023)',
    },
  ];

  const experienceData = [
    {
      title: 'AI Engineer (Freelance)',
      period: '2023 - Present',
      description: 'Developed and deployed ML models for various clients',
    },
    {
      title: 'Data Science Intern',
      period: 'Summer 2022',
      description: 'Worked on predictive analytics projects',
    },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            Get to know me
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="flex gap-12 items-center max-lg:flex-col">
          <div className="flex-1" data-aos="fade-right">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/profile2.png"
                alt="About Me"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -right-5 bg-gradient-to-r from-primary to-primary-dark w-[120px] h-[120px] rounded-full flex items-center justify-center text-white shadow-lg max-sm:w-20 max-sm:h-20 max-sm:-bottom-2.5 max-sm:-right-2.5">
                <div className="text-center">
                  <span className="text-[2rem] font-bold block leading-none max-sm:text-2xl">3+</span>
                  <span className="text-sm font-medium block max-sm:text-xs">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1" data-aos="fade-left">
            <h3 className="text-[1.8rem] mb-5 text-dark dark:text-[#e5e7eb]">Who am I?</h3>
            <p className="mb-8 text-lg leading-relaxed text-secondary dark:text-[#e2e8f0]">
              I'm a passionate Computer Science student specializing in Artificial Intelligence and Data Science at FAST National University. With expertise in machine learning, NLP, and generative AI, I build intelligent systems that solve real-world problems.
            </p>
            <p className="mb-8 text-lg leading-relaxed text-secondary dark:text-[#e2e8f0]">
              My approach combines cutting-edge AI techniques with robust software engineering principles to deliver scalable, production-ready solutions. I'm particularly interested in the intersection of deep learning and data engineering.
            </p>
            <div className="flex gap-4 mb-8">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 rounded-lg font-medium cursor-pointer transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-[#f1f5f9] dark:bg-[#0b1220] text-accent dark:text-[#cbd5e1]'
                  }`}
                >
                  {tab.label}
                </div>
              ))}
            </div>
            <div className="mb-8">
              {activeTab === 'skills' && (
                <div className="flex flex-col gap-5">
                  {skillsData.map((skill, index) => (
                    <div key={index} className="mb-4">
                      <div className="font-medium mb-2 text-dark dark:text-[#e5e7eb]">{skill.name}</div>
                      <div className="h-2 bg-[#f1f5f9] dark:bg-[#0b1220] rounded overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary-dark rounded transition-all duration-[1.5s]"
                          style={{ width: `${skill.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'education' && (
                <div className="space-y-5">
                  {educationData.map((edu, index) => (
                    <div key={index} className="mb-5">
                      <h4 className="text-lg mb-1 text-dark dark:text-[#e5e7eb]">{edu.title}</h4>
                      <p className="text-sm text-accent dark:text-[#94a3b8]">{edu.period}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'experience' && (
                <div className="space-y-5">
                  {experienceData.map((exp, index) => (
                    <div key={index} className="mb-5">
                      <h4 className="text-lg mb-1 text-dark dark:text-[#e5e7eb]">{exp.title}</h4>
                      <p className="text-sm text-accent dark:text-[#94a3b8] mb-1">{exp.period}</p>
                      <p className="text-sm text-secondary dark:text-[#e2e8f0]">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector('#contact');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
              className="btn-primary px-8 py-3 rounded-lg font-semibold text-[0.95rem] bg-primary text-white border-2 border-primary hover:bg-primary-dark hover:border-primary-dark hover:-translate-y-1 hover:shadow-md transition-all inline-flex items-center justify-center gap-2"
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
