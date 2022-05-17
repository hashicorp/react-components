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
    <label className={classNames(s.toggle, { [s.on]: enabledState })}>
      <input
        type="checkbox"
        role="switch"
        checked={enabledState}
        onChange={handleChange}
        className={s.toggleInput}
        data-testid="react-toggle"
      />
      <span className={s.toggleIndicator} />
    </label>
  )
}
