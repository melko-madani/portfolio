import type { CSSProperties } from 'react'
import { useContent, useHref } from '../../lib/locale'
import { StoryFan } from '../stories/StoryFan'
import { Cta, Tag } from '../ui'

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
  const { profile, site, ui } = useContent()
  const href = useHref()
  const [line1, line2, line3] = profile.headline
  return (
    <section className="relative overflow-x-clip pt-28 sm:pt-32 lg:pt-32" aria-labelledby="hero-heading">
      <div className="container-grid">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <p className="eyebrow rise flex flex-wrap items-center gap-x-3 gap-y-2" style={rise(0)}>
              <span>{profile.title}</span>
              {site.availability.enabled && <Tag tone="accent">{profile.availabilityLabel}</Tag>}
            </p>
            <h1 id="hero-heading" className="display-xl mt-8">
              <Line delay={120}>{line1}</Line>
              <Line delay={220}>{line2}</Line>
              <Line delay={320} className="italic text-sage-deep">
                {line3}
              </Line>
            </h1>
          </div>
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 lg:items-end lg:pb-3 lg:text-right">
            <p className="lede rise !text-[1.0625rem]" style={rise(420)}>
              {profile.intro}
            </p>
            <div className="rise flex flex-wrap gap-3 lg:justify-end" style={rise(500)}>
              <Cta to={href('/#work')}>{ui.hero.primaryCta}</Cta>
              <Cta to={href('/#contact')} variant="ghost">
                {ui.hero.secondaryCta}
              </Cta>
            </div>
          </div>
        </div>

        <StoryFan />
      </div>
    </section>
  )
}
