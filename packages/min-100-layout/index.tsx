import React from 'react'
import s from './style.module.css'

interface Min100LayoutProps {
  children: React.ReactNode
  footer: React.ReactNode
}

function Min100Layout({
  children,
  footer,
}: Min100LayoutProps): React.ReactElement {
  return (
    <div className={s.root}>
      <div>{children}</div>
      <div className={s.footer}>{footer}</div>
    </div>
  )
}

export default Min100Layout
