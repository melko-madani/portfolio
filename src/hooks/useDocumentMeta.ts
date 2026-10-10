import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteMeta } from '../lib/seo'

/** Keeps <title>, the description meta and <html lang> in sync during client-side navigation. */
export function useDocumentMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getRouteMeta(pathname)
    document.title = meta.title
    document.documentElement.lang = meta.locale
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)
  }, [pathname])
}
