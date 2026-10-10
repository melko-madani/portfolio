import { Link, useParams } from 'react-router-dom'
import { content } from '../content'
import type { CaseStudySection } from '../content/types'
import { Reveal } from '../components/Reveal'
import { Arrow, ArrowUpRight, MetaRow } from '../components/ui'
import { ProjectVisual } from '../components/visuals/ProjectVisual'
import { useActiveSection } from '../hooks/useActiveSection'
import { NotFound } from './NotFound'

function Section({ section }: { section: CaseStudySection }) {
  return (
    <Reveal as="section" id={section.id} className="scroll-mt-28 border-t py-10 md:py-12" >
      <div className="grid-12 gap-y-5">
        <h2 className="display-sm col-span-12 md:col-span-4">{section.heading}</h2>
        <div className="prose-editorial col-span-12 md:col-span-8">
          {section.paragraphs?.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          {section.bullets && (
            <ul>
              {section.bullets.map((b) => (
                <li key={b.slice(0, 32)}>{b}</li>
              ))}
            </ul>
          )}
          {section.facts && (
            <dl className="mt-6 overflow-hidden rounded-lg border" style={{ borderColor: 'var(--line)' }}>
              {section.facts.map((f, i) => (
                <div
                  key={f.label}
                  className={`grid gap-x-6 gap-y-1 px-4 py-3 sm:grid-cols-[11rem_1fr] ${i % 2 === 0 ? 'bg-paper-2/70' : ''}`}
                  style={i > 0 ? { borderTop: '1px solid var(--line)' } : undefined}
                >
                  <dt className="eyebrow pt-0.5">{f.label}</dt>
                  <dd className="text-[0.9375rem] text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {section.note && <p className="meta mt-6 !text-[0.75rem] leading-relaxed">{section.note}</p>}
        </div>
      </div>
    </Reveal>
  )
}

export function CaseStudy() {
  const { slug } = useParams()
  const { projects, ui } = content
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const sectionIds = project ? project.caseStudySections.map((s) => s.id) : []
  const active = useActiveSection(sectionIds)

  if (!project) return <NotFound />

  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pt-28 sm:pt-32 lg:pt-36">
      <div className="container-grid">
        <nav aria-label="Breadcrumb" className="meta">
          <Link to="/#work" className="link-rule inline-flex items-center gap-2 text-muted">
            <Arrow className="rotate-180" />
            {ui.caseStudy.backToWork}
          </Link>
        </nav>

        <header className="grid-12 mt-10 gap-y-8 md:mt-14">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex items-start gap-5 sm:gap-7">
              <span className="numeral -mt-1 shrink-0" aria-hidden="true">
                {project.number}
              </span>
              <div>
                <p className="eyebrow">{project.category}</p>
                <h1 className="display-lg mt-4">
                  {project.title}
                  <span className="block font-display italic text-sage-deep">{project.subtitle}</span>
                </h1>
              </div>
            </div>
            <p className="lede mt-8">{project.summary}</p>
          </div>
          <dl className="col-span-12 lg:col-span-3 lg:col-start-10">
            <MetaRow label={ui.work.status}>{project.statusLabel}</MetaRow>
            {project.year && <MetaRow label="Year">{project.year}</MetaRow>}
            <MetaRow label={ui.work.role}>{project.role}</MetaRow>
            {project.stack.length > 0 && (
              <MetaRow label={ui.work.stack}>
                <ul className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-muted">
                  {project.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </MetaRow>
            )}
            {project.links.length > 0 && (
              <MetaRow label="Links">
                <ul className="flex flex-col gap-1">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-rule inline-flex items-center gap-1.5">
                        {l.label}
                        <ArrowUpRight />
                      </a>
                    </li>
                  ))}
                </ul>
              </MetaRow>
            )}
            <hr className="rule" />
          </dl>
        </header>

        <figure className="mt-14 md:mt-20">
          <ProjectVisual kind={project.visual} />
          <figcaption className="meta mt-3">{project.visualCaption}</figcaption>
        </figure>

        <div className="grid-12 mt-16 gap-y-10 md:mt-24">
          <aside className="col-span-12 lg:col-span-3">
            <nav aria-label={ui.caseStudy.onThisPage} className="lg:sticky lg:top-28">
              <p className="eyebrow">{ui.caseStudy.onThisPage}</p>
              <ol className="mt-4 flex flex-wrap gap-x-4 gap-y-2 lg:flex-col lg:gap-y-2.5">
                {project.caseStudySections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="nav-link !text-[0.8125rem]"
                      data-active={active === s.id}
                      aria-current={active === s.id ? 'location' : undefined}
                    >
                      <span className="meta mr-2 hidden lg:inline">0{i + 1}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="col-span-12 lg:col-span-9">
            {project.caseStudySections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
            <hr className="rule" />
          </div>
        </div>

        {/* Next project */}
        <Reveal className="py-20 md:py-28">
          <p className="eyebrow">{ui.caseStudy.nextProject}</p>
          <Link to={`/work/${next.slug}`} className="group mt-6 flex flex-col gap-4 no-underline md:flex-row md:items-end md:justify-between">
            <span className="display-lg text-ink">
              {next.title}
              <span className="block font-display italic text-ink-3">{next.subtitle}</span>
            </span>
            <span className="btn btn-primary shrink-0">
              {ui.work.readCaseStudy}
              <Arrow />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
