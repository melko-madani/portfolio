import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  as?: ElementType
  children: ReactNode
  className?: string
  /** Stagger delay in milliseconds. */
  delay?: number
  id?: string
}

/**
 * Fades and lifts its content into view the first time it enters the viewport.
 * Pure CSS transition driven by one IntersectionObserver per element; the
 * `no-js` and reduced-motion fallbacks keep everything visible without scripting.
 */
export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const style = delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}
