import type { IntroProps } from './types'
import s from './style.module.css'

export default function Intro({
  eyebrow,
  heading,
  headingElement: HeadingElement = 'h2',
  headingSize,
  description,
}: IntroProps) {
  return (
    <div className={s.intro}>
      {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}
      <HeadingElement>{heading}</HeadingElement>
      <p>{description}</p>
    </div>
  )
}
