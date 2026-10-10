import type { ReactNode } from 'react'
import { content } from '../../content'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
import { useScrollToHash } from '../../hooks/useScrollToHash'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout({ children, year }: { children: ReactNode; year: number }) {
  useDocumentMeta()
  useScrollToHash()
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        {content.ui.skipToContent}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer year={year} />
    </>
  )
}
