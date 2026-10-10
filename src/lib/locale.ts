import { createContext, useContext } from 'react'
import { getContent, localizePath, type Content, type Locale } from '../content'

export const LocaleContext = createContext<Locale>('en')

export function useLocale(): Locale {
  return useContext(LocaleContext)
}

/** The content of the current locale. */
export function useContent(): Content {
  return getContent(useLocale())
}

/** Returns a function that prefixes locale-free paths for the current locale. */
export function useHref(): (path: string) => string {
  const locale = useLocale()
  return (path: string) => localizePath(locale, path)
}
