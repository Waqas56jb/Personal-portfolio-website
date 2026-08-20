import React from 'react';
import PipelineBand from './visuals/PipelineBand';
import Reveal from './ui/Reveal';

const FlowBand = () => (
  <section className="relative py-10 sm:py-12" aria-label="End to end data flow">
    <div className="container-x">
      <Reveal>
        <div className="card overflow-hidden">
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6"
            style={{ borderBottom: '1px solid rgb(var(--line))' }}
          >
            <div className="flex items-center gap-2.5">
              <span className="live-dot" aria-hidden="true" />
              <h2 className="text-[0.95rem] sm:text-[1.05rem]">
                From raw events to <span className="accent-text">production analytics</span>
              </h2>
            </div>
            <span className="kbd text-[9.5px]">automated · orchestrated · replayable</span>
          </div>

          <div className="px-2 py-4 sm:px-5 sm:py-6">
            <PipelineBand />
            <p className="kbd mt-2 px-2 text-[10px] lg:hidden">Swipe the pipeline to follow the flow.</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default FlowBand;
