import * as React from 'react'
import Actions from '../actions'
import s from './style.module.css'

export default function Intro({
  eyebrow,
  heading,
  description,
  ctas,
}): React.ReactElement {
  return (
    <div className={s.intro}>
      <p className={s.eyebrow}>{eyebrow}</p>
      <h2 className={s.heading}>{heading}</h2>
      <p className={s.description}>{description}</p>
      <div className={s.actions}>
        <Actions ctas={ctas} />
      </div>
    </div>
  )
}
