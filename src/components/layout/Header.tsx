import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { content } from '../../content'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Arrow } from '../ui'

const SECTION_IDS = ['work', 'about', 'experience', 'contact']

export function Header() {
  const { profile, ui } = content
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const isHome = pathname === '/'
  const active = useActiveSection(SECTION_IDS)

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

  const isActive = (href: string) => {
    const id = href.split('#')[1]
    return isHome && active === id
  }

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        open ? 'bg-paper' : scrolled ? 'bg-paper/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      style={{ boxShadow: scrolled && !open ? 'inset 0 -1px 0 var(--line)' : 'none' }}
    >
      <div className="container-grid flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link to="/" className="group flex items-baseline gap-3 no-underline" aria-label={`${profile.name} — home`}>
          <span className="font-display text-[1.375rem] leading-none tracking-tight text-ink">{profile.name}</span>
          <span className="meta hidden sm:inline">AI Engineer</span>
        </Link>

        <nav aria-label={ui.mainNav} className="hidden items-center gap-7 md:flex">
          {ui.nav.map((item) => (
            <Link key={item.href} to={item.href} className="nav-link" data-active={isActive(item.href)}>
              {item.label}
            </Link>
          ))}
          <Link to="/#contact" className="btn btn-primary !h-10 !px-4 !text-sm">
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
            <span
              className={`absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-300 ${open ? 'translate-y-[5.5px] rotate-45' : ''}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-px w-full bg-ink transition-transform duration-300 ${open ? '-translate-y-[5.5px] -rotate-45' : ''}`}
            />
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
              <li key={item.href} className="border-t" style={{ borderColor: 'var(--line)' }}>
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  to={item.href}
                  className="flex items-baseline justify-between py-5 no-underline"
                  onClick={() => setOpen(false)}
                >
                  <span className="display-sm text-ink">{item.label}</span>
                  <span className="meta">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="meta">{profile.title}</p>
        </nav>
      </div>
    </>
  )
}
