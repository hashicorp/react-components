import React from 'react'
import s from './style.module.css'
import classNames from 'classnames'

function Aside({
  className,
  children,
  type = 'info',
}: {
  className?: string
  children: React.ReactNode
  type?: 'info' | 'success' | 'warning' | 'danger'
}): React.ReactElement {
  return (
    <div className={classNames(s.root, className, s[`type-${type}`])}>
      {children}
    </div>
  )
}

export default Aside
