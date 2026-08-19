import React from 'react';

/* Shared palette -------------------------------------------------------- */
const BLUE = '#3B82F6';
const CYAN = '#22D3EE';
const GREEN = '#22C55E';
const AMBER = '#F59E0B';
const RED = '#EF4444';
const VIEW_W = 640;
const VIEW_H = 400;

const txt = { fill: 'rgb(var(--text))' };
const dim = { fill: 'rgb(var(--text-dim))' };
const stroke = { stroke: 'rgb(var(--line))' };

/* Small building blocks ------------------------------------------------- */

const Panel = ({ x, y, w, h, children, radius = 8 }) => (
  <>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={radius}
      style={{ fill: 'rgb(var(--surface))' }}
      strokeWidth="1"
      {...stroke}
    />
    {children}
  </>
);

const Kpi = ({ x, y, w = 132, h = 56, label, value, accent = BLUE }) => (
  <>
    <Panel x={x} y={y} w={w} h={h} />
    <rect x={x} y={y + 10} width="2" height={h - 20} rx="1" fill={accent} />
    <text x={x + 12} y={y + 24} style={dim} fontSize="8.5" fontFamily="JetBrains Mono, monospace">
      {label}
    </text>
    <text x={x + 12} y={y + 43} style={txt} fontSize="17" fontWeight="600" fontFamily="Space Grotesk, sans-serif">
      {value}
    </text>
  </>
);

const Title = ({ x, y, children }) => (
  <text x={x} y={y} style={dim} fontSize="8.5" fontFamily="JetBrains Mono, monospace" letterSpacing="0.9">
    {children}
  </text>
);

/* Chart helpers --------------------------------------------------------- */

const areaPath = (points, baseY) => {
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  return `${line} L${points[points.length - 1][0]},${baseY} L${points[0][0]},${baseY} Z`;
};

const linePath = (points) =>
  points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');

const series = (x0, x1, yBase, amp, n, seed) => {
  const pts = [];
  for (let i = 0; i < n; i += 1) {
    const t = i / (n - 1);
    const wobble =
      Math.sin(t * 7 + seed) * 0.45 + Math.sin(t * 17 + seed * 2) * 0.28 + Math.sin(t * 3 + seed) * 0.27;
    pts.push([x0 + t * (x1 - x0), yBase - (0.55 + wobble * 0.45) * amp]);
  }
  return pts;
};

/* Variants -------------------------------------------------------------- */

const Streaming = () => {
  const pts = series(40, 400, 190, 96, 26, 1.2);
  const pts2 = series(40, 400, 190, 62, 26, 3.4);

  return (
    <>
      <Title x="24" y="42">THROUGHPUT · EVENTS PER SECOND</Title>
      <Panel x={24} y={50} w={392} h={150} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="34" y1={72 + i * 32} x2="406" y2={72 + i * 32} strokeWidth="1" strokeDasharray="2 4" {...stroke} />
      ))}
      <path d={areaPath(pts, 190)} fill={BLUE} fillOpacity="0.14" />
      <path d={linePath(pts)} fill="none" stroke={BLUE} strokeWidth="2" strokeLinejoin="round" />
      <path d={linePath(pts2)} fill="none" stroke={CYAN} strokeWidth="1.6" strokeDasharray="4 3" opacity="0.85" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" fill={BLUE} />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="7" fill="none" stroke={BLUE} strokeOpacity="0.5">
        <animate attributeName="r" values="4;11;4" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="2.4s" repeatCount="indefinite" />
      </circle>

      <Kpi x={432} y={50} w={184} h={46} label="AWS · KAFKA INGEST" value="612 /s" accent={AMBER} />
      <Kpi x={432} y={102} w={184} h={46} label="AZURE · EVENT HUBS" value="388 /s" accent={CYAN} />
      <Kpi x={432} y={154} w={184} h={46} label="CONSUMER LAG" value="0.4 s" accent={GREEN} />

      <Title x="24" y="232">MEDALLION LAYERS</Title>
      {[
        { l: 'BRONZE', v: '4.2 M rows', c: '#B4703C', x: 24 },
        { l: 'SILVER', v: '3.9 M rows', c: '#94A3B8', x: 224 },
        { l: 'GOLD', v: '512 K rows', c: AMBER, x: 424 },
      ].map((m) => (
        <g key={m.l}>
          <Panel x={m.x} y={240} w={192} h={54} />
          <circle cx={m.x + 20} cy={267} r="7" fill={m.c} fillOpacity="0.25" stroke={m.c} strokeWidth="1.5" />
          <text x={m.x + 36} y={262} style={dim} fontSize="8" fontFamily="JetBrains Mono, monospace">{m.l}</text>
          <text x={m.x + 36} y={278} style={txt} fontSize="12" fontWeight="600">{m.v}</text>
        </g>
      ))}

      <Title x="24" y="322">PIPELINE STAGES</Title>
      {['Kafka', 'Spark', 'Databricks', 'Delta', 'Synapse'].map((s, i) => (
        <g key={s}>
          <Panel x={24 + i * 122} y={330} w={106} h={38} radius={7} />
          <circle cx={40 + i * 122} cy={349} r="3" fill={GREEN}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
          </circle>
          <text x={52 + i * 122} y={353} style={txt} fontSize="10.5" fontWeight="500">{s}</text>
          {i < 4 && (
            <line
              x1={130 + i * 122}
              y1="349"
              x2={146 + i * 122}
              y2="349"
              stroke={BLUE}
              strokeWidth="1.6"
              strokeDasharray="3 4"
              className="animate-dash"
            />
          )}
        </g>
      ))}
    </>
  );
};

