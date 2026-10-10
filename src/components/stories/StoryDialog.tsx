import { useEffect, useRef, type CSSProperties } from 'react'
import { useContent } from '../../lib/locale'
import { useStories } from '../../lib/stories'
import { Arrow } from '../ui'
import { StoryPattern } from './StoryPattern'

/**
 * The story deck: a native <dialog> (focus trap, Escape, inert background)
 * showing the chosen story as a landscape card, with the other cards stacked
 * behind it. Previous / next buttons, arrow keys and clicking a card behind
 * move through the deck; the backdrop or the close button dismiss it.
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

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go((openIndex + 1) % stories.length)
      if (e.key === 'ArrowLeft') go((openIndex - 1 + stories.length) % stories.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, openIndex, go, stories.length])

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
