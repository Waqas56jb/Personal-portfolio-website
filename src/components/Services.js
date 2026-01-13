import React from 'react';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-robot',
      title: 'Machine Learning',
      description: 'Custom ML models for predictive analytics, classification, and pattern recognition using Python, TensorFlow, and PyTorch.',
      features: ['Predictive Modeling', 'Computer Vision', 'Natural Language Processing', 'Time Series Analysis'],
      delay: 0,
    },
    {
      icon: 'fas fa-database',
      title: 'Data Engineering',
      description: 'Building robust data pipelines and infrastructure for efficient data processing and analytics.',
      features: ['ETL Pipelines', 'Data Warehousing', 'Big Data Processing', 'Data Quality Assurance'],
      delay: 100,
    },
    {
      icon: 'fas fa-cloud',
      title: 'Model Deployment',
      description: 'End-to-end deployment of ML models as scalable APIs or web applications with monitoring.',
      features: ['REST API Development', 'Containerization', 'Cloud Deployment', 'Performance Monitoring'],
      delay: 200,
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Data Visualization',
      description: 'Interactive dashboards and visualizations to uncover insights from complex datasets.',
      features: ['Interactive Dashboards', 'Business Intelligence', 'Geospatial Visualization', 'Real-time Analytics'],
      delay: 300,
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'AI Integration',
      description: 'Seamless integration of AI capabilities into web and mobile applications.',
      features: ['React/React Native Apps', 'Flask/FastAPI Backends', 'Real-time Inference', 'User Authentication'],
      delay: 400,
    },
    {
      icon: 'fas fa-cogs',
      title: 'MLOps',
      description: 'Implementing CI/CD pipelines for machine learning with monitoring and versioning.',
      features: ['Model Versioning', 'Automated Retraining', 'Performance Monitoring', 'Drift Detection'],
      delay: 500,
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            What I can do for you
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            My Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] p-8 rounded-xl shadow-md transition-all relative overflow-hidden z-10 group hover:-translate-y-2.5 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={service.delay}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity z-0" />
              <div className="relative z-10">
                <div className="w-15 h-15 rounded-full bg-primary/10 group-hover:bg-white/20 flex items-center justify-center text-primary group-hover:text-white text-2xl mb-5 transition-all">
                  <i className={service.icon}></i>
                </div>
                <h3 className="text-xl mb-4 text-dark dark:text-[#e5e7eb] group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="mb-5 text-accent dark:text-[#94a3b8] group-hover:text-white transition-colors">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="text-sm text-secondary dark:text-[#e2e8f0] group-hover:text-white flex items-center gap-2 transition-colors"
                    >
                      <i className="fas fa-check text-primary group-hover:text-white transition-colors"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
