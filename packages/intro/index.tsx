import classNames from 'classnames'
import Actions from '@hashicorp/react-actions'
import type { IntroProps } from './types'
import s from './style.module.css'

export default function Intro({
  appearance = 'light',
  textAlignment = 'left',
  eyebrow,
  heading,
  headingElement: HeadingElement = 'h2',
  headingSize = 2,
  description,
  actions,
}: IntroProps) {
  const headingSizeClassname = `g-type-display-${headingSize}`
  const descriptionSizeClassname = [1, 2].includes(headingSize)
    ? 'g-type-body-large'
    : 'g-type-body'
  return (
    <div
      className={classNames(s.intro, s[appearance], s[textAlignment])}
      data-testid="intro"
    >
      {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}
      <HeadingElement className={classNames(s.heading, headingSizeClassname)}>
        {heading}
      </HeadingElement>
      <p className={classNames(s.description, descriptionSizeClassname)}>
        {description}
      </p>
      {actions && actions.ctas && actions?.ctas?.length > 0 ? (
        <div className={s.actions}>
          <Actions
            appearance={appearance}
            layout={actions.layout}
            theme={actions.theme}
            size={actions.size}
            ctas={actions.ctas}
          />
        </div>
      ) : null}
    </div>
  )
}
