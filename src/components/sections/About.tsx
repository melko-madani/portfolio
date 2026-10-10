import { content } from '../../content'
import { Reveal } from '../Reveal'
import { SectionHeading } from '../ui'

export function About() {
  const { about, profile, ui } = content
  return (
    <section id="about" className="scroll-mt-24 bg-paper-2 py-20 md:py-28" aria-labelledby="about-label">
      <div className="container-grid">
        <Reveal>
          <SectionHeading id="about" number="02" eyebrow={ui.about.eyebrow} heading={about.heading} />
        </Reveal>

        <div className="grid-12 mt-14 gap-y-12 md:mt-20">
          <Reveal className="col-span-12 md:col-span-4 lg:col-span-3">
            <figure className="max-w-[18rem] md:max-w-none">
              <div className="plate duotone aspect-square overflow-hidden rounded-lg">
                <img
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  width={profile.portrait.width}
                  height={profile.portrait.height}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="meta mt-3">{profile.name}</figcaption>
            </figure>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6" delay={80}>
            <div className="prose-editorial text-[1.0625rem] leading-[1.65]">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-20 md:mt-28" delay={40}>
          <div className="grid-12 gap-y-8">
            <div className="col-span-12 md:col-span-3">
              <p className="eyebrow">{about.approachHeading}</p>
            </div>
            <ol className="col-span-12 grid gap-px overflow-hidden rounded-lg border md:col-span-9 sm:grid-cols-2 xl:grid-cols-5" style={{ borderColor: 'var(--line)', background: 'var(--line)' }}>
              {about.approach.map((step) => (
                <li key={step.step} className="flex flex-col gap-3 bg-paper-2 p-5">
                  <span className="meta">{step.step}</span>
                  <h3 className="display-sm">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
