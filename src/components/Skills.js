import React from 'react';
import { FaBrain, FaDatabase, FaServer, FaLaptopCode } from 'react-icons/fa';

const Skills = () => {

  const skillCategories = [
    {
      title: 'Data Science & AI',
      icon: FaBrain,
      skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', percentage: 95 },
        { name: 'Pandas/Numpy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', percentage: 92 },
        { name: 'TensorFlow/Keras', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', percentage: 90 },
        { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', percentage: 85 },
        { name: 'Scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikit-learn/scikit-learn-original.svg', percentage: 88 },
      ],
      delay: 0,
    },
    {
      title: 'Data Analysis & Engineering',
      icon: FaDatabase,
      skills: [
        { name: 'Data Analysis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', percentage: 93 },
        { name: 'Apache Spark', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg', percentage: 88 },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', percentage: 90 },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', percentage: 85 },
        { name: 'AWS/GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', percentage: 80 },
      ],
      delay: 100,
    },
    {
      title: 'Model Deployment & MLOps',
      icon: FaServer,
      skills: [
        { name: 'Flask/FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', percentage: 90 },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', percentage: 85 },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', percentage: 75 },
        { name: 'Azure ML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', percentage: 80 },
        { name: 'MLflow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', percentage: 82 },
      ],
      delay: 200,
    },
    {
      title: 'Web Development',
      icon: FaLaptopCode,
      skills: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percentage: 85 },
        { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', percentage: 83 },
        { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg', percentage: 88 },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', percentage: 80 },
        { name: 'JavaScript/TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percentage: 85 },
      ],
      delay: 300,
    },
    {
      title: 'Mobile Development',
      icon: FaLaptopCode,
      skills: [
        { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', percentage: 82 },
        { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percentage: 80 },
        { name: 'Expo', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percentage: 78 },
        { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', percentage: 85 },
      ],
      delay: 400,
    },
  ];

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Technical Expertise
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            Skills & Technologies
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            Comprehensive expertise across AI/ML, Data Science, Data Engineering, and Full-Stack Development
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary via-primary-light to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#0f172a] p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-primary/20 dark:border-primary/30 group"
                data-aos="fade-up"
                data-aos-delay={category.delay}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pb-4 border-b-2 border-primary/10 dark:border-primary/20">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/20 flex items-center justify-center text-primary text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent />
                  </div>
                  <h3 className="text-lg sm:text-xl text-dark dark:text-[#e5e7eb] font-bold group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </div>
                {/* Skills List - Text-Based Design */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group/skill bg-gradient-to-r from-blue-50/50 via-white to-blue-50/30 dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#0b1220] p-4 sm:p-5 rounded-lg border-l-4 border-primary/30 dark:border-primary/40 hover:border-primary dark:hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-x-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-base font-bold text-dark dark:text-[#e5e7eb] mb-1 group-hover/skill:text-primary transition-colors">
                            {skill.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-blue-100 dark:bg-[#0b1220] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-dark rounded-full transition-all duration-1000"
                                style={{ width: `${skill.percentage}%` }}
                              />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-primary min-w-[3rem] text-right">
                              {skill.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
