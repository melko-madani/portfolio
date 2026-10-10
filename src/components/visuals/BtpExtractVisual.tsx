/**
 * Illustrative recreation of the BTPExtract extraction view.
 * Every value is fictitious: no real supplier, address or amount appears.
 */
const FIELDS: { key: string; value: string; highlight?: boolean }[] = [
  { key: 'numero_facture', value: '"FA-2026-0147"' },
  { key: 'date_facture', value: '"2026-03-12"' },
  { key: 'montant_ht', value: '2860.00', highlight: true },
  { key: 'taux_tva', value: '20' },
  { key: 'montant_ttc', value: '3432.00', highlight: true },
  { key: 'nom_installateur', value: '"Atelier Nord Électricité"' },
  { key: 'commune_travaux', value: '"Rouen"' },
  { key: 'code_postal', value: '"76000"' },
  { key: 'adresse_travaux', value: '"14 rue des Tilleuls"' },
]

const STEPS = ['PDF', 'OCR', 'Token repair', 'Supplier', 'Local LLM', 'Validation', 'JSON']

function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span className="relative inline-block rounded-[3px] outline outline-1 outline-sage-deep/70 outline-offset-2">
      <span className="absolute -top-[1.05rem] left-0 whitespace-nowrap font-mono text-[0.5rem] uppercase tracking-[0.12em] text-sage-deep">
        {label}
      </span>
      {children}
    </span>
  )
}

export function BtpExtractVisual() {
  return (
    <div className="plate plate-inner">
      <div aria-hidden="true" className="plate-grid pointer-events-none absolute inset-0" />
      <div className="relative grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:p-8">
        {/* Invoice sheet */}
        <figure className="ui-surface relative min-w-0 overflow-hidden px-5 pb-5 pt-7 sm:px-7 sm:pt-8" aria-label="Fictitious invoice with highlighted fields">
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-12">
            <div className="scanline h-12 w-full bg-gradient-to-b from-transparent via-sage/25 to-transparent" />
          </div>
          <div className="ui-text">
            <div className="flex flex-col gap-6 xs:flex-row xs:items-start xs:justify-between xs:gap-4">
              <div>
                <p className="text-[0.8125rem] font-semibold tracking-tight text-ink">
                  <Field label="nom_installateur">Atelier Nord Électricité</Field>
                </p>
                <p className="ui-muted mt-1">SARL · Électricité générale</p>
              </div>
              <div className="xs:text-right">
                <p className="text-ink">
                  <Field label="numero_facture">FACTURE N° FA-2026-0147</Field>
                </p>
                <p className="ui-muted mt-7">
                  Date : <Field label="date_facture">12/03/2026</Field>
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-dashed pt-3" style={{ borderColor: 'var(--line)' }}>
              <p className="ui-muted">Chantier</p>
              <p className="mt-6 text-ink">
                <Field label="adresse_travaux · code_postal · commune_travaux">14 rue des Tilleuls, 76000 Rouen</Field>
              </p>
            </div>

            <table className="mt-6 w-full border-collapse">
              <thead>
                <tr className="ui-muted text-left">
                  <th className="pb-1.5 font-medium">Désignation</th>
                  <th className="pb-1.5 text-right font-medium">Qté</th>
                  <th className="pb-1.5 text-right font-medium">Montant</th>
                </tr>
              </thead>
              <tbody className="text-ink-2">
                <tr className="border-t" style={{ borderColor: 'var(--line)' }}>
                  <td className="py-1.5">Remplacement du tableau électrique</td>
                  <td className="py-1.5 text-right">1</td>
                  <td className="py-1.5 text-right">1 640,00</td>
                </tr>
                <tr className="border-t" style={{ borderColor: 'var(--line)' }}>
                  <td className="py-1.5">Pose de luminaires LED</td>
                  <td className="py-1.5 text-right">6</td>
                  <td className="py-1.5 text-right">1 220,00</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 ml-auto w-full max-w-[14rem]">
              <div className="ui-field pt-4">
                <span className="ui-muted">Total HT</span>
                <Field label="montant_ht">2 860,00 €</Field>
              </div>
              <div className="ui-field pt-5">
                <span className="ui-muted">TVA</span>
                <Field label="taux_tva">20 %</Field>
              </div>
              <div className="ui-field pt-5 font-semibold text-ink">
                <span>Total TTC</span>
                <Field label="montant_ttc">3 432,00 €</Field>
              </div>
            </div>
          </div>
          <figcaption className="sr-only">A fictitious invoice. Nine fields are outlined to show what the pipeline extracts.</figcaption>
        </figure>

        {/* JSON output + validation */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="theme-ink min-w-0 flex-1 rounded-lg bg-ink p-5 text-paper sm:p-6">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Structured output</p>
              <p className="meta flex items-center gap-2">
                <span className="pulse-dot inline-block size-1.5 rounded-full bg-sage" aria-hidden="true" />
                local · gemma2:9b
              </p>
            </div>
            <pre className="mt-4 overflow-x-auto font-mono text-[0.6875rem] leading-[1.75] text-paper/85 sm:text-xs">
              <code>
                {'{\n'}
                {FIELDS.map((f, i) => (
                  <span key={f.key} className={f.highlight ? 'text-sand' : undefined}>
                    {'  '}
                    <span className="text-sage-soft">"{f.key}"</span>: {f.value}
                    {i < FIELDS.length - 1 ? ',' : ''}
                    {'\n'}
                  </span>
                ))}
                {'}'}
              </code>
            </pre>
          </div>
          <dl className="ui-surface grid gap-x-6 gap-y-3 p-4 font-mono text-[0.6875rem] sm:grid-cols-3 sm:p-5">
            <div>
              <dt className="ui-muted">Supplier</dt>
              <dd className="mt-0.5 text-ink">atelier-nord · specialised prompt</dd>
            </div>
            <div>
              <dt className="ui-muted">Consistency</dt>
              <dd className="mt-0.5 text-sage-deep">TTC = HT × 1.20 ✓</dd>
            </div>
            <div>
              <dt className="ui-muted">Outbound calls</dt>
              <dd className="mt-0.5 text-ink">0</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Pipeline strip */}
      <ol className="relative flex flex-wrap items-center gap-x-2 gap-y-2 border-t px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted sm:px-6 lg:px-8" style={{ borderColor: 'var(--line)' }}>
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span className={i === STEPS.length - 1 ? 'text-ink' : undefined}>{step}</span>
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="h-px w-4 bg-sage/70" />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
