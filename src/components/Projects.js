import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaArrowRight, FaChartLine, FaCheckCircle, FaCode, FaRocket } from 'react-icons/fa';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState([]);

  const projects = [
    {
      category: 'data',
      title: 'Franchise Statement Automation System',
      description: 'Enterprise automation replacing manual Excel/Sheets workflows. Consolidates revenue, expenses, and fees into unified pipeline. Generates per-franchise statements with automated validation and PDF export.',
      longDescription: 'This enterprise-grade automation system transforms the traditionally manual franchise statement generation process into a fully automated workflow. It integrates multiple data sources, applies complex business logic for special fees and calculations, validates financial balances across all transactions, and produces professional PDF statements ready for distribution. The system handles high-volume processing, maintains audit trails, and provides comprehensive reporting capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'Data Engineering', 'Automation', 'PDF Generation', 'Excel Integration'],
      progress: 100,
      milestones: ['Data Pipeline', 'Validation', 'PDF Export', 'Deployment'],
      link: '#',
      delay: 0,
    },
    {
      category: 'ai',
      title: 'Smart University Neighborhood Advisory System',
      description: 'AI-powered platform analyzing rental prices, transportation, safety, and job markets to help students choose optimal neighborhoods. Features interactive maps, ML-based scoring, and intelligent chatbot recommendations.',
      longDescription: 'This innovative platform combines data science, geospatial analysis, and conversational AI to create a comprehensive student advisory system. It aggregates data from multiple public sources including real estate APIs, crime statistics databases, transit authorities, and employment portals. The system uses machine learning algorithms to score and rank neighborhoods based on user preferences, provides visual comparisons through interactive maps, and offers personalized recommendations through an intelligent chatbot interface that understands natural language queries.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'Machine Learning', 'Data Analysis', 'Chatbot', 'Geospatial Analysis'],
      progress: 95,
      milestones: ['Data Integration', 'ML Models', 'Chatbot', 'Deployment'],
      link: '#',
      delay: 100,
    },
    {
      category: 'deployment',
      title: 'AI-Powered Multi-Platform Social Media Auto-Posting System',
      description: 'Automated social media management with Graph API integrations (LinkedIn, Facebook, YouTube, TikTok). Gemini AI generates titles, descriptions, and hashtags. Intelligent scheduling calendar with analytics tracking.',
      longDescription: 'This enterprise-level social media automation platform integrates with multiple social media APIs to provide seamless cross-platform content distribution. The system uses advanced AI models to generate contextually relevant content including catchy titles, detailed descriptions, and trending hashtags based on content analysis and current social media trends. It includes a sophisticated scheduling system with timezone support, content queuing, and automatic posting. The platform maintains detailed logs of all posting activities, tracks engagement metrics, and provides analytics dashboards for performance evaluation and strategy optimization.',
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'AI Integration', 'API Development', 'Automation', 'Social Media'],
      progress: 100,
      milestones: ['API Integration', 'AI Content Gen', 'Scheduler', 'Analytics'],
      link: '#',
      delay: 200,
    },
    {
      category: 'ai',
      title: 'HIPAA-Compliant Healthcare Document Compliance Chatbot',
      description: 'Desktop healthcare compliance solution with secure chatbot for automated document verification. Features PDF/OCR extraction, Excel export, and regulatory analysis. Built with Python/PyQt ensuring local data privacy and HIPAA compliance.',
      longDescription: 'This specialized healthcare compliance tool addresses critical needs in medical document management and regulatory adherence. The system processes healthcare documents using advanced OCR technology to extract text from scanned PDFs, analyzes content against HIPAA and other regulatory requirements, and generates compliance reports. It features a conversational interface that guides users through compliance checks, identifies potential violations, and suggests corrective actions. All data processing occurs locally to ensure patient privacy, with encryption at rest and in transit, and comprehensive audit logging for regulatory compliance.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'PyQt', 'OCR', 'HIPAA Compliance', 'Healthcare AI'],
      progress: 90,
      milestones: ['OCR Engine', 'Compliance Rules', 'Chatbot', 'Security'],
      link: '#',
      delay: 0,
    },
    {
      category: 'ai',
      title: 'Human Activity Recognition from Video',
      description: 'Computer vision system classifying 15 human activities using fine-tuned EfficientNet-B3. Trained on 12,600 labeled images. Real-time frame-by-frame inference with high precision for activities like calling, dancing, and hugging.',
      longDescription: 'This deep learning project demonstrates state-of-the-art performance in human activity recognition using transfer learning techniques. The system processes video input frame-by-frame, applies EfficientNet-B3 preprocessing, and generates activity classifications with confidence scores. The training pipeline includes data augmentation, multi-stage fine-tuning with learning rate scheduling, and comprehensive evaluation metrics. The model achieves robust performance across diverse activity categories and lighting conditions, making it suitable for real-world applications in surveillance, human-computer interaction, and behavioral analysis.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'TensorFlow', 'Computer Vision', 'Deep Learning', 'EfficientNet'],
      progress: 93,
      milestones: ['Dataset Prep', 'Model Training', 'Fine-tuning', 'Inference'],
      link: '#',
      delay: 100,
    },
    {
      category: 'ai',
      title: 'Skeleton-Based Human Activity Recognition with LSTM and ST-GCN',
      description: 'Advanced activity recognition using 3D skeleton data from NTU RGB+D dataset. Implements LSTM, CNN-LSTM, and ST-GCN architectures. Built with PyTorch, featuring real-time processing via OpenCV and MediaPipe.',
      longDescription: 'This research-oriented project explores advanced techniques in skeleton-based activity recognition, leveraging the rich 3D joint coordinate data from the NTU RGB+D dataset. The system extracts temporal and spatial features from skeleton sequences, models long-term dependencies using LSTM architectures, and captures spatial relationships through graph convolutional networks. The implementation includes comparative analysis of different model architectures, performance benchmarking, and visualization tools for understanding model behavior. The system demonstrates superior performance in recognizing complex activities that require understanding of both spatial body configurations and temporal movement patterns.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'PyTorch', 'LSTM', 'ST-GCN', 'Computer Vision'],
      progress: 88,
      milestones: ['Data Processing', 'LSTM Model', 'ST-GCN', 'Real-time'],
      link: '#',
      delay: 200,
    },
    {
      category: 'web',
      title: 'Emergency Towing Service Flutter Application',
      description: 'Cross-platform Flutter app for emergency towing services. Features real-time location tracking, ETA estimates, and dynamic pricing. Integrated with Google Maps API and Firebase for seamless backend operations.',
      longDescription: 'This production-ready mobile application delivers a complete emergency towing service experience. Users can request towing services with a single tap, track their service provider in real-time through integrated Google Maps, and receive accurate ETAs. The app implements dynamic pricing algorithms that calculate costs based on distance, vehicle type, and service urgency. Firebase integration ensures real-time synchronization of service requests, driver assignments, and status updates. The application includes features such as service history, payment processing, rating systems, and push notifications for enhanced user experience.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Flutter', 'Firebase', 'Google Maps', 'Mobile Development', 'Real-time'],
      progress: 98,
      milestones: ['UI/UX', 'Maps Integration', 'Backend', 'Testing'],
      link: '#',
      delay: 0,
    },
    {
      category: 'ai',
      title: 'Deep Learning-Based Skin Disease Classification System',
      description: 'Medical AI for automated dermatology diagnostics trained on DermNet dataset. Compares multiple CNN architectures (ResNet, DenseNet, EfficientNet) for optimal classification. Focuses on clinical accuracy and medical compliance.',
      longDescription: 'This specialized medical AI system addresses critical needs in dermatology diagnostics by providing automated classification of skin diseases from clinical images. The project involves extensive preprocessing of medical images, implementation of various CNN architectures including ResNet, DenseNet, and EfficientNet variants, and rigorous evaluation using medical-grade metrics. The system includes explainability features that highlight regions of interest in images, confidence scoring for diagnoses, and integration capabilities with electronic health record systems. The solution emphasizes clinical accuracy, interpretability, and compliance with medical device regulations.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'TensorFlow', 'Keras', 'Medical AI', 'CNN'],
      progress: 87,
      milestones: ['Data Prep', 'CNN Models', 'Evaluation', 'Compliance'],
      link: '#',
      delay: 100,
    },
    {
      category: 'ai',
      title: 'YOLO-Based Autonomous Pilot Transfer Safety System',
      description: 'Computer vision system using YOLOv8 and DeepSort for maritime pilot transfer safety. Real-time motion analysis identifies safe jump windows. Features platform estimation, motion tracking, and intelligent recommendations.',
      longDescription: 'This safety-critical maritime application combines advanced computer vision, object tracking, and motion analysis to enhance pilot transfer safety. The system uses YOLOv8 for robust person detection across varying lighting and weather conditions, implements DeepSort for consistent tracking of the pilot throughout the transfer sequence, and employs sophisticated motion analysis to calculate optimal jump timing. It features real-time visual overlays, audio alerts for jump recommendations, comprehensive logging, and CSV export for post-operation analysis. The modular architecture ensures maintainability and allows for easy integration of additional safety features.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'YOLOv8', 'Computer Vision', 'DeepSort', 'Safety Systems'],
      progress: 91,
      milestones: ['YOLOv8 Setup', 'Tracking', 'Motion Analysis', 'Safety Alerts'],
      link: '#',
      delay: 200,
    },
    {
      category: 'ai',
      title: 'AI Voice Call Agent with Twilio Integration',
      description: 'Intelligent voice automation handling inbound/outbound calls via Twilio API. Uses OpenAI LLM for transcript processing and Alloy TTS for natural voice synthesis. Features conversation management and comprehensive logging.',
      longDescription: 'This enterprise-grade voice AI system revolutionizes customer service and sales operations through intelligent call automation. The platform integrates with Twilio to manage phone number provisioning, call routing, and telephony infrastructure. It processes real-time audio streams, converts speech to text, analyzes conversation context using advanced LLM models, and generates appropriate responses that are converted back to natural speech. The system includes features such as call recording, sentiment analysis, conversation summarization, and integration with CRM systems. It supports multiple languages, handles complex conversation flows, and maintains context across extended interactions.',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'Twilio', 'OpenAI', 'TTS', 'Voice AI'],
      progress: 89,
      milestones: ['Twilio Setup', 'LLM Integration', 'TTS Engine', 'Deployment'],
      link: '#',
      delay: 0,
    },
    {
      category: 'ai',
      title: 'EduPath - Smart Student Advisory and University Recommendation Bot',
      description: 'Intelligent chatbot helping students choose universities and programs. Analyzes age, education, CGPA, and interests for personalized recommendations. Flask backend with responsive web interface and NLP capabilities.',
      longDescription: 'EduPath represents a comprehensive educational advisory platform that combines AI-powered conversational interfaces with extensive university and program databases. The system uses natural language processing to understand student queries, analyzes academic profiles against admission requirements, and generates personalized recommendations ranked by suitability. It features an intuitive web interface built with Bootstrap 5, includes interactive visualizations, and provides detailed program comparisons. The chatbot can answer questions about admission requirements, scholarship opportunities, program curricula, and career prospects, making it an invaluable tool for students navigating the complex university selection process.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['Python', 'Flask', 'Chatbot', 'NLP', 'Web Development'],
      progress: 92,
      milestones: ['NLP Engine', 'Database', 'Web UI', 'Deployment'],
      link: '#',
      delay: 100,
    },
    {
      category: 'web',
      title: 'HealthGenix - Online Gym, Rehabilitation, and Diet Plans Application',
      description: 'React Native fitness app with real-time camera-based exercise monitoring via MediaPipe. Analyzes body angles, counts exercises, and provides personalized rehabilitation and diet plans. Backend built with Express.js and MySQL.',
      longDescription: 'HealthGenix is a full-featured fitness and rehabilitation platform that combines computer vision, mobile development, and health management. The application uses MediaPipe to track body keypoints in real-time through device cameras, calculates joint angles to assess exercise form, and automatically counts repetitions when movements meet predefined thresholds. It includes personalized workout plans, rehabilitation programs tailored to specific conditions, and comprehensive diet planning with nutritional tracking. The backend, built with Express.js and MySQL, manages user accounts, exercise libraries, progress tracking, and integrates with email services for notifications. The app provides real-time feedback on exercise form, tracks progress over time, and generates detailed reports for users and healthcare providers.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=100',
      tags: ['React Native', 'Expo', 'MediaPipe', 'Express.js', 'MySQL'],
      progress: 96,
      milestones: ['MediaPipe', 'Backend API', 'UI/UX', 'Testing'],
      link: 'https://github.com/Waqas56jb/HealthGenix-Online-Gym-Training-App',
      delay: 200,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'data', label: 'Data Engineering' },
    { id: 'deployment', label: 'Deployment' },
    { id: 'web', label: 'Web/Mobile' },
  ];

  useEffect(() => {
    const filtered = projects.filter(
      (project) => activeFilter === 'all' || project.category === activeFilter
    );
    setVisibleProjects(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-[#0b1220] dark:via-[#0f172a] dark:to-[#0b1220]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="text-center mb-12 sm:mb-16" data-aos="fade-up">
          <h4 className="text-base sm:text-lg text-accent font-normal uppercase tracking-wider mb-3 sm:mb-4 inline-block">
            Portfolio Showcase
          </h4>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] mb-3 sm:mb-4 text-dark dark:text-[#e5e7eb]">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8] max-w-2xl mx-auto mb-4">
            Over 100+ AI/ML projects delivered across various industries, showcasing expertise in machine learning, data science, and software development
          </p>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary via-primary-light to-primary-dark mx-auto rounded-sm" />
        </div>
        <div className="flex gap-2 sm:gap-4 justify-center mb-8 sm:mb-10 flex-wrap px-2" data-aos="fade-up">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-medium cursor-pointer transition-all border-none outline-none ${
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-[#0f172a] text-accent dark:text-[#cbd5e1] hover:bg-blue-50 dark:hover:bg-[#1e293b] border border-blue-100 dark:border-blue-900/30'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#0f172a] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-blue-100 dark:border-blue-900/30 group"
              data-aos="fade-up"
              data-aos-delay={project.delay}
            >
              <div className="relative h-[220px] sm:h-[280px] lg:h-[250px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-2xl sm:text-3xl w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-primary transform hover:scale-125 transition-all duration-300 shadow-xl"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
                {project.progress && (
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-lg">
                    <FaChartLine className="text-primary text-xs" />
                    <span className="text-xs font-bold text-primary">{project.progress}%</span>
                  </div>
                )}
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-primary/10 dark:bg-primary/20 text-primary dark:text-blue-400 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border border-primary/30 dark:border-primary/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg sm:text-xl mb-2 sm:mb-2.5 text-dark dark:text-[#e5e7eb] font-bold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-accent dark:text-[#94a3b8] mb-4 text-xs sm:text-sm leading-relaxed line-clamp-4">
                  {project.description}
                </p>
                {project.milestones && (
                  <div className="mb-4 pb-4 border-b border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-center gap-2 mb-2">
                      <FaRocket className="text-primary text-xs" />
                      <span className="text-xs font-semibold text-dark dark:text-[#e5e7eb]">Milestones</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {project.milestones.map((milestone, mIndex) => (
                        <div key={mIndex} className="flex items-center gap-1.5">
                          <FaCheckCircle className="text-primary text-xs flex-shrink-0" />
                          <span className="text-xs text-accent dark:text-[#94a3b8] truncate">{milestone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {project.progress && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-semibold text-dark dark:text-[#e5e7eb]">Progress</span>
                      <span className="text-xs font-bold text-primary">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-blue-50 dark:bg-[#0b1220] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary via-primary-light to-primary-dark rounded-full transition-all duration-1000"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-dark transition-all group/link text-sm"
                >
                  <span>View Details</span>
                  <FaArrowRight className="transform group-hover/link:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12 sm:mt-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-[#0f172a] px-6 py-4 rounded-xl shadow-lg border-2 border-primary/20">
            <FaCode className="text-primary text-xl" />
            <p className="text-sm sm:text-base text-accent dark:text-[#94a3b8]">
              <span className="font-bold text-primary">100+ Projects</span> completed across AI/ML, Data Science, Web Development, and Mobile Applications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
