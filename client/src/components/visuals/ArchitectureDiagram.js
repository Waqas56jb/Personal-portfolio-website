import React, { useState } from 'react';
import { architecture } from '../../data/portfolio';

const CLOUD = {
  ingest: ['AWS MSK', 'Azure Event Hubs'],
  lake: ['Amazon S3', 'ADLS Gen2'],
  warehouse: ['Redshift', 'Synapse'],
};

const Connector = () => (
  <div className="flex shrink-0 items-center justify-center lg:w-6" aria-hidden="true">
    {/* vertical on mobile, horizontal on desktop */}
    <svg className="h-6 w-3 lg:hidden" viewBox="0 0 12 24">
      <line
        x1="6" y1="0" x2="6" y2="24"
        stroke="#3B82F6" strokeWidth="1.6" strokeDasharray="3 4"
        className="animate-dash"
      />
    </svg>
    <svg className="hidden h-3 w-6 lg:block" viewBox="0 0 24 12">
      <line
        x1="0" y1="6" x2="24" y2="6"
        stroke="#3B82F6" strokeWidth="1.6" strokeDasharray="3 4"
        className="animate-dash"
      />
    </svg>
  </div>
);

const ArchitectureDiagram = () => {
  const [activeId, setActiveId] = useState(architecture[1].id);
  const active = architecture.find((n) => n.id === activeId) || architecture[0];

  return (
    <div>
      <div className="flex flex-col items-stretch gap-0 lg:flex-row lg:items-center">
        {architecture.map((node, i) => {
          const isActive = node.id === activeId;
          return (
            <React.Fragment key={node.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveId(node.id)}
                onFocus={() => setActiveId(node.id)}
                onClick={() => setActiveId(node.id)}
                aria-pressed={isActive}
                className={`card group relative flex-1 px-3 py-3 text-left transition-all lg:px-3 lg:py-4 ${
                  isActive ? 'border-azure-500/60' : ''
                }`}
              >
                <span
                  className="kbd block text-[9px]"
                  style={{ color: isActive ? '#3B82F6' : undefined }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mt-1 block font-display text-[13px] font-semibold leading-tight">
                  {node.label}
                </span>
                <span className="muted mt-1 block font-mono text-[9.5px] leading-snug">
                  {node.tech.split(' · ')[0]}
                </span>
                {CLOUD[node.id] && (
                  <span className="mt-2 flex flex-wrap gap-1">
                    {CLOUD[node.id].map((c) => (
                      <span
                        key={c}
                        className="rounded-[4px] px-1.5 py-0.5 font-mono text-[8px]"
                        style={{
                          background: c.toLowerCase().includes('azure')
                            ? 'rgba(34,211,238,0.12)'
                            : 'rgba(245,158,11,0.12)',
                          color: c.toLowerCase().includes('azure') ? '#22D3EE' : '#F59E0B',
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </span>
                )}
                <span
                  className={`absolute inset-x-0 bottom-0 h-[2px] origin-left transition-transform duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                  style={{ background: 'linear-gradient(90deg,#22D3EE,#2563EB)' }}
                />
              </button>
              {i < architecture.length - 1 && <Connector />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Detail panel ------------------------------------------------- */}
      <div className="panel mt-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="live-dot" aria-hidden="true" />
            <h3 className="text-base sm:text-lg">{active.label}</h3>
          </div>
          <p className="muted mt-1.5 text-sm">{active.purpose}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 sm:justify-end">
          {active.tech.split(' · ').map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
