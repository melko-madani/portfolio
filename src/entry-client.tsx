import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const root = document.getElementById('root')!
const year = Number(root.dataset.year) || new Date().getFullYear()

const app = (
  <StrictMode>
    <BrowserRouter>
      <App year={year} />
    </BrowserRouter>
  </StrictMode>
)

// Hydrate only when the prerendered markup belongs to the current URL. Hosts
// that fall back to index.html for unknown paths (or SPA previews) would
// otherwise hydrate the wrong page; in that case we render from scratch.
const prerenderedRoute = root.dataset.route
const currentRoute = window.location.pathname.replace(/\/+$/, '') || '/'
if (root.hasChildNodes() && prerenderedRoute === currentRoute) {
  hydrateRoot(root, app)
} else {
  root.replaceChildren()
  createRoot(root).render(app)
}
