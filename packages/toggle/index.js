/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import s from './style.module.css'

export default function Toggle({
  appearance = 'light',
  enabled,
  onChange = () => { },
  disabled = false,
  ariaLabelledBy,
}) {
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

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      setEnabledState(!event.currentTarget.checked)
      onChange(!event.currentTarget.checked)
    }
  }

  return (
    <label
      className={classNames(
        s.toggle,
        s[appearance],
        { [s.disabled]: disabled },
        { [s.on]: enabledState }
      )}
    >
      <input
        aria-labelledby={ariaLabelledBy}
        type="checkbox"
        role="switch"
        checked={enabledState}
        onChange={handleChange}
        onKeyDown={handleKey}
        className={s.toggleInput}
        disabled={disabled}
        data-testid="react-toggle"
      />
      <span className={s.toggleIndicator} />
    </label>
  )
}
