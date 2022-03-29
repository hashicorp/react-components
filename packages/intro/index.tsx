import classNames from 'classnames'
import type { IntroProps } from './types'
import s from './style.module.css'

export default function Intro({
  textAlignment = 'left',
  eyebrow,
  heading,
  headingElement: HeadingElement = 'h2',
  headingSize = 2,
  description,
}: IntroProps) {
  const headingSizeClassname = `g-type-display-${headingSize}`
  const descriptionSizeClassname = [1, 2].includes(headingSize)
    ? 'g-type-body-large'
    : 'g-type-body'
  return (
    <div className={classNames(s.intro, s[textAlignment])}>
      {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}
      <HeadingElement className={classNames(s.heading, headingSizeClassname)}>
        {heading}
      </HeadingElement>
      <p className={classNames(s.description, descriptionSizeClassname)}>
        {description}
      </p>
    </div>
  )
}
