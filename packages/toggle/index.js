import { useEffect, useState } from 'react'

export default function Toggle({ enabled, onChange = () => {} }) {
  const [enabledState, setEnabledState] = useState(enabled || false)

  useEffect(() => {
    const enabledAsBoolean = Boolean(enabled)

    if (enabledAsBoolean === enabledState) return

    onChange(enabledAsBoolean)

    setEnabledState(enabledAsBoolean)
  }, [enabled])

  return (
    <div
      className={`switch ${enabledState ? 'on' : ''}`}
      onClick={() => {
        setEnabledState(!enabledState)
        onChange(!enabledState)
      }}
      data-testid="react-toggle"
    >
      <div className="switch-toggle" />
    </div>
  )
}
