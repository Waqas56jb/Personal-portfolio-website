import React from 'react';
import { FaMapMarkerAlt, FaGraduationCap, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { profile, education } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const CONSTELLATION = [
  { name: 'AWS', r: 30, a: -90 },
  { name: 'Azure', r: 30, a: -18 },
  { name: 'Kafka', r: 30, a: 54 },
  { name: 'Spark', r: 30, a: 126 },
  { name: 'Databricks', r: 30, a: 198 },
  { name: 'Airflow', r: 30, a: 270 },
];

const FACTS = [
  { icon: FaMapMarkerAlt, label: 'Based in', value: profile.location },
  { icon: FaGraduationCap, label: 'Education', value: `${education.degree} · ${education.school}` },
  { icon: FaEnvelope, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { icon: FaPhoneAlt, label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
];

const About = () => (
  <section id="about" className="section" aria-labelledby="about-title">
    <div className="container-x">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title="Engineering systems,"
            accent="not just interfaces."
            description={profile.about}
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {FACTS.map((f, i) => {
              const Icon = f.icon;
              const Inner = (
                <div className="card h-full p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="text-[12px] text-azure-500" aria-hidden="true" />
                    <span className="kbd text-[9.5px]">{f.label}</span>
                  </div>
                  <p className="mt-1.5 break-words text-[13.5px] font-medium leading-snug">{f.value}</p>
                </div>
              );
              return (
                <Reveal key={f.label} delay={i * 70}>
                  {f.href ? (
                    <a href={f.href} className="block h-full">{Inner}</a>
                  ) : (
                    Inner
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Technology constellation ---------------------------------- */}
        <Reveal delay={140}>
          <div className="card relative p-6 sm:p-8">
            <div className="kbd mb-4">core stack</div>
            <div className="relative mx-auto aspect-square w-full max-w-[340px]">
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="100" cy="100" r="72" fill="none" stroke="rgb(var(--line))" strokeWidth="1" strokeDasharray="3 5" />
                <circle cx="100" cy="100" r="46" fill="none" stroke="rgb(var(--line))" strokeWidth="1" />
                {CONSTELLATION.map((t) => {
                  const rad = (t.a * Math.PI) / 180;
                  return (
                    <line
                      key={t.name}
                      x1="100"
                      y1="100"
                      x2={100 + Math.cos(rad) * 72}
                      y2={100 + Math.sin(rad) * 72}
                      stroke="#3B82F6"
                      strokeOpacity="0.28"
                      strokeWidth="1"
                      strokeDasharray="2 4"
                      className="animate-dash"
                    />
                  );
                })}
                <circle cx="100" cy="100" r="30" fill="#2563EB" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1" />
              </svg>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="font-display text-[13px] font-semibold">Python</div>
                <div className="kbd text-[9px]">+ SQL</div>
              </div>

              {CONSTELLATION.map((t) => {
                const rad = (t.a * Math.PI) / 180;
                const x = 50 + Math.cos(rad) * 36;
                const y = 50 + Math.sin(rad) * 36;
                return (
                  <span
                    key={t.name}
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[7px] px-2 py-1 font-mono text-[10.5px] transition-colors hover:text-azure-500 sm:text-[10px]"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      background: 'rgb(var(--surface-2))',
                      border: '1px solid rgb(var(--line))',
                    }}
                  >
                    {t.name}
                  </span>
                );
              })}
            </div>

            <p className="muted mt-6 text-center text-[13px] leading-relaxed sm:text-[12.5px]">
              Every platform I build starts from the same core and adapts its edges to the workload.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default About;
