import React from 'react';

/* ------------------------------------------------------------------ layout */
const VW = 1020;
const VH = 452;
const COL_X = [22, 220, 420, 626, 830];
const COL_W = [160, 165, 175, 160, 168];
const NODE_H = 54;

const COLUMNS = ['Sources', 'Ingestion', 'Processing', 'Lakehouse', 'Serving'];

const node = (col, row, label, sub, accent) => ({
  col,
  row,
  label,
  sub,
  accent,
  x: COL_X[col],
  w: COL_W[col],
  y: 82 + row * 78,
  h: NODE_H,
});

/* ------------------------------------------------------------------ specs */

const AWS = {
  id: 'aws',
  name: 'AWS Reference Architecture',
  tint: '#F59E0B',
  caption: 'Streaming + batch ingestion into an S3 Delta lakehouse, served through Redshift and Athena.',
  nodes: {
    a0: node(0, 0, 'Aurora PostgreSQL', 'OLTP source'),
    a1: node(0, 1, 'REST APIs / SaaS', 'external feeds'),
    a2: node(0, 2, 'IoT / Clickstream', 'high-volume events'),
    b0: node(1, 0, 'Amazon MSK', 'kafka topics', '#F59E0B'),
    b1: node(1, 2, 'S3 Landing', 'batch drop zone', '#F59E0B'),
    c0: node(2, 0, 'Spark Streaming', 'stateful transforms'),
    c1: node(2, 2, 'AWS Glue', 'PySpark ETL', '#F59E0B'),
    d0: node(3, 0, 'S3 · Bronze', 'raw immutable', '#B4703C'),
    d1: node(3, 1, 'S3 · Silver', 'cleansed + joined', '#94A3B8'),
    d2: node(3, 2, 'S3 · Gold', 'delta aggregates', '#F59E0B'),
    e0: node(4, 0, 'Amazon Redshift', 'OLAP warehouse', '#F59E0B'),
    e1: node(4, 1, 'Amazon Athena', 'ad-hoc SQL', '#F59E0B'),
    e2: node(4, 2, 'Power BI / React', 'decision layer'),
  },
  edges: [
    ['a0', 'b1'], ['a1', 'b0'], ['a2', 'b0'],
    ['b0', 'c0'], ['b1', 'c1'],
    ['c0', 'd0'], ['c1', 'd0'],
    ['d0', 'd1'], ['d1', 'd2'],
    ['d2', 'e0'], ['d2', 'e1'],
    ['e0', 'e2'], ['e1', 'e2'],
  ],
  ops: ['MWAA · Airflow', 'Terraform IaC', 'CloudWatch', 'IAM · KMS · Secrets'],
};

const AZURE = {
  id: 'azure',
  name: 'Azure Reference Architecture',
  tint: '#22D3EE',
  caption: 'Event Hubs and Data Factory feeding an ADLS Gen2 medallion lakehouse, served by Synapse.',
  nodes: {
    a0: node(0, 0, 'Azure SQL DB', 'OLTP source'),
    a1: node(0, 1, 'IoT Devices', 'plant telemetry'),
    a2: node(0, 2, 'App Events', 'product streams'),
    b0: node(1, 0, 'Event Hubs', 'event ingestion', '#22D3EE'),
    b1: node(1, 2, 'Data Factory', 'managed pipelines', '#22D3EE'),
    c0: node(2, 0, 'Databricks', 'scala · structured streaming'),
    c1: node(2, 2, 'Databricks Jobs', 'pyspark batch', '#22D3EE'),
    d0: node(3, 0, 'ADLS · Bronze', 'raw capture', '#B4703C'),
    d1: node(3, 1, 'ADLS · Silver', 'conformed model', '#94A3B8'),
    d2: node(3, 2, 'ADLS · Gold', 'delta marts', '#F59E0B'),
    e0: node(4, 0, 'Synapse Analytics', 'OLAP serving', '#22D3EE'),
    e1: node(4, 1, 'Serverless SQL', 'lake queries', '#22D3EE'),
    e2: node(4, 2, 'Power BI', 'executive reporting'),
  },
  edges: [
    ['a0', 'b1'], ['a1', 'b0'], ['a2', 'b0'],
    ['b0', 'c0'], ['b1', 'c1'],
    ['c0', 'd0'], ['c1', 'd0'],
    ['d0', 'd1'], ['d1', 'd2'],
    ['d2', 'e0'], ['d2', 'e1'],
    ['e0', 'e2'], ['e1', 'e2'],
  ],
  ops: ['ADF Triggers · Airflow', 'Terraform IaC', 'Azure Monitor', 'RBAC · Key Vault'],
};

export const BLUEPRINTS = { aws: AWS, azure: AZURE };

/* ------------------------------------------------------------------ paths */

