import React, { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricStrip from './components/MetricStrip';
import FlowBand from './components/FlowBand';
import About from './components/About';
import Skills from './components/Skills';
import Architecture from './components/Architecture';
import Projects from './components/Projects';
import RealTime from './components/RealTime';
import Services from './components/Services';
import Process from './components/Process';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import VoiceAgent from './components/VoiceAgent';

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // dark is the primary identity
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const done = () => setLoading(false);
    if (document.readyState === 'complete') {
      const t = setTimeout(done, 450);
      return () => clearTimeout(t);
    }
    window.addEventListener('load', done);
    const fallback = setTimeout(done, 2500);
    return () => {
      window.removeEventListener('load', done);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const toggleTheme = () => {
    setIsDark((prev) => {
      localStorage.setItem('theme', prev ? 'light' : 'dark');
      return !prev;
    });
  };

  return (
    <>
      {loading && <Preloader />}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <MetricStrip />
        <FlowBand />
        <About />
        <Skills />
        <Architecture />
        <Projects />
        <RealTime />
        <Services />
        <Process />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <VoiceAgent />
    </>
  );
};

export default App;
