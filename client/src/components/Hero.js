import React, { useEffect, useState } from 'react';
import { FaGithub, FaArrowRight, FaEnvelope, FaAward, FaBolt, FaCloud } from 'react-icons/fa';
import { profile, marqueeTech } from '../data/portfolio';
import Reveal from './ui/Reveal';

const useRotator = (items, interval = 2600) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);
  return items[i];
};

const FLOATING = [
  {
    icon: FaAward,
    value: '3+ Years',
    label: 'Experience',
    className: 'left-0 top-[14%] sm:-left-2',
    delay: '0s',
  },
  {
    icon: FaBolt,
    value: '1,000+',
    label: 'Records / sec',
    className: 'right-0 top-[40%] sm:-right-3',
    delay: '1.4s',
  },
  {
    icon: FaCloud,
    value: 'AWS + Azure',
    label: 'Multi-cloud',
    className: 'left-0 bottom-[12%] sm:-left-4',
    delay: '2.6s',
  },
];

const Hero = () => {
  const rotating = useRotator(profile.rotating);

  const go = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36"
    >
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="glow left-[-12%] top-[-14%] h-[440px] w-[440px]"
        style={{ background: 'rgba(37,99,235,0.18)' }}
        aria-hidden="true"
      />
      <div
        className="glow right-[-6%] top-[10%] h-[420px] w-[420px]"
        style={{ background: 'rgba(34,211,238,0.12)' }}
        aria-hidden="true"
      />

      <div className="container-x relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          {/* Copy ------------------------------------------------------ */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ border: '1px solid rgb(var(--line-strong))', color: 'rgb(var(--text-dim))' }}
              >
                <span className="live-dot" aria-hidden="true" />
                Data Engineer · Cloud · Real-Time
              </span>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-6 text-[2.1rem] leading-[1.04] xs:text-[2.4rem] sm:text-[3rem] lg:text-[3.5rem]">
                Engineering Data
                <br />
                Systems That <span className="accent-text">Scale.</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-4 flex flex-wrap items-center gap-x-2 font-mono text-[12.5px] sm:text-sm">
                <span className="muted">$</span>
                <span key={rotating} className="animate-rise text-azure-500">{rotating}</span>
                <span className="animate-blink text-cyan-500" aria-hidden="true">▌</span>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="muted mt-5 max-w-[54ch] text-[0.95rem] leading-relaxed sm:text-base">
                {profile.intro}
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" onClick={(e) => go(e, '#projects')} className="btn-primary">
                  View Projects <FaArrowRight aria-hidden="true" className="text-xs" />
                </a>
                <a href="#contact" onClick={(e) => go(e, '#contact')} className="btn-ghost">
                  <FaEnvelope aria-hidden="true" /> Let&apos;s Connect
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <FaGithub aria-hidden="true" /> GitHub
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="flex items-center gap-2 text-[12.5px]">
                  <span className="live-dot" aria-hidden="true" />
                  <span className="muted">{profile.availability}</span>
                </span>
                <span className="kbd">{profile.location}</span>
              </div>
            </Reveal>
          </div>

          {/* Portrait -------------------------------------------------- */}
          <Reveal delay={160} className="order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[440px]">
              {/* halo */}
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(37,99,235,0.30) 0%, rgba(34,211,238,0.12) 45%, transparent 70%)',
                  filter: 'blur(28px)',
                }}
                aria-hidden="true"
              />
              {/* orbit rings */}
              <svg
                viewBox="0 0 200 200"
                className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
                aria-hidden="true"
              >
                <circle cx="100" cy="104" r="78" fill="none" stroke="rgb(var(--line))" strokeWidth="0.7" strokeDasharray="2 5" />
                <circle
                  cx="100" cy="104" r="92" fill="none" stroke="#3B82F6" strokeOpacity="0.28"
                  strokeWidth="0.8" strokeDasharray="4 7" className="animate-spin-slow"
                  style={{ transformOrigin: '100px 104px' }}
                />
              </svg>

              <img
                src="/profile2.png"
                alt="Waqas Naveed, Data Engineer"
                width="440"
                height="600"
                className="relative mx-auto w-full select-none object-contain"
                style={{ filter: 'drop-shadow(0 30px 60px rgba(4,7,14,0.55))' }}
                loading="eager"
                fetchpriority="high"
                draggable="false"
              />

              {/* base reflection */}
              <div
                className="absolute inset-x-8 bottom-2 h-8 rounded-[100%]"
                style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.28), transparent 70%)', filter: 'blur(10px)' }}
                aria-hidden="true"
              />

              {/* floating stat cards */}
              {FLOATING.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.value}
                    className={`absolute ${f.className} animate-float`}
                    style={{ animationDelay: f.delay }}
                  >
                    <div
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 backdrop-blur-md"
                      style={{
                        background: 'rgb(var(--surface) / 0.86)',
                        border: '1px solid rgb(var(--line-strong))',
                        boxShadow: '0 18px 44px -24px rgba(4,7,14,0.8)',
                      }}
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: 'rgba(59,130,246,0.14)', color: '#3B82F6' }}
                        aria-hidden="true"
                      >
                        <Icon className="text-[12px]" />
                      </span>
                      <span className="leading-tight">
                        <span className="block font-display text-[13px] font-semibold">{f.value}</span>
                        <span className="kbd block text-[8.5px]">{f.label}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Tech marquee ------------------------------------------------- */}
      <div className="relative mt-12 sm:mt-14" aria-hidden="true">
        <div
          className="marquee-mask overflow-hidden py-4"
          style={{ borderTop: '1px solid rgb(var(--line))', borderBottom: '1px solid rgb(var(--line))' }}
        >
          <div className="flex w-max animate-marquee gap-10">
            {[...marqueeTech, ...marqueeTech].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.16em]"
                style={{ color: 'rgb(var(--text-dim))' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
