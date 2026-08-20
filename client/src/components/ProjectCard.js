import React, { useCallback } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import DashboardMock from './visuals/DashboardMock';

const ProjectCard = ({ project, onOpen }) => {
  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <article
      className="card spotlight group flex h-full flex-col"
      onMouseMove={handleMove}
    >
      {/* Visual --------------------------------------------------- */}
      <div className="relative overflow-hidden" style={{ borderBottom: '1px solid rgb(var(--line))' }}>
        <DashboardMock
          variant={project.dashboard}
          label={`Illustrative analytics dashboard for ${project.title}`}
          className="transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span
          className="absolute left-3 top-7 rounded-md px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] backdrop-blur"
          style={{
            background: 'rgb(var(--surface) / 0.85)',
            border: '1px solid rgb(var(--line))',
            color: 'rgb(var(--text-dim))',
          }}
        >
          {project.kind}
        </span>
        <span
          className="absolute right-3 top-7 font-display text-[11px] font-semibold"
          style={{ color: 'rgb(var(--text-dim))' }}
          aria-hidden="true"
        >
          {project.index}
        </span>
      </div>

      {/* Body ----------------------------------------------------- */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.05rem] leading-snug transition-colors group-hover:text-azure-500">
          {project.title}
        </h3>
        <p className="muted mt-2 text-[13.5px] leading-relaxed sm:text-[13px]">{project.kicker}</p>

        {/* Metrics */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {project.metrics.map((m) => (
            <div key={m.label} className="panel-2 px-2.5 py-2">
              <div className="font-display text-[14px] font-semibold leading-none sm:text-[13px]">
                {m.value}
                {m.unit && <span className="muted ml-0.5 font-mono text-[9px]">{m.unit}</span>}
              </div>
              <div className="kbd mt-1 text-[10px] sm:text-[8.5px]">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
          {project.stack.length > 5 && (
            <span className="chip">+{project.stack.length - 5}</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-5 inline-flex items-center gap-2 self-start text-[13px] font-semibold text-azure-500 transition-colors hover:text-cyan-500"
        >
          Explore Architecture
          <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
