import { useEffect, useState } from 'react'
import classNames from 'classnames'
import s from './style.module.css'

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
    <label className={s.switchLabel}>
      <input
        type="checkbox"
        role="switch"
        checked={enabledState}
        onChange={handleChange}
        className={s.switchInput}
        data-testid="react-toggle"
      />
      <span className={classNames(s.switch, { [s.on]: enabledState })} />
    </label>
  )
}
