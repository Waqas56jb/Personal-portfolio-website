import React from 'react';

const STAGES = ['kafka', 'spark', 'delta', 'olap'];

const Preloader = () => (
  <div
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6"
    style={{ background: 'rgb(var(--bg))' }}
    role="status"
    aria-label="Loading portfolio"
  >
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl font-display text-[15px] font-bold text-white"
        style={{ background: 'linear-gradient(135deg,#22D3EE,#2563EB)' }}
      >
        WN
      </span>
      <span className="text-left">
        <span className="block font-display text-[15px] font-semibold">Waqas Naveed</span>
        <span className="kbd block text-[9.5px]">Data Engineer</span>
      </span>
    </div>

    <div className="flex items-center gap-2">
      {STAGES.map((s, i) => (
        <React.Fragment key={s}>
          <span className="kbd text-[9px]">{s}</span>
          {i < STAGES.length - 1 && (
            <span
              className="h-px w-6"
              style={{ background: 'linear-gradient(90deg,#22D3EE,#2563EB)' }}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>

    <div
      className="relative h-[2px] w-40 overflow-hidden rounded-full"
      style={{ background: 'rgb(var(--line))' }}
    >
      <span
        className="absolute inset-y-0 w-1/3 animate-sweep rounded-full"
        style={{ background: 'linear-gradient(90deg,#22D3EE,#2563EB)' }}
      />
    </div>
  </div>
);

export default Preloader;
