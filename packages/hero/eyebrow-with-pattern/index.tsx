import React from 'react'
import classNames from 'classnames'
import s from './style.module.css'

export interface EyebrowProps {
  text: string
  appearance?: 'light' | 'dark'
  solution?: 'infrastructure' | 'security' | 'networking' | 'applications'
}

const EyebrowWithPattern = ({
  text,
  appearance = 'light',
  solution = 'infrastructure',
}: EyebrowProps) => {
  const bgImageStyles = {
    '--bg-image': `url(${require('./img/bg.svg')})`,
  } as React.CSSProperties
  return (
    <div className={classNames(s.eyebrow, s[solution])}>
      <span className={classNames(s.text, s[appearance])}>{text}</span>
      <span className={s.pattern} style={bgImageStyles} />
    </div>
  )
}

export default EyebrowWithPattern
