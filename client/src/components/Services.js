import React from 'react';
import {
  FaStream, FaCloud, FaProjectDiagram, FaLayerGroup, FaWarehouse, FaChartBar,
} from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';

const SERVICES = [
  {
    icon: FaStream,
    title: 'Real-Time Streaming',
    text: 'Kafka, MSK and Event Hubs pipelines with Spark Structured Streaming, watermarking and exactly-once delivery.',
    tags: ['Kafka', 'Spark Streaming', 'MSK', 'Event Hubs'],
  },
  {
    icon: FaCloud,
    title: 'Cloud Data Platforms',
    text: 'End-to-end platforms on AWS and Azure — storage, compute, networking, security and cost-aware sizing.',
    tags: ['AWS', 'Azure', 'Terraform', 'IAM'],
  },
  {
    icon: FaProjectDiagram,
    title: 'ETL / ELT & Orchestration',
    text: 'Airflow DAGs and dbt models with retries, backfills, lineage, quality gates and alerting built in.',
    tags: ['Airflow', 'dbt', 'PySpark', 'Glue'],
  },
  {
    icon: FaLayerGroup,
    title: 'Lakehouse Architecture',
    text: 'Delta Lake medallion layers on Databricks with ACID guarantees, schema evolution and time travel.',
    tags: ['Delta Lake', 'Databricks', 'S3', 'ADLS Gen2'],
  },
  {
    icon: FaWarehouse,
    title: 'Warehouse Modeling',
    text: 'Star and snowflake schemas, SCD-2 dimensions and pre-aggregated marts on Redshift and Synapse.',
    tags: ['Redshift', 'Synapse', 'Star Schema', 'SCD-2'],
  },
  {
    icon: FaChartBar,
    title: 'Analytics & BI',
    text: 'Power BI and Tableau dashboards built on governed, tested and documented semantic models.',
    tags: ['Power BI', 'Tableau', 'OLAP', 'Pandas'],
  },
];

const Services = () => (
  <section id="services" className="section" aria-labelledby="services-title">
    <div className="container-x">
      <SectionHeading
        id="services-title"
        eyebrow="Capabilities"
        title="What I build"
        accent="for teams."
        description="Six areas where I take a system from a whiteboard sketch to something on-call engineers can actually run."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <article className="card group h-full p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] transition-transform duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(59,130,246,0.12)', color: '#3B82F6' }}
                    aria-hidden="true"
                  >
                    <Icon className="text-[15px]" />
                  </span>
                  <h3 className="text-[1rem] leading-snug transition-colors group-hover:text-azure-500">
                    {s.title}
                  </h3>
                </div>
                <p className="muted mt-3.5 text-[13px] leading-relaxed">{s.text}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.tags.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Services;
