import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { StoriesContext } from './stories'

export function StoriesProvider({ children }: { children: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = useCallback((index: number) => setOpenIndex(index), [])
  const close = useCallback(() => setOpenIndex(null), [])
  const go = useCallback((index: number) => setOpenIndex(index), [])
  const value = useMemo(() => ({ openIndex, open, close, go }), [openIndex, open, close, go])
  return <StoriesContext.Provider value={value}>{children}</StoriesContext.Provider>
}
