// Single source of truth for portfolio content.
// Mirrors the one-page Data Engineer CV.

export const profile = {
  name: 'Waqas Naveed',
  title: 'Data Engineer',
  subtitle: 'Cloud & Real-Time Data Engineering',
  positioning: 'Real-Time Data · Cloud Architecture · Big Data · Streaming · Data Platforms',
  location: 'Faisalabad, Pakistan',
  email: 'waqas56jb@gmail.com',
  phone: '+92 347 7603854',
  cv: '/assets/Waqas_Naveed_Data_Engineer.pdf',
  github: 'https://github.com/Waqas56jb',
  linkedin: 'https://www.linkedin.com/in/waqas-naveed-630297247',
  site: 'https://personal-portfolio-website-opal-five.vercel.app/',
  headline: 'Engineering Data Systems That Scale.',
  rotating: ['Real-Time Streaming', 'Cloud Platforms', 'Distributed Data'],
  intro:
    'Data Engineer building real-time streaming platforms, cloud data pipelines and scalable analytics systems across AWS and Azure.',
  about:
    'Data Engineer focused on real-time streaming, cloud platforms, distributed processing and scalable data architectures. I build systems that move, process and transform data reliably at scale.',
  availability: 'Available for Data Engineering Projects',
};

export const education = {
  degree: 'BS Computer Science',
  school: 'FAST National University (NUCES)',
  period: '2021 — 2025',
  location: 'Pakistan',
};

export const metrics = [
  { value: 3, suffix: '+', label: 'Years Experience', note: 'Engineering & freelance' },
  { value: 200, suffix: '+', label: 'Projects Delivered', note: 'Engineering & AI work' },
  { value: 1000, suffix: '+', label: 'Records / Second', note: 'Multi-cloud platform' },
  { value: 2, suffix: '', label: 'Clouds Engineered', note: 'AWS + Azure' },
];

export const markets = ['USA', 'UK', 'Saudi Arabia', 'Kuwait', 'Germany', 'France'];

export const credibility = [
  'Top Rated Seller on Fiverr',
  '3+ Years Freelancing Experience',
  'Real-Time Data Systems',
];

export const marqueeTech = [
  'Apache Kafka', 'Apache Spark', 'PySpark', 'Databricks', 'Delta Lake',
  'Apache Airflow', 'dbt', 'Scala', 'AWS', 'Azure', 'Amazon Redshift',
  'Azure Synapse', 'ADLS Gen2', 'Amazon MSK', 'PostgreSQL', 'Redis',
  'Docker', 'Kubernetes', 'Terraform', 'Power BI',
];

/* ---------------------------------------------------------------- skills */

