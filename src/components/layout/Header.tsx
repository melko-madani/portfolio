import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { localizePath, parsePath } from '../../content'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useContent, useHref, useLocale } from '../../lib/locale'
import { useStories } from '../../lib/stories'
import { Arrow } from '../ui'

const SECTION_IDS = ['work', 'about', 'experience', 'contact']

/** Link to the same page in the other language. */
export function LanguageSwitch({ className = '' }: { className?: string }) {
  const locale = useLocale()
  const { ui } = useContent()
  const { pathname, hash } = useLocation()
  const other = locale === 'en' ? 'fr' : 'en'
  const { path } = parsePath(pathname)
  const target = localizePath(other, path) + hash
  return (
    <Link to={target} hrefLang={other} lang={other} aria-label={ui.switchLanguage.ariaLabel} className={`nav-link font-mono text-xs uppercase tracking-[0.12em] ${className}`}>
      {ui.switchLanguage.label}
    </Link>
  )
}

export function Header() {
  const { profile, ui } = useContent()
  const href = useHref()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const isHome = parsePath(pathname).path === '/'
  const active = useActiveSection(SECTION_IDS)
  const { open: openStories } = useStories()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    const raf = requestAnimationFrame(onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Mobile menu: lock scroll, trap Escape, move focus.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
          open ? 'bg-paper' : scrolled ? 'bg-paper/90 backdrop-blur-md' : 'bg-transparent'
        }`}
        style={{ boxShadow: scrolled && !open ? 'inset 0 -1px 0 var(--line)' : 'none' }}
      >
        <div className="container-grid flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <div className="flex items-center gap-3 sm:gap-4">
            <button type="button" className="who-button" onClick={() => openStories(0)} aria-label={ui.stories.open}>
              <img src={profile.portrait.src} alt="" width="40" height="40" className="size-10 rounded-full object-cover" />
              <span className="who-button-label">{ui.stories.open}</span>
            </button>
            <Link to={href('/')} className="group flex items-baseline gap-3 no-underline" aria-label={ui.homeAria}>
              <span className="font-display text-[1.375rem] leading-none tracking-tight text-ink">{profile.name}</span>
              <span className="meta hidden lg:inline">{profile.shortTitle}</span>
            </Link>
          </div>

          <nav aria-label={ui.mainNav} className="hidden items-center gap-7 md:flex">
            {ui.nav.map((item) => (
              <Link key={item.hash} to={href(`/#${item.hash}`)} className="nav-link" data-active={isHome && active === item.hash}>
                {item.label}
              </Link>
            ))}
            <LanguageSwitch />
            <Link to={href('/#contact')} className="btn btn-primary !h-10 !px-4 !text-sm">
              {ui.hero.secondaryCta}
              <Arrow />
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 flex size-11 items-center justify-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${open ? 'translate-y-[5.5px] rotate-45' : ''}`} />
              <span className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300 ${open ? '-translate-y-[5.5px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu — a sibling of the header so its fixed positioning is relative to the viewport. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={ui.mainNav}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper md:hidden"
      >
        <nav className="container-grid flex h-full flex-col justify-between py-10" aria-label={ui.mainNav}>
          <ul className="flex flex-col">
            {ui.nav.map((item, i) => (
              <li key={item.hash} className="border-t" style={{ borderColor: 'var(--line)' }}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  to={href(`/#${item.hash}`)}
                  className="flex items-baseline justify-between py-5 no-underline"
                  onClick={() => setOpen(false)}
                >
                  <span className="display-sm text-ink">{item.label}</span>
                  <span className="meta">0{i + 1}</span>
                </Link>
              </li>
            ))}
            <li className="border-t pt-5" style={{ borderColor: 'var(--line)' }} onClick={() => setOpen(false)}>
              <LanguageSwitch />
            </li>
          </ul>
          <p className="meta">{profile.title}</p>
        </nav>
      </div>
    </>
  )
}
