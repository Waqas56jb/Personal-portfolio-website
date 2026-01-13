import React from 'react';
import { FaRobot, FaDatabase, FaCloud, FaChartLine, FaMobileAlt, FaCode } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: FaRobot,
      title: 'Machine Learning & AI',
      description: 'Development of custom machine learning models for predictive analytics, classification, pattern recognition, and intelligent automation. Expertise in deep learning, computer vision, NLP, and reinforcement learning using Python, TensorFlow, PyTorch, and advanced ML frameworks.',
      features: ['Predictive Modeling', 'Computer Vision', 'Natural Language Processing', 'Deep Learning', 'Reinforcement Learning', 'Transfer Learning'],
      delay: 0,
    },
    {
      icon: FaChartLine,
      title: 'Data Science & Analysis',
      description: 'Comprehensive data analysis and scientific insights extraction from complex datasets. Statistical modeling, hypothesis testing, exploratory data analysis, and advanced analytics to drive data-driven decision making across industries.',
      features: ['Statistical Analysis', 'Exploratory Data Analysis', 'Hypothesis Testing', 'Predictive Analytics', 'Business Intelligence', 'Data Mining'],
      delay: 100,
    },
    {
      icon: FaDatabase,
      title: 'Data Engineering',
      description: 'Building robust, scalable data pipelines and infrastructure for efficient data processing, transformation, and analytics. Design and implementation of ETL/ELT processes, data warehousing solutions, and big data processing systems.',
      features: ['ETL/ELT Pipelines', 'Data Warehousing', 'Big Data Processing', 'Data Quality Assurance', 'Data Integration', 'Real-time Streaming'],
      delay: 200,
    },
    {
      icon: FaCloud,
      title: 'Model Deployment & MLOps',
      description: 'End-to-end deployment of machine learning models as scalable APIs, microservices, or web applications. Implementation of MLOps practices including CI/CD pipelines, model versioning, monitoring, and automated retraining systems.',
      features: ['REST API Development', 'Containerization (Docker/K8s)', 'Cloud Deployment (AWS/GCP/Azure)', 'Performance Monitoring', 'Model Versioning', 'Automated Retraining'],
      delay: 300,
    },
    {
      icon: FaCode,
      title: 'Web Development',
      description: 'Full-stack web application development using modern frameworks and technologies. Building responsive, scalable web applications with React, Next.js, Tailwind CSS, and Node.js. Integration of AI capabilities into web platforms.',
      features: ['React & Next.js', 'Tailwind CSS', 'Node.js & Express', 'RESTful APIs', 'AI Integration', 'Responsive Design'],
      delay: 400,
    },
    {
      icon: FaMobileAlt,
      title: 'Mobile App Development',
      description: 'Cross-platform mobile application development using Flutter and React Native. Creating native-feeling mobile apps with integrated AI capabilities, real-time features, and seamless user experiences.',
      features: ['Flutter Development', 'React Native', 'Firebase Integration', 'AI/ML Integration', 'Real-time Features', 'Cross-platform Apps'],
      delay: 500,
    },
  ];

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-blue-50/30 to-white dark:from-[#0f172a] dark:to-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            What I can do for you
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            My Services
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            Comprehensive solutions across AI/ML, Data Science, Data Engineering, and Full-Stack Development
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#0f172a] p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden z-10 group hover:-translate-y-2.5 border border-blue-100 dark:border-blue-900/30"
                data-aos="fade-up"
                data-aos-delay={service.delay}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full bg-primary/10 group-hover:bg-white/20 flex items-center justify-center text-primary group-hover:text-white text-xl sm:text-2xl mb-4 sm:mb-5 transition-all">
                    <IconComponent />
                  </div>
                  <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb] group-hover:text-white transition-colors font-semibold">
                    {service.title}
                  </h3>
                  <p className="mb-4 sm:mb-5 text-sm sm:text-base text-accent dark:text-[#94a3b8] group-hover:text-white/90 transition-colors leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="flex flex-col gap-2 sm:gap-2.5">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-xs sm:text-sm text-secondary dark:text-[#e2e8f0] group-hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <i className="fas fa-check text-primary group-hover:text-white transition-colors text-xs"></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
