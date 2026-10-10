/**
 * Illustrative recreation of the MP Maroc tender catalogue.
 * The product interface is in French; tenders, buyers and dates are fictitious.
 */
const FILTERS = ['Travaux', 'Secteur · Bâtiment', 'Région · Casablanca-Settat', 'Date limite · 30 jours']

const TENDERS = [
  {
    ref: 'AO 14/2026',
    title: 'Travaux d’aménagement d’une voie communale — lot 2, revêtement',
    buyer: 'Commune — exemple',
    location: 'Casablanca-Settat',
    category: 'Travaux',
    days: 6,
    tone: 'urgent',
  },
  {
    ref: 'AO 27/2026',
    title: 'Fourniture et installation d’équipements informatiques',
    buyer: 'Office régional — exemple',
    location: 'Casablanca-Settat',
    category: 'Fournitures',
    days: 12,
    tone: 'soon',
  },
  {
    ref: 'AO 09/2026',
    title: 'Études techniques pour la réhabilitation d’un bâtiment administratif',
    buyer: 'Ministère — exemple',
    location: 'Rabat-Salé-Kénitra',
    category: 'Services',
    days: 21,
    tone: 'normal',
  },
] as const

export function MpMarocVisual() {
  return (
    <div className="plate plate-inner">
      <div aria-hidden="true" className="plate-grid pointer-events-none absolute inset-0" />
      <div className="relative p-4 sm:p-6">
        <div className="ui-surface overflow-hidden">
          {/* App bar */}
          <div className="flex items-center justify-between gap-4 border-b px-4 py-3" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex gap-1">
                <span className="block h-2 w-1 skew-y-[-20deg] bg-ink" />
                <span className="block h-2.5 w-1 skew-y-[-20deg] bg-ink" />
                <span className="block h-3 w-1 skew-y-[-20deg] bg-sage-deep" />
              </span>
              <p className="ui-text font-semibold text-ink">MP Maroc</p>
              <p className="ui-text ui-muted hidden sm:block">Catalogue des consultations</p>
            </div>
            <p className="ui-text ui-muted">Tri · date limite</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 border-b px-4 py-3" style={{ borderColor: 'var(--line)' }}>
            {FILTERS.map((f, i) => (
              <span
                key={f}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] ${
                  i === 0 ? 'border-ink bg-ink text-paper' : 'text-ink-2'
                }`}
                style={i === 0 ? undefined : { borderColor: 'var(--line-strong)' }}
              >
                {f}
                {i === 0 && <span aria-hidden="true">×</span>}
              </span>
            ))}
          </div>

          {/* Rows */}
          <ul className="divide-y" style={{ borderColor: 'var(--line)' }}>
            {TENDERS.map((t) => (
              <li key={t.ref} className="grid gap-x-4 gap-y-2 px-4 py-3.5 sm:grid-cols-[5.5rem_1fr_auto]" style={{ borderColor: 'var(--line)' }}>
                <p className="ui-text ui-muted">{t.ref}</p>
                <div className="min-w-0">
                  <p className="truncate text-[0.8125rem] font-medium leading-snug text-ink">{t.title}</p>
                  <p className="ui-text ui-muted mt-1 flex flex-wrap gap-x-3">
                    <span>{t.buyer}</span>
                    <span>{t.location}</span>
                    <span>{t.category}</span>
                  </p>
                </div>
                <p
                  className={`ui-text self-start rounded-full px-2 py-0.5 ${
                    t.tone === 'urgent'
                      ? 'bg-signal/10 text-signal'
                      : t.tone === 'soon'
                        ? 'bg-sand-soft text-ink-2'
                        : 'bg-paper-2 text-muted'
                  }`}
                >
                  J-{t.days}
                </p>
              </li>
            ))}
          </ul>

          {/* Footer: alert + follow */}
          <div className="grid gap-3 border-t bg-paper-2/60 px-4 py-3 sm:grid-cols-2" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-center justify-between gap-3">
              <p className="ui-text">
                <span className="text-ink">Alerte email</span>
                <span className="ui-muted"> · Travaux · Casablanca-Settat</span>
              </p>
              <span aria-hidden="true" className="relative inline-block h-4 w-7 rounded-full bg-sage-deep">
                <span className="absolute right-0.5 top-0.5 size-3 rounded-full bg-paper" />
              </span>
            </div>
            <p className="ui-text ui-muted sm:text-right">
              3 consultations suivies · <span className="text-ink">source officielle ↗</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
