import React, { useEffect, useRef } from 'react';
import { FaTimes, FaGithub, FaLongArrowAltRight } from 'react-icons/fa';
import DashboardMock from './visuals/DashboardMock';

const ProjectModal = ({ project, onClose }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const previous = document.activeElement;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="fixed inset-0"
        style={{ background: 'rgb(var(--bg) / 0.82)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="panel relative my-auto w-full max-w-[900px] overflow-hidden"
        style={{ animation: 'none' }}
      >
        {/* Header ------------------------------------------------- */}
        <div
          className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 py-4 backdrop-blur-xl sm:px-6"
          style={{ background: 'rgb(var(--surface) / 0.9)', borderBottom: '1px solid rgb(var(--line))' }}
        >
          <div className="min-w-0">
            <span className="kbd text-[9.5px]">{project.kind}</span>
            <h2 id="project-modal-title" className="mt-1 text-[1.1rem] leading-snug sm:text-[1.3rem]">
              {project.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:text-azure-500"
            style={{ border: '1px solid rgb(var(--line))' }}
          >
            <FaTimes />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {/* Objective */}
          <p className="text-[14px] leading-relaxed">{project.objective}</p>

          {/* Metrics */}
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {project.metrics.map((m) => (
              <div key={m.label} className="panel-2 p-3">
                <div className="font-display text-[1.05rem] font-semibold leading-none accent-text">
                  {m.value}
                  {m.unit && <span className="ml-1 font-mono text-[10px]">{m.unit}</span>}
                </div>
                <div className="kbd mt-1.5 text-[9px]">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Data flow */}
          <div className="mt-7">
            <span className="eyebrow">Data Flow</span>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {project.flow.map((step, i) => (
                <React.Fragment key={step}>
                  <span
                    className="rounded-[8px] px-2.5 py-1.5 font-mono text-[11px]"
                    style={{
                      background: 'rgb(var(--surface-2))',
                      border: '1px solid rgb(var(--line))',
                    }}
                  >
                    {step}
                  </span>
                  {i < project.flow.length - 1 && (
                    <FaLongArrowAltRight className="text-[11px] text-azure-500" aria-hidden="true" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Dashboard */}
          <div className="mt-7">
            <span className="eyebrow">Analytics Surface</span>
            <div className="panel-2 mt-3 overflow-hidden">
              <DashboardMock
                variant={project.dashboard}
                label={`Illustrative analytics dashboard for ${project.title}`}
              />
            </div>
            <p className="kbd mt-2 text-[9px]">
              Illustrative dashboard mock-up — design reference, not a product screenshot.
            </p>
          </div>

          {/* Decisions */}
          <div className="mt-7">
            <span className="eyebrow">Key Engineering Decisions</span>
            <ul className="mt-3 space-y-2.5">
              {project.decisions.map((d) => (
                <li key={d} className="flex gap-3 text-[13.5px] leading-relaxed">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: '#3B82F6' }}
                    aria-hidden="true"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="mt-7">
            <span className="eyebrow">Technology</span>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          {project.links?.github && (
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <FaGithub aria-hidden="true" /> View GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
