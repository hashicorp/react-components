import classNames from 'classnames'
import React from 'react'
import s from './style.module.css'

/**
 *
 * A span of styled text with
 * an active state that adds a thick
 * bottom border.
 *
 */
function NavItemText({
  isActive,
  text,
}: {
  /** If true, item will be rendered with a thick bottom border below the text. */
  isActive: boolean
  /** Plain text to render within the styled <span /> */
  text: string
}): React.ReactElement {
  return (
    <span
      className={classNames(s.root, {
        [s.isActive]: isActive,
      })}
    >
      {text}
    </span>
  )
}

export default NavItemText
