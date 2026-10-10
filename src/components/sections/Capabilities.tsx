import { useContent } from '../../lib/locale'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../ui'

export function Capabilities() {
  const { capabilities, ui } = useContent()
  return (
    <section id="capabilities" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="capabilities-label">
      <div className="container-grid">
        <Reveal>
          <SectionHeading id="capabilities" number="03" eyebrow={ui.capabilities.eyebrow} heading={ui.capabilities.heading} />
        </Reveal>
        <dl className="mt-14 md:mt-20">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.id} delay={i * 40}>
              <div className="grid-12 items-baseline gap-y-3 border-t py-7 md:py-8" style={{ borderColor: 'var(--line)' }}>
                <div className="col-span-12 flex items-baseline gap-4 md:col-span-4">
                  <span className="meta w-8 shrink-0">0{i + 1}</span>
                  <dt className="display-sm">{cap.title}</dt>
                </div>
                <dd className="col-span-12 md:col-span-4 md:col-start-5">
                  <p className="text-[0.9375rem] leading-relaxed text-ink-2">{cap.problem}</p>
                </dd>
                <dd className="col-span-12 md:col-span-4">
                  <ul className="flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-muted">
                    {cap.tools.map((tool) => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </Reveal>
          ))}
          <hr className="rule" />
        </dl>
      </div>
    </section>
  )
}
