import { content } from '../../content'
import { Reveal } from '../Reveal'
import { Cta } from '../ui'

export function Contact() {
  const { site, ui } = content
  const hasEmail = site.email.trim().length > 0
  return (
    <section id="contact" className="theme-ink scroll-mt-24 bg-ink pb-16 pt-24 text-paper md:pb-24 md:pt-32" aria-labelledby="contact-heading">
      <div className="container-grid">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span>05</span>
            <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />
            <span>{ui.contact.eyebrow}</span>
          </p>
          <h2 id="contact-heading" className="display-lg mt-8 max-w-[16ch]">
            Have a workflow that deserves a <em className="not-italic font-display italic text-sand">better system</em>?
          </h2>
        </Reveal>
        <Reveal className="grid-12 mt-10 gap-y-8 md:mt-14" delay={80}>
          <p className="lede col-span-12 md:col-span-6">{ui.contact.text}</p>
          <div className="col-span-12 flex flex-wrap items-start gap-3 md:col-span-6 md:justify-end">
            {hasEmail && <Cta to={`mailto:${site.email}`}>{ui.contact.emailCta}</Cta>}
            {site.linkedin && (
              <Cta to={site.linkedin.href} variant={hasEmail ? 'ghost' : 'primary'} external>
                {ui.contact.linkedinCta}
              </Cta>
            )}
          </div>
        </Reveal>
        {hasEmail && (
          <Reveal className="mt-16 md:mt-24" delay={120}>
            <a href={`mailto:${site.email}`} className="link-rule font-display text-[clamp(1.5rem,4vw,3.5rem)] leading-none tracking-tight text-paper">
              {site.email}
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
