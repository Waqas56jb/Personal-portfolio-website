import React from 'react';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Model the data, not the tool',
    text: 'Start from the questions the business needs answered, then work backwards to grain, keys and contracts. The stack follows the model — never the other way round.',
    out: ['Source inventory', 'Target schema', 'Data contracts'],
  },
  {
    n: '02',
    title: 'Land raw, refine in layers',
    text: 'Everything arrives immutable in Bronze. Silver conforms and de-duplicates, Gold aggregates. Any layer can be rebuilt from Bronze without re-reading the source system.',
    out: ['Medallion layout', 'Partition strategy', 'Replay plan'],
  },
  {
    n: '03',
    title: 'Automate the boring path',
    text: 'Airflow owns scheduling, retries and backfills. dbt owns transformation. Terraform owns infrastructure. Nothing important lives only in someone’s terminal history.',
    out: ['Orchestrated DAGs', 'IaC modules', 'CI/CD gates'],
  },
  {
    n: '04',
    title: 'Prove it before publishing',
    text: 'Quality expectations run inside the pipeline, so a broken load fails loudly instead of quietly reaching a dashboard. Freshness, volume and schema drift are all tracked.',
    out: ['Expectation suite', 'Freshness SLA', 'Drift alerts'],
  },
  {
    n: '05',
    title: 'Hand over something runnable',
    text: 'Runbooks, lineage and dashboards ship with the pipeline. The goal is a platform the team can operate on Monday without me on the call.',
    out: ['Runbook', 'Lineage map', 'Ops dashboard'],
  },
];

const Process = () => (
  <section id="process" className="section" aria-labelledby="process-title">
    <div className="container-x">
      <SectionHeading
        id="process-title"
        eyebrow="How I Work"
        title="A repeatable path from"
        accent="raw source to trusted mart."
        description="The same five steps behind every platform in this portfolio."
      />

      <div className="relative mt-10">
        {/* spine */}
        <div
          className="absolute left-[19px] top-2 bottom-2 hidden w-px sm:block"
          style={{ background: 'linear-gradient(180deg,#22D3EE,#2563EB,transparent)' }}
          aria-hidden="true"
        />

        <ol className="space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 70}>
                <div className="flex gap-4 sm:gap-6">
                  <div className="hidden shrink-0 sm:block">
                    <span
                      className="relative flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px] font-medium"
                      style={{
                        background: 'rgb(var(--surface))',
                        border: '1px solid rgba(59,130,246,0.45)',
                        color: 'rgb(var(--accent))',
                      }}
                    >
                      {s.n}
                      <span
                        className="absolute inset-0 animate-ring-pulse rounded-full"
                        style={{ border: '1px solid rgba(59,130,246,0.5)', animationDelay: `${i * 0.5}s` }}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <div className="card flex-1 p-5">
                    <div className="flex items-baseline gap-3">
                      <span className="kbd sm:hidden">{s.n}</span>
                      <h3 className="text-[1rem] leading-snug">{s.title}</h3>
                    </div>
                    <p className="muted mt-2.5 max-w-[78ch] text-[13.5px] leading-relaxed">{s.text}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.out.map((o) => (
                        <span key={o} className="chip">{o}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Process;
