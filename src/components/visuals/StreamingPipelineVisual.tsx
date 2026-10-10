/** Schematic of the academic streaming pipeline: Kafka → Spark → Cassandra, observed by Prometheus and Grafana. */
export function StreamingPipelineVisual() {
  const ink = 'var(--color-ink)'
  const muted = 'var(--color-muted)'
  const sage = 'var(--color-sage-deep)'
  const line = 'var(--line-strong)'
  const surface = '#fbfaf7'
  return (
    <div className="plate plate-inner">
      <div aria-hidden="true" className="plate-grid pointer-events-none absolute inset-0" />
      <svg
        viewBox="0 0 640 380"
        role="img"
        aria-labelledby="streaming-title"
        className="relative h-auto w-full font-mono"
        style={{ fontSize: 11 }}
      >
        <title id="streaming-title">
          Producers publish to Kafka topics, Spark Streaming processes micro-batches, results land in a Cassandra cluster; Prometheus and Grafana observe every stage.
        </title>
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0.5 7 4 0 7.5" fill="none" stroke={sage} strokeWidth="1.2" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Producers */}
        <g>
          <text x="40" y="78" fill={muted} fontSize="9" letterSpacing="1.5">PRODUCERS</text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(40 ${92 + i * 42})`}>
              <rect width="88" height="30" rx="5" fill={surface} stroke={line} />
              <circle cx="14" cy="15" r="3" fill={sage} className="pulse-dot" style={{ animationDelay: `${i * 0.5}s` }} />
              <text x="26" y="19" fill={ink}>source {i + 1}</text>
            </g>
          ))}
        </g>

        {/* Kafka */}
        <g transform="translate(176 70)">
          <rect width="112" height="178" rx="8" fill={surface} stroke={line} />
          <text x="14" y="22" fill={ink} fontWeight="600">Apache Kafka</text>
          <text x="14" y="36" fill={muted} fontSize="9">topics · partitions</text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(14 ${54 + i * 36})`}>
              <rect width="84" height="22" rx="3" fill="var(--color-paper-2)" />
              {[0, 1, 2, 3, 4].map((j) => (
                <rect key={j} x={6 + j * 15} y="7" width="10" height="8" rx="1" fill={j < 3 - (i % 2) ? sage : line} />
              ))}
            </g>
          ))}
          <text x="14" y="172" fill={muted} fontSize="9">events in order</text>
        </g>

        {/* Spark */}
        <g transform="translate(336 70)">
          <rect width="112" height="178" rx="8" fill={surface} stroke={line} />
          <text x="14" y="22" fill={ink} fontWeight="600">Spark Streaming</text>
          <text x="14" y="36" fill={muted} fontSize="9">micro-batches</text>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(14 ${54 + i * 36})`}>
              <rect width="84" height="22" rx="3" fill="var(--color-paper-2)" />
              <text x="8" y="15" fill={ink} fontSize="9">
                {['clean', 'enrich', 'aggregate'][i]}
              </text>
              <text x="76" y="15" fill={muted} fontSize="9" textAnchor="end">
                {['t', 't+1', 't+2'][i]}
              </text>
            </g>
          ))}
          <text x="14" y="172" fill={muted} fontSize="9">stateless · scalable</text>
        </g>

        {/* Cassandra */}
        <g transform="translate(496 70)">
          <rect width="112" height="178" rx="8" fill={surface} stroke={line} />
          <text x="14" y="22" fill={ink} fontWeight="600">Cassandra</text>
          <text x="14" y="36" fill={muted} fontSize="9">cluster · 3 nodes</text>
          {[
            [56, 78],
            [30, 124],
            [82, 124],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="16" fill="var(--color-paper-2)" stroke={line} />
              <text x={cx} y={cy + 3} fill={ink} fontSize="9" textAnchor="middle">n{i + 1}</text>
            </g>
          ))}
          <path d="M56 94 30 108M56 94l26 14M46 124h20" stroke={line} />
          <text x="14" y="172" fill={muted} fontSize="9">replicated writes</text>
        </g>

        {/* Flows */}
        <g fill="none" stroke={sage} strokeWidth="1.2" markerEnd="url(#arr)">
          <path className="flow" d="M128 107 C150 107 150 120 174 120" />
          <path className="flow" d="M128 149 L174 149" />
          <path className="flow" d="M128 191 C150 191 150 178 174 178" />
          <path className="flow" d="M288 150 L334 150" />
          <path className="flow" d="M448 150 L494 150" />
        </g>

        {/* Observability */}
        <g transform="translate(176 282)">
          <rect width="432" height="60" rx="8" fill="var(--color-ink)" />
          <text x="18" y="24" fill="var(--color-paper)" fontWeight="600">Prometheus + Grafana</text>
          <text x="18" y="40" fill="var(--color-sand)" fontSize="9">consumer lag · throughput · node health</text>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <rect key={i} x={262 + i * 13} y={38 - [8, 14, 11, 20, 16, 24, 18, 22, 26, 20, 28, 24][i]} width="8" height={[8, 14, 11, 20, 16, 24, 18, 22, 26, 20, 28, 24][i]} fill="var(--color-sage)" opacity={0.55 + (i % 3) * 0.15} />
          ))}
        </g>
        <g fill="none" stroke={line} strokeDasharray="2 4">
          <path d="M232 248v34M392 248v34M552 248v34" />
        </g>
        <text x="40" y="312" fill={muted} fontSize="9" letterSpacing="1.5">METRICS</text>
        <text x="40" y="326" fill={muted} fontSize="9">scraped from</text>
        <text x="40" y="338" fill={muted} fontSize="9">every stage</text>
      </svg>
    </div>
  )
}
