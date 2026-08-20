import React, { useState } from 'react';
import { skillGroups } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const Skills = () => {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((g) => g.id === activeId) || skillGroups[0];

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container-x">
        <SectionHeading
          id="skills-title"
          eyebrow="Technology Ecosystem"
          title="The stack I build"
          accent="platforms with."
          description="Every technology below carries a one-line note on what it does in the systems I build."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-[240px_1fr] lg:items-start lg:gap-6">
          {/* Category rail ------------------------------------------- */}
          <Reveal>
            <div className="scroll-edge lg:sticky lg:top-24">
            <div
              className="scroll-x flex gap-2 scrollbar-hide pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
              role="tablist"
              aria-label="Skill categories"
            >
              {skillGroups.map((g) => {
                const isActive = g.id === activeId;
                return (
                  <button
                    key={g.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(g.id)}
                    className="shrink-0 rounded-[10px] px-3.5 py-2.5 text-left transition-all lg:w-full"
                    style={{
                      background: isActive ? 'rgb(var(--surface))' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(59,130,246,0.5)' : 'rgb(var(--line))'}`,
                    }}
                  >
                    <span
                      className="block whitespace-nowrap text-[13px] font-semibold lg:whitespace-normal"
                      style={{ color: isActive ? 'rgb(var(--accent))' : undefined }}
                    >
                      {g.title}
                    </span>
                    <span className="kbd hidden text-[9px] lg:mt-0.5 lg:block">{g.blurb}</span>
                  </button>
                );
              })}
            </div>
            </div>
          </Reveal>

          {/* Tiles ---------------------------------------------------- */}
          <div
            className="card p-4 sm:p-6 lg:min-h-[420px]"
            role="tabpanel"
            aria-label={`${active.title} technologies`}
          >
            <div className="mb-4 flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <h3 className="text-[1.05rem]">{active.title}</h3>
              <span className="kbd">{active.items.length} technologies</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
              {active.items.map((item, i) => (
                <div
                  key={item.name}
                  className="group relative overflow-hidden rounded-[10px] p-3 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    border: '1px solid rgb(var(--line))',
                    animation: `none`,
                    transitionDelay: `${i * 8}ms`,
                  }}
                >
                  <span
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                    style={{ background: 'linear-gradient(90deg,#22D3EE,#2563EB)' }}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                      style={{ background: '#3B82F6' }}
                      aria-hidden="true"
                    />
                    <span className="text-[13.5px] font-medium leading-tight transition-colors group-hover:text-azure-500 sm:text-[12.5px]">
                      {item.name}
                    </span>
                  </div>
                  <p className="muted mt-1.5 font-mono text-[11px] leading-relaxed opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:text-[9.5px] sm:leading-snug sm:opacity-70">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
