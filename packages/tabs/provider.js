import { createContext, useState, useContext } from 'react'

export function useTabPaths() {
  return useContext(TabContext)
}

export const TabContext = createContext()

export default function TabProvider({ children }) {
  const [activeTabPath, setActiveTabPath] = useState('')

  return (
    <TabContext.Provider value={{ activeTabPath, setActiveTabPath }}>
      {children}
    </TabContext.Provider>
  )
}
