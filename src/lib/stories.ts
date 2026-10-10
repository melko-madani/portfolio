import { createContext, useContext } from 'react'

export interface StoriesState {
  /** Index of the open story, or null when the deck is closed. */
  openIndex: number | null
  open: (index: number) => void
  close: () => void
  go: (index: number) => void
}

export const StoriesContext = createContext<StoriesState>({
  openIndex: null,
  open: () => {},
  close: () => {},
  go: () => {},
})

export function useStories(): StoriesState {
  return useContext(StoriesContext)
}
