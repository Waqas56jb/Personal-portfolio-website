import React from 'react';
import { FaCertificate } from 'react-icons/fa';

const Certifications = () => {
  const certifications = [
    {
      title: 'Advanced Data Science Specialization',
      description: 'Coursera, 2023 — Comprehensive certification covering Machine Learning, Deep Learning, MLOps, and production deployment best practices. Includes hands-on projects and real-world case studies.',
      delay: 0,
    },
    {
      title: 'TensorFlow Developer Certification',
      description: 'TensorFlow Certification — Expertise in Computer Vision, Natural Language Processing, and time-series analysis with production-ready pipelines. Demonstrated proficiency in building scalable ML solutions.',
      delay: 100,
    },
    {
      title: 'Cloud Practitioner Certification',
      description: 'AWS/GCP Cloud Certification — Foundational knowledge in cloud computing, containerization, and cost-efficient deployments. Experience with cloud-based ML model hosting and data infrastructure.',
      delay: 200,
    },
  ];

  return (
    <section id="certifications" className="section-padding bg-white dark:bg-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Credentials & Certifications
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            Professional Certifications
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            Validated expertise through industry-recognized certifications
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] rounded-xl shadow-md hover:shadow-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 border border-blue-100 dark:border-blue-900/30"
              data-aos="fade-up"
              data-aos-delay={cert.delay}
            >
              <div className="flex items-center gap-3 mb-3 text-dark dark:text-[#e5e7eb]">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <FaCertificate className="text-xl" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold">{cert.title}</h3>
              </div>
              <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] leading-relaxed">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
