import React, { useState, useEffect } from 'react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);

  const projects = [
    {
      category: 'ai',
      title: 'HealthGenix Fitness App',
      description: 'AI-powered fitness app with real-time body position detection using MediaPipe and React Native for cross-platform deployment.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      tags: ['Python', 'MediaPipe', 'React Native'],
      link: 'https://github.com/Waqas56jb/HealthGenix-Online-Gym-Training-App',
      delay: 0,
    },
    {
      category: 'data',
      title: 'Automated Web Scraper',
      description: 'Distributed web scraping system with automated data cleaning, storage, and email outreach capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      tags: ['Python', 'Scrapy', 'Selenium'],
      link: 'https://github.com/Waqas56jb/Webscrapping-End-to-End-Project-Automation',
      delay: 100,
    },
    {
      category: 'ai',
      title: 'Emergency Vehicle Detection',
      description: 'Deep learning model for detecting emergency vehicles in traffic using transfer learning with TensorFlow.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      tags: ['Python', 'TensorFlow', 'Computer Vision'],
      link: 'https://github.com/Waqas56jb/Emergencey-Vehicle-Recognization',
      delay: 200,
    },
    {
      category: 'ai',
      title: 'Arabic-English Translator',
      description: 'Transformer-based Seq2Seq model for Arabic-to-English translation with attention mechanisms.',
      image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80',
      tags: ['Python', 'Transformers', 'NLP'],
      link: 'https://github.com/Waqas56jb/Using-Transformers-Based-Seq2Seq-Model-Arabic-to-English-Translater-App',
      delay: 0,
    },
    {
      category: 'deployment',
      title: 'Algorithmic Trading System',
      description: 'ML, DL, and NLP based stock market prediction system deployed as a Flask API with React frontend.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      tags: ['Python', 'Machine Learning', 'NLP'],
      link: 'https://github.com/Waqas56jb/Algorithmic-Trading-Using-Ml-DL-NLP',
      delay: 100,
    },
    {
      category: 'web',
      title: 'House Price Prediction',
      description: 'ML model for house price prediction deployed as a web application with Flask backend and interactive UI.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
      tags: ['Python', 'Scikit-learn', 'Flask'],
      link: 'https://github.com/Waqas56jb/HousesPricePrediction',
      delay: 200,
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'data', label: 'Data Engineering' },
    { id: 'deployment', label: 'Deployment' },
    { id: 'web', label: 'Web Integration' },
  ];

  useEffect(() => {
    const filtered = projects.filter(
      (project) => activeFilter === 'all' || project.category === activeFilter
    );
    setVisibleProjects(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            My recent work
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="flex gap-4 justify-center mb-10 flex-wrap" data-aos="fade-up">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2 rounded-lg font-medium cursor-pointer transition-all border-none outline-none ${
                activeFilter === filter.id
                  ? 'bg-primary text-white'
                  : 'bg-[#f1f5f9] dark:bg-[#0b1220] text-accent dark:text-[#cbd5e1]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 max-md:grid-cols-1">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] rounded-xl overflow-hidden shadow-md transition-all hover:-translate-y-2.5 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={project.delay}
            >
              <div className="relative h-[250px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-primary/90 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl w-15 h-15 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-primary hover:rotate-360 transition-all"
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2.5 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-[#f1f5f9] dark:bg-[#0b1220] text-primary px-4 py-1 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl mb-2.5 text-dark dark:text-[#e5e7eb]">{project.title}</h3>
                <p className="text-accent dark:text-[#94a3b8] mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-medium text-primary transition-all hover:text-primary-dark hover:gap-3"
                >
                  View Details <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
