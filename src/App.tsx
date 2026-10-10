import { Route, Routes, useLocation } from 'react-router-dom'
import { parsePath } from './content'
import { Layout } from './components/layout/Layout'
import { LocaleProvider } from './lib/LocaleProvider'
import { CaseStudy } from './pages/CaseStudy'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/**
 * English lives at the root, French under /fr. The locale is derived from the
 * URL so that every page is addressable and prerenderable in both languages.
 * `year` is passed in so the server render and the client hydrate the same value.
 */
export default function App({ year }: { year: number }) {
  const { pathname } = useLocation()
  const { locale } = parsePath(pathname)
  return (
    <LocaleProvider locale={locale}>
      <Layout year={year}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/fr" element={<Home />} />
          <Route path="/fr/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </LocaleProvider>
  )
}
