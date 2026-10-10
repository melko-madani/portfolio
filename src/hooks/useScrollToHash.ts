import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Scroll management for a mixed single-page / multi-page site:
 * - a hash in the URL scrolls to the matching section (after the page has rendered);
 * - a route change without hash scrolls to the top.
 */
export function useScrollToHash() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const scroll = () => {
        const el = document.getElementById(id)
        if (!el) return false
        el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
        return true
      }
      if (!scroll()) {
        // Section not mounted yet (navigating from another page): retry next frame.
        const raf = requestAnimationFrame(() => scroll())
        return () => cancelAnimationFrame(raf)
      }
      return
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash, key])
}
