import type { PropsWithChildren } from 'react'

type ThemeProviderProps = PropsWithChildren<Record<string, unknown>>

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>
}
