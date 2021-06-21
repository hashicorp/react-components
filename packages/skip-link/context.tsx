import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

type SkipLinkTarget = null | {
  anchorId: string // just in string format, without the # id signature
  setAnchorId(string): void
}

export const SkipLinkContext = createContext<SkipLinkTarget>(null)

// This hook allows us to get and set the target id state
export function useSkipLinkContext(): SkipLinkTarget {
  return useContext(SkipLinkContext)
}

interface SkipLinkProviderProps {
  children: ReactNode
}

// When using context to set the main anchor id, wrap your application this provider
export function SkipLinkProvider({ children }: SkipLinkProviderProps) {
  const [anchorId, setAnchorId] = useState(null)
  const value = useMemo(() => ({ anchorId, setAnchorId }), [anchorId])
  return (
    <SkipLinkContext.Provider value={value}>
      {children}
    </SkipLinkContext.Provider>
  )
}
