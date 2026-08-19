import React, { useMemo, useState } from 'react';
import { projects, filters } from '../data/portfolio';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [openProject, setOpenProject] = useState(null);

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projects-title"
            eyebrow="Selected Work"
            title="Six data systems,"
            accent="end to end."
            description="Ingestion, processing, storage and serving — each project is a full pipeline, not a demo notebook."
          />

          <Reveal delay={120}>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
              {filters.map((f) => {
                const isActive = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={isActive}
                    className="rounded-[9px] px-3.5 py-2 text-[12.5px] font-medium transition-all"
                    style={{
                      background: isActive ? 'rgb(var(--surface))' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(59,130,246,0.55)' : 'rgb(var(--line))'}`,
                      color: isActive ? 'rgb(var(--accent))' : 'rgb(var(--text-dim))',
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 90}>
              <ProjectCard project={project} onOpen={setOpenProject} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="muted mt-10 text-center text-sm">No projects in this category yet.</p>
        )}
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
};

export default Projects;
