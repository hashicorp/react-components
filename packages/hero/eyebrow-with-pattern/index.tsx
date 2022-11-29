import React from 'react'
import classNames from 'classnames'
import s from './style.module.css'

interface EyebrowProps {
  text: string
  appearance: 'light' | 'dark'
  theme: SolutionSpaces
}

export default function Eyebrow({
  text,
  appearance = 'dark',
  theme,
}: EyebrowProps) {
  return (
    <div className={classNames(s.eyebrow, s[theme])}>
      <span className={classNames(s.text, s[appearance])}>{text}</span>
      <span
        className={s.pattern}
        style={
          {
            '--bg-image': `url(${require('./img/bg.svg')})`,
          } as React.CSSProperties
        }
      />
    </div>
  )
}
