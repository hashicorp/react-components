import { createContext, memo, ReactNode, useContext, useState } from 'react'

type SkipLinkTarget = null | {
  mainTargetId: string // just in string format, without the # id signature
  setMainTargetId(string): void
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
export const SkipLinkProvider = memo(function Provider({
  children,
}: SkipLinkProviderProps) {
  const [mainId, setMainId] = useState(null)
  return (
    <SkipLinkContext.Provider
      value={{ mainTargetId: mainId, setMainTargetId: setMainId }}
    >
      {children}
    </SkipLinkContext.Provider>
  )
})
