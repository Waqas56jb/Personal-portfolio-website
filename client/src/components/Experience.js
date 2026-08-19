import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';
import { experience, education } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const Experience = () => (
  <section id="experience" className="section" aria-labelledby="experience-title">
    <div className="container-x">
      <SectionHeading
        id="experience-title"
        eyebrow="3+ Years Experience"
        title="Where I've"
        accent="built things."
        description="Engineering roles plus three years of freelance delivery for international clients."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-3">
        {experience.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 90}>
            <article className="card h-full p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[1rem] leading-snug">{exp.role}</h3>
                  <p className="mt-1 text-[13px] font-medium text-azure-500">{exp.company}</p>
                </div>
                {exp.current && (
                  <span
                    className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em]"
                    style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E' }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22C55E' }} aria-hidden="true" />
                    Latest
                  </span>
                )}
              </div>

              <div className="kbd mt-2 text-[10px]">
                {exp.period} · {exp.location}
              </div>

              <ul className="mt-4 space-y-2">
                {exp.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[13px] leading-relaxed">
                    <span
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                      style={{ background: '#3B82F6' }}
                      aria-hidden="true"
                    />
                    <span className="muted">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {exp.stack.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}

        {/* Education ------------------------------------------------- */}
        <Reveal delay={180}>
          <article className="card h-full p-5">
            <div className="flex items-center gap-2">
              <FaGraduationCap className="text-azure-500" aria-hidden="true" />
              <span className="kbd text-[9.5px]">Education</span>
            </div>
            <h3 className="mt-3 text-[1rem] leading-snug">{education.degree}</h3>
            <p className="mt-1 text-[13px] font-medium text-azure-500">{education.school}</p>
            <div className="kbd mt-2 text-[10px]">
              {education.period} · {education.location}
            </div>
            <p className="muted mt-4 text-[13px] leading-relaxed">
              Computer science foundation in distributed systems, databases and algorithms — the
              groundwork behind the data platforms I build today.
            </p>
          </article>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Experience;
