import { Link } from 'react-router-dom'
import { content } from '../../content'
import { Reveal } from '../Reveal'
import { Arrow, SectionHeading } from '../ui'

export function Experience() {
  const { experience, education, projects, site, ui } = content
  return (
    <section id="experience" className="theme-ink scroll-mt-24 bg-ink py-20 text-paper md:py-28" aria-labelledby="experience-label">
      <div className="container-grid">
        <Reveal>
          <SectionHeading id="experience" number="04" eyebrow={ui.experience.eyebrow} heading={ui.experience.heading} intro={ui.experience.intro} />
        </Reveal>

        <ol className="mt-16 md:mt-24">
          {experience.map((entry, i) => {
            const organisation = site.showEmployerNames && entry.organisation ? entry.organisation : entry.organisationFallback
            const related = entry.relatedProject ? projects.find((p) => p.slug === entry.relatedProject) : undefined
            return (
              <Reveal as="li" key={entry.id} delay={i * 60}>
                <div className="grid-12 gap-y-4 border-t py-8 md:py-10" style={{ borderColor: 'var(--line-inverse)' }}>
                  <div className="col-span-12 md:col-span-3">
                    <p className="meta flex items-center gap-3">
                      <span className="font-medium text-sand">{entry.period}</span>
                      <span aria-hidden="true" className="h-px w-4 bg-sand/50" />
                      <span>{entry.kind === 'internship' ? 'Internship' : 'Role'}</span>
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <h3 className="display-sm">{entry.role}</h3>
                    <p className="mt-1 text-sm text-paper/60">{organisation}</p>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-[0.9375rem] leading-relaxed text-paper/85">{entry.summary}</p>
                    {entry.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm text-paper/70">
                        {entry.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-sand/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {related && entry.kind === 'internship' && (
                      <Link to={`/work/${related.slug}`} className="link-rule mt-5 inline-flex items-center gap-2 text-sm text-sand">
                        {related.title} case study
                        <Arrow />
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            )
          })}
          <hr className="rule" />
        </ol>

        {/* Education, kept inside the dark section as a quieter block */}
        <Reveal className="mt-20 md:mt-28" id="education">
          <div className="grid-12 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <p className="eyebrow">{ui.education.eyebrow}</p>
            </div>
            <ul className="col-span-12 md:col-span-9">
              {education.map((e) => (
                <li key={e.id} className="grid gap-y-1 border-t py-5 sm:grid-cols-[6rem_1fr] sm:gap-x-6" style={{ borderColor: 'var(--line-inverse)' }}>
                  <p className="meta text-sand">{e.period ?? '—'}</p>
                  <div>
                    <p className="text-[0.9375rem] text-paper">
                      {e.degree} <span className="text-paper/60">·</span> {e.field}
                    </p>
                    <p className="mt-1 text-sm text-paper/60">
                      {e.institution}
                      {e.location ? `, ${e.location}` : ''}
                    </p>
                  </div>
                </li>
              ))}
              <li>
                <hr className="rule" />
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
