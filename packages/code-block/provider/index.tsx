import { createContext, useState, useContext, useEffect, useMemo } from 'react'

export function useTabGroups() {
  return useContext(CodeTabsContext)
}

interface CodeTabsContextValue {
  activeTabGroup: string | null
  setActiveTabGroup: (group: string) => void
  preferredTabGroups: string[]
}

const CodeTabsContext = createContext<CodeTabsContextValue | undefined>(
  undefined
)

export const LOCAL_STORAGE_KEY = '@hashicorp/react-code-block/code-tabs-prefs'
const LENGTH_LIMIT = 20

export default function CodeTabsProvider({ children }) {
  const [preferredTabGroups, setPreferredTabGroups] = useState<string[]>([])
  const [activeTabGroup, setActiveTabGroup] = useState<string | null>(null)
  const contextValue = useMemo(
    () => ({ activeTabGroup, setActiveTabGroup, preferredTabGroups }),
    [activeTabGroup, preferredTabGroups]
  )

  // Reflect activeTabGroup into the cookie
  useEffect(() => {
    const updatedPreferences = [activeTabGroup]
      // Add the current selection to the front of
      // the preference array
      .concat(preferredTabGroups)
      // Remove any falsy values (eg initial)
      .filter((s): s is string => s !== null && s !== '')
      // Deduplicate the array
      .filter((el, i, arr) => arr.indexOf(el) === i)
      // Limit the array length
      .slice(0, LENGTH_LIMIT)
    setPreferredTabGroups(updatedPreferences)
    // If the updatedPreferences are a useful value,
    // then save it to local storage
    if (updatedPreferences.length > 0) {
      const storedValueJson = JSON.stringify(updatedPreferences)
      window.localStorage.setItem(LOCAL_STORAGE_KEY, storedValueJson)
    }
  }, [activeTabGroup])

  // Load activeTabGroup from cookie, if available
  useEffect(() => {
    const maybeStoredValue = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (maybeStoredValue) {
      // Try / catch in case JSON.parse fails
      try {
        const parsedValue = JSON.parse(maybeStoredValue)
        if (parsedValue) setPreferredTabGroups(parsedValue)
      } catch (err) {
        console.error(err)
      }
    }
  }, [])

  return (
    <CodeTabsContext.Provider value={contextValue}>
      {children}
    </CodeTabsContext.Provider>
  )
}
