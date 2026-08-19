import React, { useEffect, useRef, useState } from 'react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import Counter from './ui/Counter';

const POINTS = 44;
const W = 900;
const H = 220;

const seedSeries = () =>
  Array.from({ length: POINTS }, (_, i) => 0.55 + Math.sin(i / 3.2) * 0.16 + Math.sin(i / 1.7) * 0.09);

/**
 * Animated demonstration chart. Clearly labelled as an interactive demo —
 * it visualises pipeline behaviour, it is not live production traffic.
 */
const RealTime = () => {
  const [data, setData] = useState(seedSeries);
  const [running, setRunning] = useState(true);
  const cursor = useRef(POINTS);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !running) return undefined;

    const id = setInterval(() => {
      cursor.current += 1;
      const i = cursor.current;
      const next = 0.55 + Math.sin(i / 3.2) * 0.16 + Math.sin(i / 1.7) * 0.09 + (((i * 37) % 11) - 5) / 90;
      setData((prev) => [...prev.slice(1), Math.max(0.12, Math.min(0.96, next))]);
    }, 900);

    return () => clearInterval(id);
  }, [running]);

  const step = W / (POINTS - 1);
  const pts = data.map((v, i) => [i * step, H - v * H]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${W},${H} L0,${H} Z`;
  const current = Math.round(620 + data[data.length - 1] * 780);

  return (
    <section className="section" aria-labelledby="realtime-title">
      <div className="container-x">
        <SectionHeading
          id="realtime-title"
          eyebrow="Interactive Architecture Demo"
          title="Built for"
          accent="real-time data."
          description="A visual demonstration of how a streaming pipeline behaves under load."
        />

        <Reveal delay={100}>
          <div className="card mt-10 overflow-hidden">
            {/* Toolbar */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-5"
              style={{ borderBottom: '1px solid rgb(var(--line))' }}
            >
              <div className="flex items-center gap-2">
                <span className="live-dot" aria-hidden="true" />
                <span className="kbd">events / second · demo stream</span>
              </div>
              <button
                type="button"
                onClick={() => setRunning((v) => !v)}
                className="rounded-lg px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors hover:text-azure-500"
                style={{ border: '1px solid rgb(var(--line))', color: 'rgb(var(--text-dim))' }}
                aria-pressed={!running}
              >
                {running ? 'Pause' : 'Resume'}
              </button>
            </div>

            {/* Chart */}
            <div className="relative px-2 pt-4 sm:px-4">
              <svg
                viewBox={`0 0 ${W} ${H}`}
                className="w-full"
                preserveAspectRatio="none"
                role="img"
                aria-label={`Demonstration throughput chart, currently around ${current} events per second`}
              >
                <defs>
                  <linearGradient id="rt-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((g) => (
                  <line
                    key={g}
                    x1="0"
                    y1={H * g}
                    x2={W}
                    y2={H * g}
                    stroke="rgb(var(--line))"
                    strokeWidth="1"
                    strokeDasharray="3 6"
                  />
                ))}
                <path d={area} fill="url(#rt-fill)" style={{ transition: 'd 0.9s linear' }} />
                <path
                  d={line}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  style={{ transition: 'd 0.9s linear' }}
                />
              </svg>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px lg:grid-cols-4" style={{ background: 'rgb(var(--line))', marginTop: '1rem' }}>
              {[
                { v: <Counter value={1000} suffix="+" />, l: 'Events / sec' },
                { v: 'LIVE', l: 'Pipeline status' },
                { v: 'AWS + Azure', l: 'Clouds' },
                { v: 'Streaming', l: 'Processing mode' },
              ].map((s) => (
                <div key={s.l} className="px-4 py-4" style={{ background: 'rgb(var(--surface))' }}>
                  <div className="font-display text-[1.05rem] font-semibold accent-text">{s.v}</div>
                  <div className="kbd mt-1 text-[9.5px]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="kbd mt-3 text-[9.5px]">
          Demonstration only — this chart visualises pipeline behaviour and does not represent live production traffic.
        </p>
      </div>
    </section>
  );
};

export default RealTime;
