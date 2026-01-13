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

function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme ? savedTheme === 'dark' : prefersDark;
  });
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Handle preloader
    window.addEventListener('load', () => {
      setTimeout(() => {
        setShowPreloader(false);
      }, 500);
    });

    // Apply dark mode
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="App">
      {showPreloader && <Preloader />}
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
    </div>
  );
}

export default App;
