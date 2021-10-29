import Script from 'next/script'

function CustomScript({ service }) {
  const dataAttrs = service.dataAttrs
    ? Object.fromEntries(
        service.dataAttrs.map((attr) => [`data-${attr.name}`, attr.value])
      )
    : {}

  // TODO: support lazyOnLoad
  const strategy = service.async ? 'afterInteractive' : 'beforeInteractive'

  return (
    <Script src={service.url} strategy={strategy} {...dataAttrs}>
      {service.text ? service.text : null}
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
