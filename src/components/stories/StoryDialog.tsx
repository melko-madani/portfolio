import { useEffect, useRef, type CSSProperties } from 'react'
import { useContent } from '../../lib/locale'
import { useStories } from '../../lib/stories'
import { Arrow } from '../ui'
import { StoryPattern } from './StoryPattern'

/**
 * The story deck: a native <dialog> (focus trap, Escape, inert background)
 * showing the chosen story as a landscape card, with the other cards stacked
 * behind it. Previous / next buttons, arrow keys, the mouse wheel or trackpad,
 * a touch swipe and clicking a card behind all move through the deck; the
 * backdrop or the close button dismiss it.
 */
export function StoryDialog() {
  const { stories, ui } = useContent()
  const { openIndex, close, go } = useStories()
  const ref = useRef<HTMLDialogElement | null>(null)
  const isOpen = openIndex !== null

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  // Keyboard, mouse wheel / trackpad and touch swipe all move through the deck.
  // The current index and the wheel lock live in refs so the listeners are
  // registered once per opening and keep their cooldown across card changes.
  const indexRef = useRef(0)
  indexRef.current = openIndex ?? 0
  const wheelLock = useRef({ accum: 0, locked: false, timer: 0 })
  const touchStart = useRef<{ x: number; y: number; inBody: boolean } | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const dialog = ref.current
    if (!dialog) return
    const count = stories.length
    const step = (delta: number) => go((indexRef.current + delta + count) % count)
    const lock = wheelLock.current

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') step(1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') step(-1)
    }

    // Wheel: accumulate small trackpad deltas, fire once per gesture, then cool down.
    const onWheel = (e: WheelEvent) => {
      const body = (e.target as HTMLElement | null)?.closest('.story-sheet-body')
      // Let a long story text scroll inside its own panel before the deck moves.
      if (body && body.scrollHeight > body.clientHeight + 2) {
        const atTop = body.scrollTop <= 0 && e.deltaY < 0
        const atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 1 && e.deltaY > 0
        if (!atTop && !atBottom) return
      }
      e.preventDefault()
      if (lock.locked) return
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      lock.accum += delta
      if (Math.abs(lock.accum) < 60) return
      step(lock.accum > 0 ? 1 : -1)
      lock.accum = 0
      lock.locked = true
      window.clearTimeout(lock.timer)
      lock.timer = window.setTimeout(() => {
        lock.locked = false
      }, 650)
    }

    // Touch swipe: horizontal or vertical, 48px threshold. Inside a scrollable
    // story text, only horizontal swipes move the deck.
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      const body = (e.target as HTMLElement | null)?.closest('.story-sheet-body')
      const inBody = !!body && body.scrollHeight > body.clientHeight + 2
      touchStart.current = { x: t.clientX, y: t.clientY, inBody }
    }
    const onTouchEnd = (e: TouchEvent) => {
      const s0 = touchStart.current
      const t = e.changedTouches[0]
      touchStart.current = null
      if (!s0 || !t) return
      const dx = t.clientX - s0.x
      const dy = t.clientY - s0.y
      const horizontal = Math.abs(dx) > Math.abs(dy)
      if (s0.inBody && !horizontal) return
      const delta = horizontal ? dx : dy
      if (Math.abs(delta) < 48) return
      step(delta < 0 ? 1 : -1)
    }

    window.addEventListener('keydown', onKey)
    dialog.addEventListener('wheel', onWheel, { passive: false })
    dialog.addEventListener('touchstart', onTouchStart, { passive: true })
    dialog.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('keydown', onKey)
      dialog.removeEventListener('wheel', onWheel)
      dialog.removeEventListener('touchstart', onTouchStart)
      dialog.removeEventListener('touchend', onTouchEnd)
      window.clearTimeout(lock.timer)
      lock.locked = false
      lock.accum = 0
    }
  }, [isOpen, go, stories.length])

  const current = openIndex ?? 0

  return (
    <dialog
      ref={ref}
      className="story-dialog"
      aria-label={ui.stories.dialogLabel}
      onClose={close}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself, not its children) closes the deck.
        if (e.target === e.currentTarget) close()
      }}
    >
      <div className="story-deck" role="group" aria-roledescription="carousel">
        {stories.map((story, i) => {
          // Position relative to the current card: 0 is front, 1 and 2 peek behind.
          const rel = (i - current + stories.length) % stories.length
          const depth = Math.min(rel, 3)
          const style = { '--depth': depth } as CSSProperties
          const isFront = rel === 0
          return (
            <article
              key={story.id}
              className={`story-sheet ${isFront ? 'is-front' : ''}`}
              style={style}
              aria-hidden={!isFront}
              onClick={!isFront ? () => go(i) : undefined}
            >
              <div className="story-sheet-face">
                <StoryPattern kind={story.pattern} id={`deck-${story.id}`} large />
              </div>
              <div className="story-sheet-body">
                <p className="eyebrow">
                  {String(i + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
                </p>
                <h2 className="story-sheet-title">
                  <span className="story-sheet-title-top">{story.label[0]}</span>
                  <span className="story-sheet-title-bottom">{story.label[1]}</span>
                  <span className="sr-only">{story.title}</span>
                </h2>
                <div className="prose-editorial mt-5 text-[0.9375rem] leading-relaxed">
                  {story.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="story-controls">
        <button type="button" className="btn btn-ghost !h-11 !px-4" onClick={() => go((current - 1 + stories.length) % stories.length)} aria-label={ui.stories.previous}>
          <Arrow className="rotate-180" />
        </button>
        <ol className="story-dots" aria-hidden="true">
          {stories.map((s, i) => (
            <li key={s.id} className={i === current ? 'is-active' : ''} />
          ))}
        </ol>
        <button type="button" className="btn btn-ghost !h-11 !px-4" onClick={() => go((current + 1) % stories.length)} aria-label={ui.stories.next}>
          <Arrow />
        </button>
      </div>

      <button type="button" className="story-close" onClick={close} aria-label={ui.stories.close}>
        <span aria-hidden="true" className="relative block size-3.5">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
        </span>
      </button>
    </dialog>
  )
}
