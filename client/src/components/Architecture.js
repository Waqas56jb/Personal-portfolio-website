import React, { useState } from 'react';
import { FaAws, FaMicrosoft } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import ArchitectureDiagram from './visuals/ArchitectureDiagram';
import CloudBlueprint, { BLUEPRINTS } from './visuals/CloudBlueprint';

const PRINCIPLES = [
  { k: 'Replayable', v: 'Raw events stay immutable, so any layer can be rebuilt from source without touching producers.' },
  { k: 'Decoupled', v: 'Producers never wait on consumers — the log absorbs the difference and each side scales alone.' },
  { k: 'Governed', v: 'Contracts and quality gates run before publish, not after a dashboard has already broken.' },
  { k: 'Cost-aware', v: 'Partitioning, tiering and pre-aggregation keep the cloud bill flat while volume grows.' },
];

const CLOUDS = [
  { id: 'aws', label: 'AWS', icon: FaAws },
  { id: 'azure', label: 'Azure', icon: FaMicrosoft },
];

const Architecture = () => {
  const [cloud, setCloud] = useState('aws');
  const spec = BLUEPRINTS[cloud];

  return (
    <section id="architecture" className="section relative" aria-labelledby="architecture-title">
      <div
        className="glow left-1/2 top-0 h-[340px] w-[560px] -translate-x-1/2"
        style={{ background: 'rgba(37,99,235,0.11)' }}
        aria-hidden="true"
      />
      <div className="container-x relative">
        <SectionHeading
          id="architecture-title"
          eyebrow="Architecture"
          title="Designed for real-time workloads,"
          accent="distributed processing and cloud scale."
          description="This is the shape most of my platforms take. Hover any stage to see what it does and which managed services back it on each cloud."
        />

        {/* Stage rail ------------------------------------------------- */}
        <Reveal delay={100}>
          <div className="mt-10">
            <ArchitectureDiagram />
          </div>
        </Reveal>

        {/* Cloud blueprints ------------------------------------------- */}
        <Reveal delay={120}>
          <div className="card mt-6 overflow-hidden">
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
              style={{ borderBottom: '1px solid rgb(var(--line))' }}
            >
              <div>
                <h3 className="text-[1rem]">{spec.name}</h3>
                <p className="kbd mt-1 text-[9.5px]">reference implementation · production shape</p>
              </div>

              <div className="flex gap-1.5" role="tablist" aria-label="Cloud provider">
                {CLOUDS.map((c) => {
                  const Icon = c.icon;
                  const isActive = c.id === cloud;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setCloud(c.id)}
                      className="flex items-center gap-2 rounded-[9px] px-3.5 py-2 text-[12.5px] font-semibold transition-all"
                      style={{
                        background: isActive ? 'rgb(var(--surface-2))' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(59,130,246,0.55)' : 'rgb(var(--line))'}`,
                        color: isActive ? 'rgb(var(--accent))' : 'rgb(var(--text-dim))',
                      }}
                    >
                      <Icon className="text-[14px]" aria-hidden="true" />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 sm:p-5">
              <CloudBlueprint spec={spec} />
              <p className="kbd mt-2 text-[9px] sm:hidden">Swipe the diagram horizontally to explore.</p>
            </div>
          </div>
        </Reveal>

        {/* Principles -------------------------------------------------- */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.k} delay={i * 70}>
              <div className="card h-full p-4">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22D3EE' }} aria-hidden="true" />
                  <h3 className="text-[13.5px]">{p.k}</h3>
                </div>
                <p className="muted mt-2 text-[12.5px] leading-relaxed">{p.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Architecture;