const Lakehouse = () => (
  <>
    <Kpi x={24} y={38} label="TABLES MANAGED" value="48" />
    <Kpi x={166} y={38} label="DBT TESTS PASSED" value="212" accent={GREEN} />
    <Kpi x={308} y={38} label="SCHEMA DRIFTS" value="0" accent={CYAN} />
    <Kpi x={450} y={38} w={166} label="LAST RUN" value="04m ago" accent={AMBER} />

    <Title x="24" y="128">MEDALLION VOLUME BY LAYER</Title>
    <Panel x={24} y={136} w={370} h={170} />
    {[
      { l: 'Bronze', v: 0.94, c: '#B4703C', rows: '4.2 M' },
      { l: 'Silver', v: 0.72, c: '#94A3B8', rows: '3.9 M' },
      { l: 'Gold', v: 0.31, c: AMBER, rows: '512 K' },
    ].map((b, i) => (
      <g key={b.l}>
        <text x="40" y={175 + i * 48} style={dim} fontSize="9" fontFamily="JetBrains Mono, monospace">{b.l}</text>
        <rect x="40" y={182 + i * 48} width="300" height="12" rx="6" style={{ fill: 'rgb(var(--surface-2))' }} />
        <rect x="40" y={182 + i * 48} width={300 * b.v} height="12" rx="6" fill={b.c} fillOpacity="0.85" />
        <text x="348" y={192 + i * 48} style={txt} fontSize="9.5" textAnchor="start" fontFamily="JetBrains Mono, monospace">{b.rows}</text>
      </g>
    ))}

    <Title x="410" y="128">DELTA TABLE HEALTH</Title>
    <Panel x={410} y={136} w={206} h={170} />
    {[
      { n: 'fct_orders', s: 'OK', c: GREEN },
      { n: 'dim_customer', s: 'OK', c: GREEN },
      { n: 'dim_product', s: 'OK', c: GREEN },
      { n: 'stg_events', s: 'MERGE', c: AMBER },
      { n: 'raw_ingest', s: 'OK', c: GREEN },
    ].map((r, i) => (
      <g key={r.n}>
        <text x="426" y={162 + i * 28} style={txt} fontSize="10" fontFamily="JetBrains Mono, monospace">{r.n}</text>
        <rect x="546" y={152 + i * 28} width="54" height="15" rx="7.5" fill={r.c} fillOpacity="0.16" />
        <text x="573" y={163 + i * 28} fill={r.c} fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono, monospace">{r.s}</text>
        {i < 4 && <line x1="426" y1={170 + i * 28} x2="600" y2={170 + i * 28} strokeWidth="1" {...stroke} />}
      </g>
    ))}

    <Title x="24" y="332">PIPELINE · OLTP → S3 → SPARK → DBT → REDSHIFT</Title>
    {['OLTP', 'S3 Bronze', 'Spark', 'Gold', 'dbt', 'Redshift'].map((s, i) => (
      <g key={s}>
        <Panel x={24 + i * 100} y={340} w={84} h={34} radius={7} />
        <text x={66 + i * 100} y={361} style={txt} fontSize="10" textAnchor="middle" fontWeight="500">{s}</text>
        {i < 5 && (
          <line x1={108 + i * 100} y1="357" x2={124 + i * 100} y2="357" stroke={BLUE} strokeWidth="1.6" strokeDasharray="3 4" className="animate-dash" />
        )}
      </g>
    ))}
  </>
);

