import { useEffect, useRef, type CSSProperties } from 'react'

/**
 * Hero artwork: a fan of annotated documents — invoices, notices, reports —
 * with a few extracted fields floating free. Drawn in the site's own palette,
 * animated on entrance, with a gentle parallax on scroll and a small tilt that
 * follows a fine pointer. Everything is disabled under prefers-reduced-motion.
 */

const SHEETS = [
  { angle: -16, fill: 'var(--color-paper-3)', delay: 0 },
  { angle: -8, fill: 'var(--color-sand-soft)', delay: 90 },
  { angle: 0, fill: 'var(--color-sage-soft)', delay: 180 },
  { angle: 8, fill: 'var(--color-ink)', delay: 270 },
  { angle: 16, fill: '#fbfaf7', delay: 360 },
]

function SheetLines({ dark }: { dark?: boolean }) {
  const stroke = dark ? 'rgba(245,243,238,0.28)' : 'rgba(23,25,24,0.22)'
  const widths = [96, 150, 120, 164, 88, 140, 110, 156, 70]
  return (
    <g stroke={stroke} strokeWidth="1.5" strokeLinecap="round">
      {widths.map((w, i) => (
        <line key={i} x1="28" x2={28 + w} y1={64 + i * 22} y2={64 + i * 22} />
      ))}
    </g>
  )
}

export function HeroArtwork() {
  const wrapper = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduce) return

    let scrollY = 0
    let tiltX = 0
    let tiltY = 0
    let frame = 0
    const apply = () => {
      frame = 0
      const parallax = Math.min(scrollY * 0.12, 160)
      el.style.transform = `translate3d(0, ${parallax}px, 0) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onScroll = () => {
      scrollY = window.scrollY
      schedule()
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) / r.width
      const y = (e.clientY - (r.top + r.height / 2)) / r.height
      tiltX = Math.max(-1, Math.min(1, x)) * 4
      tiltY = -Math.max(-1, Math.min(1, y)) * 3
      schedule()
    }
    const onLeave = () => {
      tiltX = 0
      tiltY = 0
      schedule()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (finePointer) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="hero-art" aria-hidden="true">
      <div ref={wrapper} className="hero-art-inner">
        <svg viewBox="0 0 560 520" className="h-auto w-full font-mono" style={{ fontSize: 11 }}>
          <defs>
            <filter id="sheet-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#171918" floodOpacity="0.14" />
            </filter>
          </defs>

          {/* Fan of documents; each sheet rotates around the bottom centre of the stack. */}
          <g transform="translate(170 110)">
            {SHEETS.map((s, i) => {
              const dark = s.fill === 'var(--color-ink)'
              const last = i === SHEETS.length - 1
              return (
                <g
                  key={i}
                  className="sheet"
                  style={{ '--angle': `${s.angle}deg`, '--delay': `${s.delay}ms` } as CSSProperties}
                >
                  <g filter="url(#sheet-shadow)">
                    <rect width="220" height="300" rx="10" fill={s.fill} stroke={dark ? 'none' : 'rgba(23,25,24,0.12)'} />
                  </g>
                  {/* Header block */}
                  <rect x="28" y="28" width="64" height="7" rx="3.5" fill={dark ? 'var(--color-sand)' : 'var(--color-ink)'} opacity={dark ? 1 : 0.8} />
                  <rect x="140" y="28" width="52" height="7" rx="3.5" fill={dark ? 'rgba(245,243,238,0.4)' : 'rgba(23,25,24,0.25)'} />
                  <SheetLines dark={dark} />
                  {last && (
                    <>
                      {/* Extracted fields highlighted on the front sheet */}
                      <rect x="22" y="56" width="110" height="18" rx="4" fill="none" stroke="var(--color-sage-deep)" strokeWidth="1.2" />
                      <rect x="22" y="188" width="78" height="18" rx="4" fill="none" stroke="var(--color-sage-deep)" strokeWidth="1.2" />
                      <rect x="112" y="232" width="84" height="18" rx="4" fill="none" stroke="var(--color-sage-deep)" strokeWidth="1.2" />
                      <text x="26" y="282" fill="var(--color-sage-deep)" fontSize="9" letterSpacing="1.5">9 FIELDS · VALIDATED</text>
                    </>
                  )}
                  {dark && (
                    <text x="28" y="282" fill="var(--color-sand)" fontSize="9" letterSpacing="1.5">LOCAL · NO CLOUD</text>
                  )}
                </g>
              )
            })}
          </g>

          {/* Floating extracted values */}
          <g className="float-tag" style={{ '--delay': '900ms', '--drift': '-6px' } as CSSProperties}>
            <rect x="346" y="86" width="176" height="34" rx="17" fill="var(--color-ink)" />
            <circle cx="366" cy="103" r="3.5" fill="var(--color-sage)" />
            <text x="378" y="107" fill="var(--color-paper)" fontSize="10">montant_ttc · 3 432,00</text>
          </g>
          <g className="float-tag" style={{ '--delay': '1050ms', '--drift': '7px' } as CSSProperties}>
            <rect x="18" y="330" width="138" height="34" rx="17" fill="#fbfaf7" stroke="rgba(23,25,24,0.2)" />
            <text x="34" y="351" fill="var(--color-ink)" fontSize="10">date limite · J-6</text>
          </g>
          <g className="float-tag" style={{ '--delay': '1200ms', '--drift': '-5px' } as CSSProperties}>
            <rect x="400" y="400" width="112" height="34" rx="17" fill="var(--color-sage-deep)" />
            <text x="416" y="421" fill="var(--color-paper)" fontSize="10">TTC = HT × 1.20 ✓</text>
          </g>

          {/* Baseline */}
          <line x1="80" y1="470" x2="480" y2="470" stroke="rgba(23,25,24,0.18)" />
          <text x="80" y="492" fill="var(--color-muted)" fontSize="9" letterSpacing="1.5">DOCUMENTS → STRUCTURE → DECISIONS</text>
        </svg>
      </div>
    </div>
  )
}
