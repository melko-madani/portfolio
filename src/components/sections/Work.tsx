import { Link } from 'react-router-dom'
import type { Project } from '../../content/types'
import { useContent, useHref } from '../../lib/locale'
import { Reveal } from '../Reveal'
import { Arrow, SectionHeading } from '../ui'
import { ProjectVisual } from '../visuals/ProjectVisual'

function ProjectMeta({ project }: { project: Project }) {
  const { ui } = useContent()
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
      <div>
        <dt className="eyebrow">{ui.work.status}</dt>
        <dd className="mt-1 leading-snug text-ink-2">{project.statusLabel}</dd>
      </div>
      <div>
        <dt className="eyebrow">{ui.work.role}</dt>
        <dd className="mt-1 leading-snug text-ink-2">{project.roleShort}</dd>
      </div>
      {project.stack.length > 0 && (
        <div className="col-span-2 sm:col-span-1">
          <dt className="eyebrow">{ui.work.stack}</dt>
          <dd className="mt-1 leading-snug text-ink-2">{project.stack.slice(0, 4).join(' · ')}</dd>
        </div>
      )}
    </dl>
  )
}

function ProjectTitle({ project, as: Tag = 'h3' }: { project: Project; as?: 'h3' }) {
  const { ui } = useContent()
  const href = useHref()
  return (
    <div className="work-title flex items-start gap-5 sm:gap-7">
      <span className="numeral -mt-1 shrink-0" aria-hidden="true">
        {project.number}
      </span>
      <div>
        <p className="eyebrow flex items-center gap-3">
          <span className="sr-only">
            {ui.work.projectPrefix} {project.number} —{' '}
          </span>
          <span>{project.category}</span>
        </p>
        <Tag className="display-md mt-3">
          <Link to={href(`/work/${project.slug}`)} className="no-underline text-ink">
            {project.title}
            <span className="subtitle block font-display italic text-ink-3">{project.subtitle}</span>
          </Link>
        </Tag>
      </div>
    </div>
  )
}

function ReadMore({ project }: { project: Project }) {
  const { ui } = useContent()
  const href = useHref()
  return (
    <Link to={href(`/work/${project.slug}`)} className="btn btn-ghost mt-2 self-start">
      {ui.work.readCaseStudy}
      <Arrow />
    </Link>
  )
}

function VisualFrame({ project }: { project: Project }) {
  const { ui } = useContent()
  const href = useHref()
  return (
    <figure>
      <Link to={href(`/work/${project.slug}`)} aria-label={`${project.title} — ${ui.work.readCaseStudy}`} tabIndex={-1} className="block">
        <ProjectVisual kind={project.visual} />
      </Link>
      <figcaption className="meta mt-3">{project.visualCaption}</figcaption>
    </figure>
  )
}

/* Four editorial layouts so the projects do not read as four identical cards. */

function WideProject({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="work-card">
      <div className="grid-12 gap-y-8">
        <div className="col-span-12 lg:col-span-7">
          <ProjectTitle project={project} />
        </div>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-5">
          <p className="lede">{project.summary}</p>
          <ProjectMeta project={project} />
          <ReadMore project={project} />
        </div>
        <div className="col-span-12 mt-2">
          <VisualFrame project={project} />
        </div>
      </div>
    </Reveal>
  )
}

function SplitProject({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  return (
    <Reveal as="article" className="work-card">
      <div className="grid-12 items-start gap-y-8">
        <div className={`col-span-12 lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
          <VisualFrame project={project} />
        </div>
        <div className={`col-span-12 flex flex-col gap-6 lg:col-span-5 lg:pt-2 ${reverse ? 'lg:order-1 lg:pr-8' : 'lg:pl-8'}`}>
          <ProjectTitle project={project} />
          <p className="prose-editorial">{project.summary}</p>
          <ProjectMeta project={project} />
          <ReadMore project={project} />
        </div>
      </div>
    </Reveal>
  )
}

function CompactProject({ project }: { project: Project }) {
  return (
    <Reveal as="article" className="work-card">
      <div className="grid-12 items-start gap-y-8">
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
          <ProjectTitle project={project} />
          <p className="prose-editorial">{project.summary}</p>
          <ProjectMeta project={project} />
          <ReadMore project={project} />
        </div>
        <div className="col-span-12 lg:col-span-8 lg:pl-8">
          <VisualFrame project={project} />
        </div>
      </div>
    </Reveal>
  )
}

export function Work() {
  const { ui, projects } = useContent()
  const featured = projects.filter((p) => p.featured)
  return (
    <section id="work" className="scroll-mt-24 py-20 md:py-28" aria-labelledby="work-label">
      <div className="container-grid">
        <Reveal>
          <SectionHeading id="work" number="01" eyebrow={ui.work.eyebrow} heading={ui.work.heading} intro={ui.work.intro} />
        </Reveal>
        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          {featured.map((project) => {
            switch (project.layout) {
              case 'wide':
                return <WideProject key={project.slug} project={project} />
              case 'split':
                return <SplitProject key={project.slug} project={project} />
              case 'split-reverse':
                return <SplitProject key={project.slug} project={project} reverse />
              case 'compact':
                return <CompactProject key={project.slug} project={project} />
            }
          })}
        </div>
      </div>
    </section>
  )
}