const edgePath = (from, to) => {
  if (from.col === to.col) {
    const x = from.x + from.w / 2;
    return `M${x},${from.y + from.h} L${x},${to.y}`;
  }
  const x1 = from.x + from.w;
  const y1 = from.y + from.h / 2;
  const x2 = to.x;
  const y2 = to.y + to.h / 2;
  const mid = x1 + (x2 - x1) / 2;
  if (y1 === y2) return `M${x1},${y1} L${x2},${y2}`;
  const r = 10;
  const dir = y2 > y1 ? 1 : -1;
  return [
    `M${x1},${y1}`,
    `L${mid - r},${y1}`,
    `Q${mid},${y1} ${mid},${y1 + r * dir}`,
    `L${mid},${y2 - r * dir}`,
    `Q${mid},${y2} ${mid + r},${y2}`,
    `L${x2},${y2}`,
  ].join(' ');
};

/* -------------------------------------------------------------- component */

const CloudBlueprint = ({ spec }) => {
  const nodes = spec.nodes;

  return (
    <div className="scroll-edge">
      <div className="scroll-x scrollbar-hide">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full min-w-[900px]"
        role="img"
        aria-label={`${spec.name}. ${spec.caption}`}
      >
        <defs>
          <linearGradient id={`bp-node-${spec.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.04" />
          </linearGradient>
          <filter id={`bp-glow-${spec.id}`} x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Column headers + lanes */}
        {COLUMNS.map((c, i) => (
          <g key={c}>
            <rect
              x={COL_X[i] - 10}
              y={44}
              width={COL_W[i] + 20}
              height={252}
              rx="14"
              fill="rgb(var(--surface-2))"
              fillOpacity="0.55"
              stroke="rgb(var(--line))"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            <text
              x={COL_X[i] + COL_W[i] / 2}
              y={32}
              textAnchor="middle"
              style={{ fill: 'rgb(var(--text-dim))' }}
              fontSize="10"
              letterSpacing="1.6"
              fontFamily="JetBrains Mono, monospace"
            >
              {c.toUpperCase()}
            </text>
          </g>
        ))}

        {/* Edges + travelling packets */}
        {spec.edges.map(([f, t], i) => {
          const d = edgePath(nodes[f], nodes[t]);
          const pid = `bp-${spec.id}-${f}-${t}`;
          return (
            <g key={pid}>
              <path id={pid} d={d} fill="none" stroke="rgb(var(--line-strong))" strokeWidth="1.4" />
              <path
                d={d}
                fill="none"
                stroke={spec.tint}
                strokeOpacity="0.5"
                strokeWidth="1.6"
                strokeDasharray="3 7"
                className="animate-dash"
                style={{ animationDelay: `${i * -0.22}s` }}
              />
              <circle r="3.2" fill={spec.tint} opacity="0" filter={`url(#bp-glow-${spec.id})`}>
                <set attributeName="opacity" to="1" begin={`${(i % 5) * 0.5}s`} />
                <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${(i % 5) * 0.5}s`}>
                  <mpath href={`#${pid}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {/* Nodes */}
        {Object.entries(nodes).map(([key, n], i) => (
          <g key={key}>
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="11"
              fill={`url(#bp-node-${spec.id})`}
              stroke="rgb(var(--line-strong))"
              strokeWidth="1"
            />
            <rect
              x={n.x}
              y={n.y + 11}
              width="3"
              height={n.h - 22}
              rx="1.5"
              fill={n.accent || '#3B82F6'}
            />
            <text
              x={n.x + 14}
              y={n.y + 24}
              style={{ fill: 'rgb(var(--text))' }}
              fontSize="12.5"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              {n.label}
            </text>
            <text
              x={n.x + 14}
              y={n.y + 40}
              style={{ fill: 'rgb(var(--text-dim))' }}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              {n.sub}
            </text>
            <circle cx={n.x + n.w - 13} cy={n.y + 14} r="2.6" fill="#22C55E">
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="2.6s"
                begin={`${i * 0.18}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Ops / governance strip */}
        <rect
          x="22"
          y={318}
          width={VW - 44}
          height="62"
          rx="13"
          fill="rgb(var(--surface-2))"
          fillOpacity="0.65"
          stroke="rgb(var(--line))"
          strokeWidth="1"
        />
        <text
          x="40"
          y={342}
          style={{ fill: 'rgb(var(--text-dim))' }}
          fontSize="9.5"
          letterSpacing="1.4"
          fontFamily="JetBrains Mono, monospace"
        >
          ORCHESTRATION · INFRASTRUCTURE · OBSERVABILITY · SECURITY
        </text>
        {spec.ops.map((o, i) => (
          <g key={o}>
            <rect
              x={40 + i * 236}
              y={350}
              width={216}
              height="20"
              rx="10"
              fill={spec.tint}
              fillOpacity="0.1"
              stroke={spec.tint}
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <text
              x={40 + i * 236 + 108}
              y={364}
              textAnchor="middle"
              fill={spec.tint}
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
            >
              {o}
            </text>
          </g>
        ))}

        <text
          x="22"
          y={VH - 24}
          style={{ fill: 'rgb(var(--text-dim))' }}
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          {spec.caption}
        </text>
      </svg>
    </div>
    </div>
  );
};

export default CloudBlueprint;