export const skillGroups = [
  {
    id: 'de',
    title: 'Data Engineering',
    blurb: 'Pipelines, modeling and quality',
    items: [
      { name: 'Apache Kafka', note: 'High-throughput event streaming' },
      { name: 'Apache Spark', note: 'Distributed data processing' },
      { name: 'PySpark', note: 'Python Spark transformations' },
      { name: 'Scala', note: 'JVM Spark workloads' },
      { name: 'Apache Airflow', note: 'Pipeline orchestration' },
      { name: 'dbt', note: 'Warehouse transformation layer' },
      { name: 'ETL / ELT', note: 'Batch and streaming ingestion' },
      { name: 'Data Modeling', note: 'Star and snowflake schemas' },
      { name: 'Data Quality', note: 'Contracts, tests, gates' },
      { name: 'Data Lineage', note: 'Column-level traceability' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    blurb: 'AWS and Azure data services',
    items: [
      { name: 'AWS', note: 'Core cloud platform' },
      { name: 'Azure', note: 'Enterprise data services' },
      { name: 'Amazon S3', note: 'Data lake object storage' },
      { name: 'Amazon Redshift', note: 'Cloud OLAP warehouse' },
      { name: 'Amazon MSK', note: 'Managed Kafka streaming' },
      { name: 'AWS Glue', note: 'Serverless ETL and catalog' },
      { name: 'Amazon Athena', note: 'SQL over the data lake' },
      { name: 'Azure Data Factory', note: 'Managed ingestion pipelines' },
      { name: 'ADLS Gen2', note: 'Hierarchical lake storage' },
      { name: 'Azure Databricks', note: 'Lakehouse analytics platform' },
      { name: 'Azure Synapse', note: 'Enterprise OLAP serving' },
      { name: 'Azure Event Hubs', note: 'Cloud event ingestion' },
    ],
  },
  {
    id: 'lakehouse',
    title: 'Lakehouse',
    blurb: 'Reliable storage at scale',
    items: [
      { name: 'Delta Lake', note: 'Reliable lakehouse storage' },
      { name: 'Bronze / Silver / Gold', note: 'Medallion refinement layers' },
      { name: 'Data Lake', note: 'Raw immutable landing zone' },
      { name: 'Lakehouse Architecture', note: 'Lake economics, warehouse rigor' },
      { name: 'Schema Evolution', note: 'Non-breaking structural change' },
      { name: 'ACID Transactions', note: 'Consistent concurrent writes' },
    ],
  },
  {
    id: 'db',
    title: 'Databases',
    blurb: 'Transactional and spatial stores',
    items: [
      { name: 'PostgreSQL', note: 'Primary transactional store' },
      { name: 'PostGIS', note: 'Geospatial query engine' },
      { name: 'Redis', note: 'Hot state and caching' },
      { name: 'MySQL', note: 'Relational OLTP workloads' },
      { name: 'MongoDB', note: 'Document-oriented storage' },
    ],
  },
  {
    id: 'dist',
    title: 'Distributed Systems',
    blurb: 'Event-driven and fault tolerant',
    items: [
      { name: 'Event-Driven Architecture', note: 'Loose coupling via events' },
      { name: 'WebSockets', note: 'Bi-directional live channels' },
      { name: 'Redis Pub/Sub', note: 'Low-latency fan-out' },
      { name: 'Distributed Processing', note: 'Parallel cluster compute' },
      { name: 'Horizontal Scaling', note: 'Scale out, not up' },
      { name: 'Fault Tolerance', note: 'Retries, replay, idempotency' },
      { name: 'Transactional Outbox', note: 'Reliable event publishing' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    blurb: 'Ship and operate pipelines',
    items: [
      { name: 'Docker', note: 'Reproducible runtimes' },
      { name: 'Kubernetes', note: 'Container orchestration' },
      { name: 'Terraform', note: 'Infrastructure as code' },
      { name: 'Git', note: 'Version control workflow' },
      { name: 'GitHub', note: 'Reviews and automation' },
      { name: 'CI/CD', note: 'Automated build and deploy' },
      { name: 'Linux', note: 'Server and shell tooling' },
      { name: 'AWS CLI', note: 'Scripted AWS operations' },
      { name: 'Azure CLI', note: 'Scripted Azure operations' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & BI',
    blurb: 'Turning models into decisions',
    items: [
      { name: 'Power BI', note: 'Executive reporting layer' },
      { name: 'Tableau', note: 'Interactive data exploration' },
      { name: 'Pandas', note: 'Tabular data wrangling' },
      { name: 'NumPy', note: 'Vectorised computation' },
      { name: 'Matplotlib', note: 'Analytical plotting' },
      { name: 'Seaborn', note: 'Statistical visualisation' },
      { name: 'OLAP', note: 'Aggregated analytical serving' },
    ],
  },
  {
    id: 'ai',
    title: 'AI / ML (Secondary)',
    blurb: 'Engineering background',
    items: [
      { name: 'Machine Learning', note: 'Supervised model pipelines' },
      { name: 'Deep Learning', note: 'Neural network training' },
      { name: 'NLP', note: 'Text understanding pipelines' },
      { name: 'Computer Vision', note: 'Image and video models' },
      { name: 'LLMs / RAG', note: 'Retrieval-grounded generation' },
      { name: 'LangChain', note: 'LLM application framework' },
      { name: 'TensorFlow', note: 'Model training framework' },
      { name: 'PyTorch', note: 'Research-grade deep learning' },
    ],
  },
];

/* ------------------------------------------------------------ experience */

export const experience = [
  {
    role: 'AI/ML Engineer',
    company: 'ASTRA Innovation',
    period: '08/2025 — 08/2026',
    location: 'Pakistan',
    current: true,
    bullets: [
      'Built Python data-processing and ML systems with production cloud and backend architectures.',
      'Developed and integrated APIs, databases and scalable services across data workflows.',
      'Delivered AI-powered automation over ingestion and transformation pipelines.',
    ],
    stack: ['Python', 'Cloud', 'APIs', 'ML'],
  },
  {
    role: 'AI Intern',
    company: 'KryptoMind',
    period: '06/2025 — 08/2025',
    location: 'Pakistan',
    current: false,
    bullets: [
      'Prepared and processed datasets powering Python AI/ML training workflows.',
      'Supported model development, testing and integration into application pipelines.',
    ],
    stack: ['Python', 'Data Prep', 'ML'],
  },
];

/* ------------------------------------------------------- architecture map */

export const architecture = [
  {
    id: 'sources',
    label: 'Data Sources',
    tech: 'PostgreSQL · APIs · IoT · Apps',
    purpose: 'Transactional and telemetry origin systems',
  },
  {
    id: 'ingest',
    label: 'Event Ingestion',
    tech: 'Apache Kafka · Amazon MSK · Event Hubs',
    purpose: 'Distributed event streaming buffer',
  },
  {
    id: 'stream',
    label: 'Stream Processing',
    tech: 'Spark Structured Streaming · Scala',
    purpose: 'Stateful transformation in motion',
  },
  {
    id: 'lake',
    label: 'Data Lake',
    tech: 'Amazon S3 · ADLS Gen2',
    purpose: 'Immutable raw landing zone',
  },
  {
    id: 'delta',
    label: 'Delta Lakehouse',
    tech: 'Databricks · Delta Lake',
    purpose: 'Reliable ACID medallion storage',
  },
  {
    id: 'warehouse',
    label: 'OLAP Warehouse',
    tech: 'Amazon Redshift · Azure Synapse',
    purpose: 'Dimensional models for analytics',
  },
  {
    id: 'serve',
    label: 'Analytics & Apps',
    tech: 'Power BI · Tableau · React',
    purpose: 'Decision surfaces for the business',
  },
];

/* ----------------------------------------------------------- 6 projects */

export const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'streaming', label: 'Streaming' },
  { id: 'lakehouse', label: 'Lakehouse' },
  { id: 'warehouse', label: 'Warehouse & BI' },
];

export const projects = [
  {
    id: 'multicloud',
    index: '01',
    title: 'Real-Time Multi-Cloud Data Platform',
    kicker: 'Real-time multi-cloud streaming and analytics platform.',
    category: 'streaming',
    kind: 'Portfolio Project',
    dashboard: 'streaming',
    objective:
      'Stream high-volume transactional events across AWS and Azure, refine them through Delta Lake and serve live analytics.',
    stack: ['AWS', 'Azure', 'Apache Kafka', 'Azure Event Hubs', 'Databricks', 'Scala', 'Apache Spark', 'Delta Lake', 'Apache Airflow', 'React'],
    metrics: [
      { value: '~1,000', unit: 'rec/sec', label: 'Throughput' },
      { value: '2', unit: 'clouds', label: 'AWS + Azure' },
      { value: '3', unit: 'layers', label: 'Medallion' },
    ],
    flow: ['Python Generator', 'Kafka / Event Hubs', 'AWS + Azure', 'Databricks', 'Spark', 'Delta Lake', 'Gold / OLAP', 'React Dashboard'],
    decisions: [
      'Kafka absorbs bursty producers so downstream Spark jobs scale independently of ingest rate.',
      'Bronze keeps raw events immutable, making every Silver and Gold rebuild fully replayable.',
      'Airflow owns scheduling and backfills; Databricks owns compute — no orchestration logic inside jobs.',
    ],
    links: { github: 'https://github.com/Waqas56jb' },
  },
  {
    id: 'lakehouse',
    index: '02',
    title: 'Enterprise Lakehouse Analytics Platform',
    kicker: 'Production-style lakehouse with automated transformation and analytics.',
    category: 'lakehouse',
    kind: 'Portfolio Project',
    dashboard: 'lakehouse',
    objective:
      'Land operational data in S3, refine it through Spark medallion layers and publish governed marts to Redshift.',
    stack: ['AWS S3', 'Apache Spark', 'Databricks', 'Delta Lake', 'Apache Airflow', 'dbt', 'PostgreSQL', 'Amazon Redshift'],
    metrics: [
      { value: '3', unit: 'tiers', label: 'Bronze→Gold' },
      { value: 'ACID', unit: '', label: 'Delta Tables' },
      { value: 'dbt', unit: '', label: 'Tested Models' },
    ],
    flow: ['OLTP', 'S3 Bronze', 'Spark', 'Silver', 'Gold', 'dbt', 'Redshift', 'BI'],
    decisions: [
      'Delta merge handles late-arriving records instead of dropping and reloading whole partitions.',
      'dbt tests run before publish, so a failed contract stops the load rather than corrupting BI.',
      'Schema evolution is declared per table, keeping upstream changes non-breaking.',
    ],
    links: { github: 'https://github.com/Waqas56jb' },
  },
  {
    id: 'iot',
    index: '03',
    title: 'Real-Time IoT Manufacturing Analytics',
    kicker: 'Continuous plant telemetry from sensor to Synapse.',
    category: 'lakehouse',
    kind: 'Portfolio Project',
    dashboard: 'iot',
    objective:
      'Ingest continuously arriving factory telemetry and surface machine health, throughput and downtime in near real time.',
    stack: ['Azure IoT', 'Azure Event Hubs', 'Azure Data Factory', 'ADLS Gen2', 'Databricks', 'Scala', 'Apache Spark', 'Delta Lake', 'Azure Synapse'],
    metrics: [
      { value: '24/7', unit: '', label: 'Ingestion' },
      { value: '5', unit: 'KPIs', label: 'Plant Health' },
      { value: 'OLAP', unit: '', label: 'Synapse Serving' },
    ],
    flow: ['IoT Devices', 'Event Hubs', 'Data Factory', 'ADLS Gen2', 'Databricks', 'Delta Lake', 'Synapse', 'Analytics'],
    decisions: [
      'Event Hubs capture writes straight to ADLS, so raw telemetry survives any downstream failure.',
      'Sensor readings are deduplicated on device-id and event-time before entering Silver.',
      'Gold aggregates are pre-computed per machine and shift to keep Synapse queries cheap.',
    ],
    links: { github: 'https://github.com/Waqas56jb' },
  },
  {
    id: 'sastiride',
    index: '04',
    title: 'Real-Time Ride & Location Data Platform',
    kicker: 'Real-time location, event streaming and distributed matching architecture.',
    category: 'streaming',
    kind: 'Production Platform · SastiRide',
    dashboard: 'map',
    objective:
      'Track drivers live, match rides in under a second and keep every state change durable and replayable.',
    stack: ['AWS', 'Node.js', 'PostgreSQL', 'PostGIS', 'Redis', 'Redis GEO', 'Apache Kafka', 'WebSockets', 'Docker'],
    metrics: [
      { value: '<1s', unit: '', label: 'Match Latency' },
      { value: '4', unit: 'roles', label: 'User Journeys' },
      { value: '2', unit: 'apps', label: 'Android + iOS' },
    ],
    flow: ['Driver GPS', 'Redis GEO', 'Matching', 'Kafka Events', 'Stream Processing', 'Rider Dashboard'],
    decisions: [
      'Redis GEO holds live positions; PostGIS keeps the durable history — hot path never touches disk.',
      'A transactional outbox guarantees no ride event is lost between Postgres and Kafka.',
      'WebSocket fan-out is driven by Redis Pub/Sub so any API node can serve any rider.',
    ],
    links: { github: 'https://github.com/Waqas56jb' },
  },
  {
    id: 'olap',
    index: '05',
    title: 'Cloud Data Warehouse & OLAP Platform',
    kicker: 'Dimensional modeling from raw transactions to executive analytics.',
    category: 'warehouse',
    kind: 'Portfolio Project',
    dashboard: 'olap',
    objective:
      'Convert operational tables into a governed star schema that answers executive questions in seconds.',
    stack: ['AWS S3', 'PySpark', 'Apache Airflow', 'Amazon Redshift', 'dbt', 'PostgreSQL'],
    metrics: [
      { value: 'Star', unit: 'schema', label: 'Fact + Dimensions' },
      { value: '4', unit: 'stages', label: 'ETL Pipeline' },
      { value: 'dbt', unit: '', label: 'Modeling Layer' },
    ],
    flow: ['Transactional Data', 'ETL', 'Data Lake', 'Spark', 'Dimensional Modeling', 'Redshift', 'Analytics'],
    decisions: [
      'Surrogate keys and SCD-2 dimensions preserve history instead of overwriting it.',
      'Pre-aggregated Gold tables keep dashboard queries off the raw fact table.',
      'Airflow sensors gate the load so BI never reads a half-written partition.',
    ],
    links: { github: 'https://github.com/Waqas56jb' },
  },
  {
    id: 'fintech',
    index: '06',
    title: 'Real-Time Financial Event Streaming Platform',
    kicker: 'Sub-second rule evaluation over a live transaction stream.',
    category: 'streaming',
    kind: 'Self-Initiated Engineering Project',
    dashboard: 'fintech',
    objective:
      'Score payment events as they arrive, flag risk in flight and reconcile every decision daily.',
    stack: ['Apache Kafka', 'Python', 'Spark Structured Streaming', 'PostgreSQL', 'Redis', 'AWS', 'Apache Airflow'],
    metrics: [
      { value: '~200', unit: 'ms', label: 'Decision Latency' },
      { value: '12', unit: 'rules', label: 'Risk Engine' },
      { value: 'Redis', unit: '', label: 'Velocity State' },
    ],
    flow: ['Transactions', 'Kafka', 'Stream Processing', 'Rule Engine', 'PostgreSQL', 'Analytics'],
    decisions: [
      'Rolling velocity counters live in Redis so rules evaluate without a database round-trip.',
      'Every decision is written with its rule version, making outcomes auditable after the fact.',
      'Airflow reconciles the stream against the ledger nightly to catch silent drift.',
    ],
    links: { github: 'https://github.com/Waqas56jb' },
  },
];
