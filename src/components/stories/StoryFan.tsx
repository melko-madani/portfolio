import type { CSSProperties } from 'react'
import { useContent } from '../../lib/locale'
import { useStories } from '../../lib/stories'
import { StoryPattern } from './StoryPattern'

/**
 * The fan of story cards at the foot of the hero. Cards rest in a tight fan,
 * spread when the fan is hovered and lift individually on hover or focus.
 * Each card is a button that opens the story deck on that story.
 */
export function StoryFan() {
  const { stories, ui } = useContent()
  const { open } = useStories()
  const count = stories.length
  const mid = (count - 1) / 2
  return (
    <div className="story-fan-wrap">
      <ul className="story-fan" aria-label={ui.stories.dialogLabel}>
        {stories.map((story, i) => {
          const offset = i - mid
          const style = {
            '--i': offset,
            '--delay': `${600 + i * 90}ms`,
            zIndex: i + 1,
          } as CSSProperties
          return (
            <li key={story.id} className="story-card" style={style}>
              <button
                type="button"
                className="story-card-button"
                aria-label={`${ui.stories.view} ${story.title}`}
                onClick={() => open(i)}
              >
                <span className="story-card-face">
                  <StoryPattern kind={story.pattern} id={`fan-${story.id}`} />
                </span>
                <span className="story-card-label" aria-hidden="true">
                  <span className="story-card-label-top">{story.label[0]}</span>
                  <span className="story-card-label-bottom">{story.label[1]}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="meta story-fan-hint">{ui.stories.hint}</p>
    </div>
  )
}
