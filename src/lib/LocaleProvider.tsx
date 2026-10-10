import type { ReactNode } from 'react'
import type { Locale } from '../content'
import { LocaleContext } from './locale'

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}
