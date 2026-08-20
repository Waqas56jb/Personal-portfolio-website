import React from 'react';

const STAGES = [
  { label: 'Producers', tech: 'Python · APIs · IoT' },
  { label: 'Kafka', tech: 'MSK · Event Hubs' },
  { label: 'Spark', tech: 'Structured Streaming' },
  { label: 'Databricks', tech: 'Scala · PySpark' },
  { label: 'Delta Lake', tech: 'Bronze → Gold' },
  { label: 'Warehouse', tech: 'Redshift · Synapse' },
  { label: 'Analytics', tech: 'Power BI · React' },
];

const W = 1240;
const H = 190;
const PAD = 26;
const NODE_W = 148;
const NODE_H = 62;
const GAP = (W - PAD * 2 - NODE_W * STAGES.length) / (STAGES.length - 1);
const CY = 96;

/**
 * Full-width animated data flow. Packets travel stage to stage continuously,
 * so the automation reads as movement rather than a static diagram.
 */
const PipelineBand = () => (
  <div className="scroll-edge">
    <div className="scroll-x scrollbar-hide">
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="min-w-[880px] w-full"
      role="img"
      aria-label="Animated data pipeline: producers to Kafka, Spark, Databricks, Delta Lake, warehouse and analytics."
    >
      <defs>
        <linearGradient id="pb-node" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="pb-rail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <filter id="pb-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {STAGES.map((stage, i) => {
        const x = PAD + i * (NODE_W + GAP);
        const nextX = x + NODE_W + GAP;
        const railId = `pb-path-${i}`;

        return (
          <g key={stage.label}>
            {/* rail + travelling packets */}
            {i < STAGES.length - 1 && (
              <>
                <path
                  id={railId}
                  d={`M${x + NODE_W},${CY} L${nextX},${CY}`}
                  fill="none"
                  stroke="rgb(var(--line))"
                  strokeWidth="2"
                />
                <path
                  d={`M${x + NODE_W},${CY} L${nextX},${CY}`}
                  fill="none"
                  stroke="url(#pb-rail)"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  className="animate-dash"
                  style={{ animationDelay: `${i * -0.3}s` }}
                />
                {[0, 1].map((p) => (
                  <circle key={p} r="3.6" fill="#22D3EE" opacity="0" filter="url(#pb-glow)">
                    <set
                      attributeName="opacity"
                      to="1"
                      begin={`${i * 0.32 + p * 1.1}s`}
                    />
                    <animateMotion
                      dur="2.2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.32 + p * 1.1}s`}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath href={`#${railId}`} />
                    </animateMotion>
                  </circle>
                ))}
              </>
            )}

            {/* node */}
            <rect
              x={x}
              y={CY - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx="12"
              fill="url(#pb-node)"
              stroke="rgb(var(--line-strong))"
              strokeWidth="1"
            />
            <rect
              x={x}
              y={CY - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx="12"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1.4"
              strokeOpacity="0"
            >
              <animate
                attributeName="stroke-opacity"
                values="0;0.9;0"
                dur="2.24s"
                begin={`${i * 0.32}s`}
                repeatCount="indefinite"
              />
            </rect>

            <text
              x={x + NODE_W / 2}
              y={CY - 6}
              textAnchor="middle"
              style={{ fill: 'rgb(var(--text))' }}
              fontSize="14"
              fontWeight="600"
              fontFamily="Space Grotesk, sans-serif"
            >
              {stage.label}
            </text>
            <text
              x={x + NODE_W / 2}
              y={CY + 12}
              textAnchor="middle"
              style={{ fill: 'rgb(var(--text-dim))' }}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              {stage.tech}
            </text>

            <text
              x={x + NODE_W / 2}
              y={CY - NODE_H / 2 - 12}
              textAnchor="middle"
              style={{ fill: 'rgb(var(--text-dim))' }}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              {String(i + 1).padStart(2, '0')}
            </text>

            <circle cx={x + NODE_W / 2} cy={CY + NODE_H / 2 + 16} r="3" fill="#22C55E">
              <animate
                attributeName="opacity"
                values="0.25;1;0.25"
                dur="2.24s"
                begin={`${i * 0.32}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
    </div>
  </div>
);

export default PipelineBand;
