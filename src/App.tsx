import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { CaseStudy } from './pages/CaseStudy'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/** `year` is passed in so the server render and the client hydrate the same value. */
export default function App({ year }: { year: number }) {
  return (
    <Layout year={year}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
