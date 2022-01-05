import Script from 'next/script'
import { ConsentManagerService, ConsentManagerPreferences } from '../types'

interface CustomScriptProps {
  service: ConsentManagerService
}

interface CustomScriptsProps {
  preferences: ConsentManagerPreferences
  services?: ConsentManagerService[]
}

function CustomScript({ service }: CustomScriptProps) {
  const dataAttrs = service.dataAttrs
    ? Object.fromEntries(
        service.dataAttrs.map((attr) => [`data-${attr.name}`, attr.value])
      )
    : {}

  const strategy =
    service.strategy ?? service.async ? 'afterInteractive' : 'beforeInteractive'

  return (
    <Script
      src={service.url}
      strategy={strategy}
      id={service.name}
      {...dataAttrs}
    >
      {service.body ? service.body : null}
    </Script>
  )
}

export default function CustomScripts({
  preferences,
  services = [],
}: CustomScriptsProps) {
  if (!preferences.loadAll && services?.length === 0) return null

  let servicesToInject: ConsentManagerService[] = []

  if (preferences.loadAll) {
    servicesToInject = services
  } else {
    servicesToInject = services.filter(
      (service) => preferences?.custom?.[service.name]
    )
  }

  return (
    <>
      {servicesToInject.map((service) => (
        <CustomScript service={service} key={service.name} />
      ))}
    </>
  )
}
