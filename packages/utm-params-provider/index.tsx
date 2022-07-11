import * as React from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const UTM_ALLOW_LIST = [
  'utm_source',
  'utm_offer',
  'utm_medium',
  'utm_campaign',
] as const

type UtmKeys = typeof UTM_ALLOW_LIST[number]
type UtmParams = Partial<Record<UtmKeys, string>>

const UtmParamsContext = React.createContext<{
  utmParams: UtmParams
}>({ utmParams: {} })

const UtmParamsProvider = ({ children }) => {
  const { query } = useRouter()

  const utmParams = React.useMemo<UtmParams>(() => {
    const result = {}
    Object.entries(query).forEach(([key, value]) => {
      const isAllowed = UTM_ALLOW_LIST.includes(key as UtmKeys)
      if (isAllowed) {
        result[key] = value
        Cookies.set(key, value, { expires: 30 })
      }
    })
    return result
  }, [query])

  return (
    <UtmParamsContext.Provider
      value={{
        utmParams,
      }}
    >
      {children}
    </UtmParamsContext.Provider>
  )
}

const useUtmParams = () => {
  const context = React.useContext(UtmParamsContext)
  return context
}

export { UtmParamsProvider, useUtmParams }
