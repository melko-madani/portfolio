import { Link } from 'react-router-dom'
import { useContent, useHref } from '../../lib/locale'
import { ArrowUpRight } from '../ui'
import { LanguageSwitch } from './Header'

export function Footer({ year }: { year: number }) {
  const { profile, site, ui } = useContent()
  const href = useHref()
  const links = [site.linkedin, site.github].filter((l): l is NonNullable<typeof l> => l !== null)
  return (
    <footer className="theme-ink bg-ink text-paper">
      <div className="container-grid">
        <hr className="rule" />
        <div className="grid-12 gap-y-8 py-10">
          <div className="col-span-12 md:col-span-5">
            <p className="font-display text-2xl leading-none">{profile.name}</p>
            <p className="meta mt-3">{profile.title}</p>
          </div>
          <nav className="col-span-6 md:col-span-3" aria-label="Footer">
            <ul className="flex flex-col gap-2 text-sm">
              {ui.nav.map((item) => (
                <li key={item.hash}>
                  <Link to={href(`/#${item.hash}`)} className="link-rule text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <LanguageSwitch className="!text-paper/80 hover:!text-paper" />
              </li>
            </ul>
          </nav>
          <div className="col-span-6 md:col-span-4">
            <ul className="flex flex-col gap-2 text-sm">
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="link-rule text-paper/80 hover:text-paper">
                    {site.email}
                  </a>
                </li>
              )}
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-rule inline-flex items-center gap-1.5 text-paper/80 hover:text-paper">
                    {link.label}
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
              {site.cvPath && (
                <li>
                  <a href={site.cvPath} className="link-rule text-paper/80 hover:text-paper" download>
                    {ui.footer.downloadCv}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t py-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--line-inverse)' }}>
          <p className="meta">
            © {year} {profile.name}. {ui.footer.rights}
          </p>
          <p className="meta max-w-xl">{ui.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  )
}
