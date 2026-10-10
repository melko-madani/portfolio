/** Concept diagram for Talent Orchestrator: signals → analysis → human review → discussion material. */
export function TalentOrchestratorVisual() {
  const ink = 'var(--color-ink)'
  const muted = 'var(--color-muted)'
  const sage = 'var(--color-sage-deep)'
  const line = 'var(--line-strong)'
  const surface = '#fbfaf7'
  const signals = ['workload', 'task complexity', 'contributions']
  const outputs = ['review preparation', 'training suggestions', 'mobility options']
  return (
    <div className="plate plate-inner">
      <div aria-hidden="true" className="plate-grid pointer-events-none absolute inset-0" />
      <svg viewBox="0 0 640 380" role="img" aria-labelledby="talent-title" className="relative h-auto w-full font-mono" style={{ fontSize: 11 }}>
        <title id="talent-title">
          Workload, task complexity and contribution signals feed an orchestrator that drafts analyses; every output passes through a human reviewer before becoming review preparation, training suggestions or mobility options.
        </title>
        <defs>
          <marker id="arr2" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0.5 7 4 0 7.5" fill="none" stroke={sage} strokeWidth="1.2" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Signals */}
        <text x="32" y="70" fill={muted} fontSize="9" letterSpacing="1.5">SIGNALS</text>
        {signals.map((s, i) => (
          <g key={s} transform={`translate(32 ${86 + i * 48})`}>
            <rect width="140" height="34" rx="6" fill={surface} stroke={line} />
            <rect x="10" y="12" width="10" height="10" rx="2" fill="var(--color-sand)" />
            <text x="28" y="21" fill={ink} fontSize="10">{s}</text>
          </g>
        ))}
        <text x="32" y="246" fill={muted} fontSize="9">partial proxies —</text>
        <text x="32" y="258" fill={muted} fontSize="9">may encode bias</text>

        {/* Orchestrator */}
        <g transform="translate(212 78)">
          <rect width="152" height="150" rx="8" fill={surface} stroke={line} />
          <text x="16" y="24" fill={ink} fontWeight="600">Orchestrator</text>
          <text x="16" y="38" fill={muted} fontSize="9">drafts · never decides</text>
          {['consolidate signals', 'surface patterns', 'draft talking points', 'cite its sources'].map((t, i) => (
            <g key={t} transform={`translate(16 ${54 + i * 22})`}>
              <circle cx="4" cy="6" r="2.5" fill={sage} />
              <text x="14" y="10" fill={ink} fontSize="10">{t}</text>
            </g>
          ))}
        </g>

        {/* Human gate */}
        <g transform="translate(396 94)">
          <rect width="96" height="118" rx="8" fill="var(--color-ink)" />
          <text x="48" y="28" fill="var(--color-paper)" fontWeight="600" textAnchor="middle">Human</text>
          <text x="48" y="42" fill="var(--color-paper)" fontWeight="600" textAnchor="middle">review</text>
          <circle cx="48" cy="72" r="14" fill="none" stroke="var(--color-sand)" strokeWidth="1.2" />
          <circle cx="48" cy="67" r="4.5" fill="var(--color-sand)" />
          <path d="M39 83a9 9 0 0 1 18 0" fill="var(--color-sand)" />
          <text x="48" y="106" fill="var(--color-sand)" fontSize="9" textAnchor="middle">challenge · adjust · reject</text>
        </g>

        {/* Outputs */}
        <text x="528" y="70" fill={muted} fontSize="9" letterSpacing="1.5">TO DISCUSS</text>
        {outputs.map((o, i) => (
          <g key={o} transform={`translate(528 ${86 + i * 48})`}>
            <rect width="94" height="34" rx="6" fill={surface} stroke={line} />
            <text x="10" y="15" fill={ink} fontSize="9">
              {o.split(' ')[0]}
            </text>
            <text x="10" y="26" fill={muted} fontSize="9">
              {o.split(' ').slice(1).join(' ')}
            </text>
          </g>
        ))}

        {/* Flows */}
        <g fill="none" stroke={sage} strokeWidth="1.2" markerEnd="url(#arr2)">
          <path className="flow" d="M172 103 C192 103 192 130 210 130" />
          <path className="flow" d="M172 151 L210 151" />
          <path className="flow" d="M172 199 C192 199 192 172 210 172" />
          <path className="flow" d="M364 153 L394 153" />
          <path className="flow" d="M492 153 C510 153 510 103 526 103" />
          <path className="flow" d="M492 153 L526 153" />
          <path className="flow" d="M492 153 C510 153 510 203 526 203" />
        </g>

        {/* Feedback loop */}
        <path d="M444 212 V 262 H 288 V 230" fill="none" stroke={line} strokeDasharray="3 4" markerEnd="url(#arr2)" />
        <text x="300" y="256" fill={muted} fontSize="9">reviewer feedback improves the next draft</text>

        {/* Safeguards */}
        <g transform="translate(32 292)">
          <rect width="590" height="60" rx="8" fill="var(--color-sand-soft)" />
          <text x="16" y="22" fill={ink} fontWeight="600" fontSize="10">Safeguards built into the concept</text>
          <text x="16" y="37" fill="var(--color-ink-3)" fontSize="9">no autonomous HR decision · every recommendation is traceable to its signals</text>
          <text x="16" y="50" fill="var(--color-ink-3)" fontSize="9">consent and data-protection review required before any real deployment</text>
        </g>
      </svg>
    </div>
  )
}
