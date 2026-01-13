import React from 'react';

const Certifications = () => {
  const certifications = [
    {
      title: 'Advanced Data Science Specialization',
      description: 'Coursera, 2023 — ML, Deep Learning, MLOps, and deployment best practices.',
      delay: 0,
    },
    {
      title: 'TensorFlow Developer',
      description: 'Computer Vision, NLP, and time-series with production-ready pipelines.',
      delay: 100,
    },
    {
      title: 'Cloud Practitioner',
      description: 'Foundational cloud, containers, and cost-efficient deployments on AWS/GCP.',
      delay: 200,
    },
  ];

  return (
    <section id="certifications" className="section-padding">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="text-center mb-16" data-aos="fade-up">
          <h4 className="text-lg text-accent font-normal uppercase tracking-wider mb-4 inline-block">
            Credentials
          </h4>
          <h2 className="text-[2.5rem] mb-4 text-dark dark:text-[#e5e7eb] max-md:text-[2rem] max-sm:text-[1.8rem]">
            Certifications
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] rounded-xl shadow-md p-5 transition-all hover:-translate-y-1.5 hover:shadow-lg"
              data-aos="fade-up"
              data-aos-delay={cert.delay}
            >
              <div className="flex items-center gap-2.5 mb-2.5 text-dark dark:text-[#e5e7eb]">
                <i className="fas fa-certificate text-primary"></i>
                <h3 className="text-lg font-semibold">{cert.title}</h3>
              </div>
              <p className="text-accent dark:text-[#94a3b8]">{cert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
