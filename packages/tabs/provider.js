/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { createContext, useState, useContext, useMemo } from 'react'

export function useTabGroups() {
  return useContext(TabContext)
}

const TabContext = createContext()

export default function TabProvider({ children }) {
  const [activeTabGroup, setActiveTabGroup] = useState()
  const contextValue = useMemo(() => ({ activeTabGroup, setActiveTabGroup }), [
    activeTabGroup,
  ])

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  )
}
