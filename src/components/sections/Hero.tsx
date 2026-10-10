import type { CSSProperties } from 'react'
import { content } from '../../content'
import { Cta, Tag } from '../ui'
import { HeroArtwork } from './HeroArtwork'

const rise = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties

function Line({ children, delay, className = '' }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="line-mask">
      <span className={`line-rise ${className}`} style={rise(delay)}>
        {children}
      </span>
    </span>
  )
}

export function Hero() {
  const { profile, site, ui } = content
  return (
    <section className="relative overflow-x-clip pt-28 pb-16 sm:pt-36 md:pb-24 lg:pt-40" aria-labelledby="hero-heading">
      <div className="container-grid">
        <div className="grid-12 items-end gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <p className="eyebrow rise flex flex-wrap items-center gap-x-3 gap-y-2" style={rise(0)}>
              <span>{profile.title}</span>
              {site.availability.enabled && <Tag tone="accent">{site.availability.label}</Tag>}
            </p>
            <h1 id="hero-heading" className="display-xl mt-8">
              <Line delay={120}>Turning complex</Line>
              <Line delay={220}>workflows into</Line>
              <Line delay={320} className="italic text-sage-deep">
                intelligent systems.
              </Line>
            </h1>
            <ul className="rise meta mt-8 flex flex-wrap gap-x-4 gap-y-1.5" style={rise(520)}>
              {profile.contextLine.map((item, i) => (
                <li key={item} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="size-1 rounded-full bg-sage" />}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pl-6">
            <HeroArtwork />
          </div>

          <div className="col-span-12 grid-12 gap-y-8 lg:mt-4">
            <p className="lede rise col-span-12 md:col-span-7 lg:col-span-6" style={rise(420)}>
              {profile.intro}
            </p>
            <div className="rise col-span-12 flex flex-wrap gap-3 md:col-span-5 md:justify-end lg:col-span-6" style={rise(500)}>
              <Cta to="/#work">{ui.hero.primaryCta}</Cta>
              <Cta to="/#contact" variant="ghost">
                {ui.hero.secondaryCta}
              </Cta>
            </div>
          </div>
        </div>

        <hr className="rule rise mt-16 md:mt-24" style={rise(620)} />
      </div>
    </section>
  )
}
