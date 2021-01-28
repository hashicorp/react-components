import { createContext, useState, useContext } from 'react'

export function useTabGroups() {
  return useContext(TabContext)
}

export const TabContext = createContext()

export default function TabProvider({ children }) {
  const [activeTabGroup, setActiveTabGroup] = useState()

  return (
    const contextValue = useMemo(() => ({ activeTabGroup, setActiveTabGroup }), [activeTabGroup])
    <TabContext.Provider value={contextValue}>
      {children}
    </TabContext.Provider>
  )
}