const Iot = () => {
  const temp = series(40, 300, 300, 70, 30, 2.1);

  return (
    <>
      <Title x="24" y="42">MACHINE HEALTH</Title>
      {[
        { n: 'LINE A', v: 96, c: GREEN },
        { n: 'LINE B', v: 88, c: GREEN },
        { n: 'LINE C', v: 62, c: AMBER },
        { n: 'LINE D', v: 34, c: RED },
      ].map((m, i) => {
        const cx = 84 + i * 146;
        const r = 26;
        const circ = 2 * Math.PI * r;
        return (
          <g key={m.n}>
            <Panel x={24 + i * 146} y={50} w={124} h={104} />
            <circle cx={cx} cy={95} r={r} fill="none" style={{ stroke: 'rgb(var(--surface-2))' }} strokeWidth="6" />
            <circle
              cx={cx}
              cy={95}
              r={r}
              fill="none"
              stroke={m.c}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${(circ * m.v) / 100} ${circ}`}
              transform={`rotate(-90 ${cx} 95)`}
            />
            <text x={cx} y={100} style={txt} fontSize="15" fontWeight="600" textAnchor="middle">{m.v}%</text>
            <text x={cx} y={140} style={dim} fontSize="8.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">{m.n}</text>
          </g>
        );
      })}

      <Title x="24" y="188">TEMPERATURE · LAST 60 MIN</Title>
      <Panel x={24} y={196} w={300} h={124} />
      <path d={areaPath(temp, 300)} fill={AMBER} fillOpacity="0.12" />
      <path d={linePath(temp)} fill="none" stroke={AMBER} strokeWidth="1.8" />
      <line x1="40" y1="248" x2="300" y2="248" stroke={RED} strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
      <text x="292" y="244" fill={RED} fontSize="7.5" textAnchor="end" fontFamily="JetBrains Mono, monospace">THRESHOLD</text>

      <Title x="340" y="188">PRODUCTION RATE · UNITS / HOUR</Title>
      <Panel x={340} y={196} w={276} h={124} />
      {[62, 78, 71, 88, 94, 81, 69, 90].map((v, i) => (
        <rect
          key={i}
          x={356 + i * 32}
          y={306 - v}
          width="18"
          height={v}
          rx="3"
          fill={i === 4 ? CYAN : BLUE}
          fillOpacity={i === 4 ? 0.95 : 0.55}
        />
      ))}

      <Kpi x={24} y={334} w={142} h={48} label="THROUGHPUT" value="1.4 K/h" />
      <Kpi x={176} y={334} w={142} h={48} label="DOWNTIME" value="12 min" accent={RED} />
      <Kpi x={328} y={334} w={142} h={48} label="OEE" value="87.2%" accent={GREEN} />
      <Kpi x={480} y={334} w={136} h={48} label="ACTIVE SENSORS" value="248" accent={CYAN} />
    </>
  );
};

const MapOps = () => {
  const routes = [
    'M60,300 C140,250 180,180 260,150',
    'M320,340 C360,260 420,240 500,190',
    'M100,140 C180,120 240,180 330,200',
  ];

  return (
    <>
      <Title x="24" y="42">LIVE FLEET · FAISALABAD ZONE</Title>
      <Panel x={24} y={50} w={412} h={318} />

      {/* street grid */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`v${i}`} x1={24 + (i + 1) * 51} y1="50" x2={24 + (i + 1) * 51} y2="368" strokeWidth="1" {...stroke} opacity="0.55" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={`h${i}`} x1="24" y1={50 + (i + 1) * 53} x2="436" y2={50 + (i + 1) * 53} strokeWidth="1" {...stroke} opacity="0.55" />
      ))}

      {/* geofence */}
      <circle cx="240" cy="200" r="92" fill={BLUE} fillOpacity="0.05" stroke={BLUE} strokeWidth="1" strokeDasharray="5 5" />
      <circle cx="240" cy="200" r="92" fill="none" stroke={CYAN} strokeWidth="1" opacity="0.5">
        <animate attributeName="r" values="30;92;30" dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.55;0;0.55" dur="4s" repeatCount="indefinite" />
      </circle>

      {routes.map((d, i) => (
        <g key={d}>
          <path id={`route-${i}`} d={d} fill="none" stroke={BLUE} strokeWidth="1.8" strokeOpacity="0.5" strokeDasharray="4 5" />
          <g>
            <rect x="-5" y="-4" width="10" height="8" rx="2" fill={i === 1 ? CYAN : GREEN} />
            <animateMotion dur={`${6 + i * 1.6}s`} repeatCount="indefinite" rotate="auto">
              <mpath href={`#route-${i}`} />
            </animateMotion>
          </g>
        </g>
      ))}

      {[[120, 110], [300, 250], [200, 320], [390, 130], [260, 90]].map(([cx, cy], i) => (
        <g key={`p${i}`}>
          <circle cx={cx} cy={cy} r="4" fill={CYAN} />
          <circle cx={cx} cy={cy} r="4" fill="none" stroke={CYAN} strokeWidth="1">
            <animate attributeName="r" values="4;13;4" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      <Kpi x={450} y={50} w={166} h={50} label="ACTIVE DRIVERS" value="184" accent={GREEN} />
      <Kpi x={450} y={106} w={166} h={50} label="MATCH LATENCY" value="0.7 s" accent={CYAN} />
      <Kpi x={450} y={162} w={166} h={50} label="RIDES / MIN" value="42" />
      <Kpi x={450} y={218} w={166} h={50} label="REDIS GEO KEYS" value="1.2 K" accent={AMBER} />

      <Title x="450" y="292">EVENT STREAM</Title>
      <Panel x={450} y={300} w={166} h={68} />
      {['ride.requested', 'driver.matched', 'trip.started'].map((e, i) => (
        <g key={e}>
          <circle cx="464" cy={318 + i * 18} r="2.5" fill={GREEN} />
          <text x="474" y={321 + i * 18} style={dim} fontSize="8.5" fontFamily="JetBrains Mono, monospace">{e}</text>
        </g>
      ))}
    </>
  );
};

const Olap = () => (
  <>
    <Kpi x={24} y={38} w={140} label="REVENUE (MTD)" value="$1.24 M" accent={GREEN} />
    <Kpi x={174} y={38} w={140} label="ORDERS" value="86,412" />
    <Kpi x={324} y={38} w={140} label="AVG BASKET" value="$14.35" accent={CYAN} />
    <Kpi x={474} y={38} w={142} label="QUERY P95" value="1.8 s" accent={AMBER} />

    <Title x="24" y="128">REVENUE TREND · 12 MONTHS</Title>
    <Panel x={24} y={136} w={356} h={158} />
    {[44, 52, 49, 61, 58, 70, 66, 79, 74, 88, 84, 96].map((v, i) => (
      <g key={i}>
        <rect x={42 + i * 28} y={282 - v} width="15" height={v} rx="3" fill={BLUE} fillOpacity={i > 9 ? 0.95 : 0.5} />
      </g>
    ))}
    <line x1="34" y1="282" x2="370" y2="282" strokeWidth="1" {...stroke} />

    <Title x="396" y="128">STAR SCHEMA</Title>
    <Panel x={396} y={136} w={220} h={158} />
    <rect x="466" y="192" width="80" height="46" rx="7" fill={BLUE} fillOpacity="0.16" stroke={BLUE} strokeWidth="1.2" />
    <text x="506" y="211" style={txt} fontSize="10" fontWeight="600" textAnchor="middle">fct_sales</text>
    <text x="506" y="225" style={dim} fontSize="7.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">86 M rows</text>
    {[
      { x: 414, y: 152, l: 'dim_date' },
      { x: 552, y: 152, l: 'dim_geo' },
      { x: 414, y: 252, l: 'dim_cust' },
      { x: 552, y: 252, l: 'dim_prod' },
    ].map((d) => (
      <g key={d.l}>
        <line x1={d.x + 26} y1={d.y + 14} x2="506" y2="215" strokeWidth="1" stroke={CYAN} strokeOpacity="0.45" strokeDasharray="3 3" />
        <rect x={d.x} y={d.y} width="52" height="28" rx="6" style={{ fill: 'rgb(var(--surface-2))' }} strokeWidth="1" {...stroke} />
        <text x={d.x + 26} y={d.y + 18} style={dim} fontSize="7.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">{d.l}</text>
      </g>
    ))}

    <Title x="24" y="326">AIRFLOW DAG · nightly_warehouse_load</Title>
    {['extract', 'land_s3', 'spark_tx', 'build_dims', 'load_fct', 'dbt_test'].map((s, i) => (
      <g key={s}>
        <Panel x={24 + i * 100} y={334} w={84} h={32} radius={7} />
        <circle cx={38 + i * 100} cy={350} r="3" fill={i === 5 ? AMBER : GREEN} />
        <text x={48 + i * 100} y={354} style={txt} fontSize="9" fontFamily="JetBrains Mono, monospace">{s}</text>
        {i < 5 && <line x1={108 + i * 100} y1="350" x2={124 + i * 100} y2="350" stroke={BLUE} strokeWidth="1.5" strokeDasharray="3 4" className="animate-dash" />}
      </g>
    ))}
  </>
);

const Fintech = () => {
  const tps = series(40, 400, 196, 92, 34, 4.7);

  return (
    <>
      <Title x="24" y="42">TRANSACTIONS PER SECOND</Title>
      <Panel x={24} y={50} w={392} h={156} />
      <path d={areaPath(tps, 196)} fill={CYAN} fillOpacity="0.12" />
      <path d={linePath(tps)} fill="none" stroke={CYAN} strokeWidth="1.9" />
      {[6, 14, 27].map((i) => (
        <circle key={i} cx={tps[i][0]} cy={tps[i][1]} r="3.5" fill={RED} />
      ))}
      <text x="404" y="66" fill={RED} fontSize="7.5" textAnchor="end" fontFamily="JetBrains Mono, monospace">● RISK EVENT</text>

      <Kpi x={432} y={50} w={184} h={46} label="DECISION LATENCY" value="198 ms" accent={GREEN} />
      <Kpi x={432} y={102} w={184} h={46} label="FLAGGED / MIN" value="27" accent={RED} />
      <Kpi x={432} y={154} w={184} h={46} label="RULES ACTIVE" value="12" accent={AMBER} />

      <Title x="24" y="236">LATENCY DISTRIBUTION (ms)</Title>
      <Panel x={24} y={244} w={286} h={124} />
      {[12, 28, 52, 74, 96, 78, 54, 33, 19, 9].map((v, i) => (
        <rect key={i} x={40 + i * 26} y={356 - v} width="16" height={v} rx="2.5" fill={BLUE} fillOpacity={i === 4 ? 0.95 : 0.45} />
      ))}
      <text x="46" y="366" style={dim} fontSize="7" fontFamily="JetBrains Mono, monospace">50</text>
      <text x="286" y="366" style={dim} fontSize="7" fontFamily="JetBrains Mono, monospace">500</text>

      <Title x="326" y="236">RISK ENGINE · RECENT DECISIONS</Title>
      <Panel x={326} y={244} w={290} h={124} />
      {[
        { id: 'txn_9f31', r: 'velocity_5m', s: 'BLOCK', c: RED },
        { id: 'txn_9f2e', r: 'geo_mismatch', s: 'REVIEW', c: AMBER },
        { id: 'txn_9f2a', r: 'amount_z', s: 'PASS', c: GREEN },
        { id: 'txn_9f27', r: 'device_new', s: 'REVIEW', c: AMBER },
      ].map((r, i) => (
        <g key={r.id}>
          <text x="342" y={268 + i * 26} style={txt} fontSize="9" fontFamily="JetBrains Mono, monospace">{r.id}</text>
          <text x="424" y={268 + i * 26} style={dim} fontSize="8.5" fontFamily="JetBrains Mono, monospace">{r.r}</text>
          <rect x="536" y={257 + i * 26} width="62" height="15" rx="7.5" fill={r.c} fillOpacity="0.16" />
          <text x="567" y={268 + i * 26} fill={r.c} fontSize="7.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace">{r.s}</text>
        </g>
      ))}
    </>
  );
};

const VARIANTS = {
  streaming: Streaming,
  lakehouse: Lakehouse,
  iot: Iot,
  map: MapOps,
  olap: Olap,
  fintech: Fintech,
};

/**
 * Illustrative dashboard mock-up rendered entirely as SVG.
 * These are design mock-ups of each project's analytics surface, not screenshots.
 */
const DashboardMock = ({ variant = 'streaming', label, className = '' }) => {
  const Variant = VARIANTS[variant] || Streaming;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className={`w-full ${className}`}
      role="img"
      aria-label={label || `Illustrative ${variant} analytics dashboard mock-up`}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect width={VIEW_W} height={VIEW_H} style={{ fill: 'rgb(var(--surface-2))' }} />
      {/* window chrome */}
      <line x1="0" y1="22" x2={VIEW_W} y2="22" strokeWidth="1" {...stroke} />
      {[12, 26, 40].map((cx, i) => (
        <circle key={cx} cx={cx} cy="11" r="3.2" fill={[RED, AMBER, GREEN][i]} fillOpacity="0.55" />
      ))}
      <text x="58" y="14.5" style={dim} fontSize="8" fontFamily="JetBrains Mono, monospace">
        analytics · {variant}
      </text>
      <Variant />
    </svg>
  );
};

export default DashboardMock;
