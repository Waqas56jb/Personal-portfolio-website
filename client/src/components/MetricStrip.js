import React from 'react';
import { FaStar, FaGlobeAmericas } from 'react-icons/fa';
import { metrics, markets } from '../data/portfolio';
import Counter from './ui/Counter';
import Reveal from './ui/Reveal';

const MetricStrip = () => (
  <section className="relative py-12 sm:py-14" aria-label="Track record">
    <div className="container-x">
      {/* Metrics ---------------------------------------------------- */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 80}>
            <div className="card spotlight h-full p-4 sm:p-5">
              <div className="font-display text-[1.6rem] font-semibold leading-none sm:text-[2rem]">
                <Counter value={m.value} suffix={m.suffix} className="accent-text" />
              </div>
              <div className="mt-2 text-[13px] font-medium">{m.label}</div>
              <div className="kbd mt-1 text-[9.5px]">{m.note}</div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Credibility ------------------------------------------------- */}
      <Reveal delay={120}>
        <div className="panel mt-4 flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between sm:mt-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <FaGlobeAmericas className="text-azure-500" aria-hidden="true" />
              <h2 className="text-base sm:text-[1.05rem]">Trusted by clients across global markets</h2>
            </div>
            <p className="muted mt-2 max-w-[62ch] text-[13.5px] leading-relaxed">
              3+ years delivering production-grade software and engineering solutions for clients
              across international markets.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5"
              style={{ background: 'rgba(245,158,11,0.10)', border: '1px solid rgba(245,158,11,0.28)' }}
            >
              <FaStar className="text-[11px]" style={{ color: '#F59E0B' }} aria-hidden="true" />
              <span className="font-mono text-[11px]" style={{ color: '#F59E0B' }}>
                Top Rated Seller on Fiverr
              </span>
            </div>
          </div>

          <ul className="flex flex-wrap gap-2 lg:max-w-[380px] lg:justify-end">
            {markets.map((m) => (
              <li key={m} className="chip !px-3 !py-1.5 !text-[11.5px]">{m}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

export default MetricStrip;
