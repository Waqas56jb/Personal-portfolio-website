import React, { useEffect, useRef } from 'react';

const Skills = () => {
  const skillsSectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar) => {
              const width = bar.getAttribute('data-width');
              bar.style.width = '0';
              setTimeout(() => {
                bar.style.width = width;
              }, 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRef = skillsSectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: 'Data Science & AI',
      icon: 'fas fa-brain',
      skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', percentage: 95 },
        { name: 'Pandas/Numpy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', percentage: 92 },
        { name: 'TensorFlow/Keras', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', percentage: 90 },
        { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', percentage: 85 },
      ],
      delay: 0,
    },
    {
      title: 'Data Engineering',
      icon: 'fas fa-database',
      skills: [
        { name: 'Apache Spark', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg', percentage: 88 },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', percentage: 90 },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', percentage: 85 },
        { name: 'AWS/GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg', percentage: 80 },
      ],
      delay: 100,
    },
    {
      title: 'Model Deployment',
      icon: 'fas fa-server',
      skills: [
        { name: 'Flask/FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', percentage: 90 },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', percentage: 85 },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', percentage: 75 },
        { name: 'Azure ML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', percentage: 80 },
      ],
      delay: 200,
    },
    {
      title: 'Frontend Integration',
      icon: 'fas fa-laptop-code',
      skills: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', percentage: 85 },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', percentage: 80 },
        { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', percentage: 90 },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', percentage: 85 },
      ],
      delay: 300,
    },
  ];

  return (
    <section id="skills" className="section-padding" ref={skillsSectionRef}>
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            What I'm expert at
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] p-8 rounded-xl shadow-md transition-all hover:-translate-y-2.5 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={category.delay}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">
                  <i className={category.icon}></i>
                </div>
                <h3 className="text-xl text-dark dark:text-[#e5e7eb]">{category.title}</h3>
              </div>
              <div className="flex flex-col gap-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 font-medium text-dark dark:text-[#e5e7eb]">
                        <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain" />
                        <span>{skill.name}</span>
                      </div>
                      <span className="font-semibold text-primary">{skill.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[#f1f5f9] dark:bg-[#0b1220] rounded overflow-hidden">
                      <div
                        className="skill-progress h-full bg-gradient-to-r from-primary to-primary-dark rounded transition-all duration-[1.5s]"
                        data-width={`${skill.percentage}%`}
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
