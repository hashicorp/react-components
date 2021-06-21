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
  anchorId?: string
}

// When using context to set the main anchor id, wrap your application this provider
export function SkipLinkProvider({
  anchorId = null,
  children,
}: SkipLinkProviderProps) {
  const [_anchorId, setAnchorId] = useState(anchorId)
  const value = useMemo(() => ({ anchorId: _anchorId, setAnchorId }), [
    _anchorId,
    anchorId,
  ])
  return (
    <SkipLinkContext.Provider value={value}>
      {children}
    </SkipLinkContext.Provider>
  )
}
