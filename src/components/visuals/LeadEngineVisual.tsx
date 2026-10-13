import type { VisualLabels } from '../../content/types'

/**
 * Illustrative recreation of the lead engine: sources feeding signals, an
 * account list with explained scores and tiers, and the hand-off to the CRM.
 * Organisations, signals and scores are fictitious examples.
 */
export function LeadEngineVisual({ t }: { t: VisualLabels['lead'] }) {
  return (
    <div className="plate plate-inner">
      <div aria-hidden="true" className="plate-grid pointer-events-none absolute inset-0" />
      <div className="relative grid gap-3 p-4 sm:p-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_minmax(0,3fr)]">
        {/* Sources */}
        <div className="ui-surface p-4">
          <p className="eyebrow">{t.sources}</p>
          <ul className="mt-3 space-y-2">
            {t.sourceItems.map((s, i) => (
              <li key={s[0]} className="ui-text flex items-start gap-2">
                <span aria-hidden="true" className={`mt-[0.45em] inline-block size-1.5 shrink-0 rounded-full ${i < 4 ? 'bg-sage-deep pulse-dot' : 'bg-sand'}`} style={{ animationDelay: `${i * 0.4}s` }} />
                <span className="min-w-0">
                  <span className="block text-ink">{s[0]}</span>
                  <span className="ui-muted block text-[0.625rem] uppercase tracking-[0.08em]">{s[1]}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Accounts with explained score */}
        <div className="ui-surface overflow-hidden">
          <div className="flex items-center justify-between border-b px-4 py-2.5" style={{ borderColor: 'var(--line)' }}>
            <p className="eyebrow">{t.accounts}</p>
            <p className="ui-text ui-muted">{t.sortedBy}</p>
          </div>
          <ul>
            {t.rows.map((r, i) => (
              <li key={r.name} className="grid gap-x-3 gap-y-1.5 border-b px-4 py-3 sm:grid-cols-[1fr_auto]" style={{ borderColor: 'var(--line)' }}>
                <div className="min-w-0">
                  <p className="truncate text-[0.8125rem] font-medium text-ink">{r.name}</p>
                  <p className="ui-text ui-muted mt-0.5">{r.meta}</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {r.signals.map((sig) => (
                      <li key={sig} className="rounded-full border px-2 py-0.5 font-mono text-[0.625rem] text-ink-2" style={{ borderColor: 'var(--line-strong)' }}>
                        {sig}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-start gap-3 sm:flex-col sm:items-end">
                  <span className={`rounded-full px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] ${i === 0 ? 'bg-ink text-paper' : i === 1 ? 'bg-sage-soft text-sage-deep' : 'bg-paper-2 text-muted'}`}>
                    {r.tier}
                  </span>
                  <span className="font-mono text-xs text-ink">{r.score}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="ui-text ui-muted px-4 py-2.5">{t.explained}</p>
        </div>

        {/* Hand-off */}
        <div className="theme-ink flex flex-col rounded-lg bg-ink p-4 text-paper">
          <p className="eyebrow">{t.handoff}</p>
          <ol className="mt-3 flex-1 space-y-3">
            {t.steps.map((s, i) => (
              <li key={s[0]} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border border-sand/60 font-mono text-[0.5625rem] text-sand">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[0.8125rem] leading-snug text-paper">{s[0]}</p>
                  <p className="font-mono text-[0.625rem] text-paper/60">{s[1]}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t pt-3 font-mono text-[0.625rem] text-sand" style={{ borderColor: 'var(--line-inverse)' }}>
            {t.privacy}
          </p>
        </div>
      </div>

      {/* Schedule strip */}
      <ol className="relative flex flex-wrap items-center gap-x-3 gap-y-2 border-t px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted sm:px-5" style={{ borderColor: 'var(--line)' }}>
        {t.schedule.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span className={i === t.schedule.length - 1 ? 'text-ink' : undefined}>{s}</span>
            {i < t.schedule.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-sage/70" />}
          </li>
        ))}
      </ol>
    </div>
  )
}
