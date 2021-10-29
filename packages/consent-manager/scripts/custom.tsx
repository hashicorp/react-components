import Script from 'next/script'
import { ConsentManagerService } from '../types'

function CustomScript({ service }: { service: ConsentManagerService }) {
  const dataAttrs = service.dataAttrs
    ? Object.fromEntries(
        service.dataAttrs.map((attr) => [`data-${attr.name}`, attr.value])
      )
    : {}

  const strategy =
    service.strategy ?? service.async ? 'afterInteractive' : 'beforeInteractive'

  return (
    <Script src={service.url} strategy={strategy} {...dataAttrs}>
      {service.body ? service.body : null}
    </Script>
  )
}

export default function CustomScripts({ preferences, services = [] }) {
  if (!preferences.loadAll && services?.length === 0) return null

  let servicesToInject = []

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
