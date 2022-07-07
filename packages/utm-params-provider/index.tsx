import * as React from 'react'
import Cookies from 'js-cookie'

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
  const [utmParams, setUtmParams] = React.useState<UtmParams>({})

  React.useEffect(() => {
    // Write UTM params to cookies from URL
    const searchParams = new URLSearchParams(window.location.search)
    for (const [key, value] of searchParams.entries()) {
      if (UTM_ALLOW_LIST.includes(key as UtmKeys)) {
        Cookies.set(key, value, { expires: 30 })
      }
    }

    // Read UTM params from cookies and pass to context
    setUtmParams(
      Object.fromEntries(
        Object.entries(Cookies.get()).filter(([key, _]) =>
          UTM_ALLOW_LIST.includes(key as UtmKeys)
        )
      )
    )
  }, [])

  const contextValue = React.useMemo(() => ({ utmParams }), [utmParams])

  return (
    <UtmParamsContext.Provider value={contextValue}>
      {children}
    </UtmParamsContext.Provider>
  )
}

const useUtmParams = () => {
  const context = React.useContext(UtmParamsContext)
  return context
}

export { UtmParamsProvider, useUtmParams }
