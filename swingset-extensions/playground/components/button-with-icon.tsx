/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import s from './button-with-icon.module.css'

export const ButtonWithIcon = ({ children, title, onClick }) => {
  return (
    <button className={s.button} onClick={onClick} title={title}>
      {children}
    </button>
  )
}
