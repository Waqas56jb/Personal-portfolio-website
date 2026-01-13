import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Experience from './components/Experience';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ParticlesBackground from './components/ParticlesBackground';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme ? savedTheme === 'dark' : prefersDark;
  });
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Prevent body scroll when preloader is showing
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Handle preloader - check if page is already loaded
    const handleLoad = () => {
      setTimeout(() => {
        setShowPreloader(false);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }

    // Apply dark mode
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDark, showPreloader]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="App">
      {showPreloader ? (
        <Preloader />
      ) : (
        <>
          <ParticlesBackground />
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <main id="main-content" tabIndex="-1" role="main">
            <Hero />
            <Certifications />
            <Testimonials />
            <Experience />
            <About />
            <Skills />
            <Services />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={isDark ? 'dark' : 'light'}
          />
        </>
      )}
    </div>
  );
}

export default App;
