import React, { useCallback, useEffect, useState } from 'react';
import { FaGithub, FaLinkedinIn, FaMoon, FaSun, FaBars, FaTimes, FaFileDownload } from 'react-icons/fa';
import { profile } from '../data/portfolio';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#projects', label: 'Projects' },
  { href: '#process', label: 'Process' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = ({ isDark, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min((y / height) * 100, 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = useCallback((e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' });
  }, []);

  return (
    <>
      <a
        href="#main"
        className="btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl' : ''
        }`}
        style={{
          background: scrolled ? 'rgb(var(--surface) / 0.82)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgb(var(--line))' : '1px solid transparent',
        }}
      >
        <nav className="container-x flex h-[68px] items-center justify-between gap-4" aria-label="Main">
          {/* Brand */}
          <a href="#home" onClick={(e) => go(e, '#home')} className="flex items-center gap-2.5">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[9px] font-display text-[13px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#22D3EE,#2563EB)' }}
              aria-hidden="true"
            >
              WN
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block font-display text-[13.5px] font-semibold">{profile.name}</span>
              <span className="kbd block text-[9px]">Data Engineer</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0 xl:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  aria-current={active === l.href.slice(1) ? 'page' : undefined}
                  className="relative block rounded-lg px-2.5 py-2 text-[12.5px] font-medium transition-colors xl:px-3 xl:text-[13px]"
                  style={{ color: active === l.href.slice(1) ? 'rgb(var(--accent))' : 'rgb(var(--text-dim))' }}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-2.5 -bottom-0.5 h-[1.5px] origin-left transition-transform duration-300 ${
                      active === l.href.slice(1) ? 'scale-x-100' : 'scale-x-0'
                    }`}
                    style={{ background: 'linear-gradient(90deg,#22D3EE,#2563EB)' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="hidden h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-azure-500 sm:flex lg:h-9 lg:w-9"
              style={{ border: '1px solid rgb(var(--line))' }}
            >
              <FaGithub />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="hidden h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-azure-500 sm:flex lg:h-9 lg:w-9"
              style={{ border: '1px solid rgb(var(--line))' }}
            >
              <FaLinkedinIn />
            </a>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-azure-500 lg:h-9 lg:w-9"
              style={{ border: '1px solid rgb(var(--line))' }}
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
            <a
              href={profile.cv}
              download
              className="btn-primary hidden !px-4 !py-2 !text-[13px] md:inline-flex"
            >
              <FaFileDownload aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-lg xl:hidden"
              style={{ border: '1px solid rgb(var(--line))' }}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>

        {/* Scroll progress */}
        <div
          className="h-[2px] origin-left transition-transform duration-150"
          style={{
            background: 'linear-gradient(90deg,#22D3EE,#2563EB)',
            transform: `scaleX(${progress / 100})`,
          }}
          aria-hidden="true"
        />
      </header>

      {/* Mobile menu ---------------------------------------------------- */}
      <div
        className={`fixed inset-0 z-40 xl:hidden ${open ? '' : 'pointer-events-none'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'rgb(var(--bg) / 0.7)', backdropFilter: 'blur(6px)' }}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-[min(84vw,320px)] transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ background: 'rgb(var(--surface))', borderLeft: '1px solid rgb(var(--line))' }}
        >
          <div className="flex h-[68px] items-center justify-between px-5" style={{ borderBottom: '1px solid rgb(var(--line))' }}>
            <span className="kbd">Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ border: '1px solid rgb(var(--line))' }}
            >
              <FaTimes />
            </button>
          </div>
          <ul className="flex flex-col p-3">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3.5 text-[15.5px] font-medium transition-colors hover:text-azure-500"
                  style={{ color: active === l.href.slice(1) ? 'rgb(var(--accent))' : undefined }}
                >
                  <span className="kbd text-[10px]">{String(i + 1).padStart(2, '0')}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-col gap-2 px-4">
            <a href={profile.cv} download className="btn-primary w-full">
              <FaFileDownload aria-hidden="true" /> Download Resume
            </a>
            <div className="flex gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex-1 !py-2.5"
                aria-label="GitHub profile"
              >
                <FaGithub /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost flex-1 !py-2.5"
                aria-label="LinkedIn profile"
              >
                <FaLinkedinIn /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
