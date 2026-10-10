import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowUpRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  number?: string
  heading?: string
  intro?: string
  id?: string
  className?: string
}

/** Numbered editorial section header: "02 — Selected work" + large serif heading. */
export function SectionHeading({ eyebrow, number, heading, intro, id, className = '' }: SectionHeadingProps) {
  return (
    <header className={`grid-12 items-end gap-y-6 ${className}`}>
      <div className="col-span-12 md:col-span-3">
        <p className="eyebrow flex items-center gap-3" id={id ? `${id}-label` : undefined}>
          {number && <span>{number}</span>}
          {number && <span aria-hidden="true" className="h-px w-6 bg-current opacity-60" />}
          <span>{eyebrow}</span>
        </p>
      </div>
      {(heading || intro) && (
        <div className="col-span-12 md:col-span-9 lg:col-span-8">
          {heading && <h2 className="display-md">{heading}</h2>}
          {intro && <p className="lede mt-5">{intro}</p>}
        </div>
      )}
    </header>
  )
}

interface CtaProps {
  to: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  className?: string
}

export function Cta({ to, children, variant = 'primary', external = false, className = '' }: CtaProps) {
  const classes = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${className}`
  if (external || to.startsWith('mailto:')) {
    return (
      <a className={classes} href={to} target={to.startsWith('mailto:') ? undefined : '_blank'} rel={to.startsWith('mailto:') ? undefined : 'noopener noreferrer'}>
        {children}
        {to.startsWith('mailto:') ? <Arrow /> : <ArrowUpRight />}
      </a>
    )
  }
  return (
    <Link className={classes} to={to}>
      {children}
      <Arrow />
    </Link>
  )
}

export function Tag({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span className={`tag ${tone === 'accent' ? 'border-sage-deep text-sage-deep' : ''}`}>
      {tone === 'accent' && <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}

export function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t py-3" style={{ borderColor: 'var(--line)' }}>
      <dt className="eyebrow">{label}</dt>
      <dd className="text-[0.9375rem] leading-snug text-ink-2">{children}</dd>
    </div>
  )
}
