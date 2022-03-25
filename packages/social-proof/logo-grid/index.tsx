import * as React from 'react'
import classNames from 'classnames'
import LogoCard from '../logo-card'
import type { LogoGridProps } from './types'
import s from './style.module.css'

export default function LogoGrid({
  logos,
  layout = 'grid',
  bordered = true,
}: LogoGridProps): React.ReactElement {
  return (
    <ul className={classNames(s.logoGrid, s[layout], bordered && s.bordered)}>
      {logos.map((logo, index) => {
        return (
          <li className={s.logoGridItem} key={index}>
            <LogoCard src={logo.src} alt={logo.alt} />
          </li>
        )
      })}
    </ul>
  )
}
