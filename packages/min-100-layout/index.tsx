import React from 'react'
import s from './style.module.css'
import classNames from 'classnames'

interface Min100LayoutProps {
  /** Render prop for the page area. All visible elements on the page, except for the footer, should be rendered as children of Min100Layout. */
  children: React.ReactNode
  /** Render prop for the footer area. This area will be displayed at the bottom of the page, regardless of the height of the page area. */
  footer: React.ReactNode
  /** className to add to the root element. The root element always has a height of 100vh or greater. Styling such as page background coloration likely belongs on the root element. */
  className?: string
}

function Min100Layout({
  children,
  className,
  footer,
}: Min100LayoutProps): React.ReactElement {
  return (
    <div className={classNames(s.root, className)}>
      <div>{children}</div>
      <div className={s.footer}>{footer}</div>
    </div>
  )
}

export default Min100Layout
