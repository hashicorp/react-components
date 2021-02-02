import { useEffect, useState } from 'react'

export default function Toggle({ enabled, onChange = () => {} }) {
  const [enabledState, setEnabledState] = useState(enabled || false)

  useEffect(() => {
    const enabledAsBoolean = Boolean(enabled)

    if (enabledAsBoolean === enabledState) return

    onChange(enabledAsBoolean)

    setEnabledState(enabledAsBoolean)
  }, [enabled])

  const handleChange = (event) => {
    setEnabledState(event.currentTarget.checked)
    onChange(event.currentTarget.checked)
  }

  return (
    <label className="switch-label">
      <input
        type="checkbox"
        role="switch"
        checked={enabledState}
        onChange={handleChange}
        className="switch-input"
        data-testid="react-toggle"
      />
      <span className={`switch ${enabledState ? 'on' : ''}`} />
    </label>
  )
}
