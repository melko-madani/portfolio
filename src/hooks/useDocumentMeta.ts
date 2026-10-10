import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getRouteMeta } from '../lib/seo'

/** Keeps <title> and the description meta in sync during client-side navigation. */
export function useDocumentMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getRouteMeta(pathname)
    document.title = meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', meta.description)
  }, [pathname])
}
