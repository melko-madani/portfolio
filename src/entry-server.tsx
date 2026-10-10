import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { getRouteMeta, getStaticRoutes, renderHeadTags } from './lib/seo'

export { getRouteMeta, getStaticRoutes, renderHeadTags }

export function render(url: string, year: number): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App year={year} />
      </StaticRouter>
    </StrictMode>,
  )
}
