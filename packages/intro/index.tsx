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
  const descriptionSizeClassname =
    headingSize === 1 ? 'g-type-body-large' : 'g-type-body'
  const descriptionClassName = classNames(
    s.description,
    descriptionSizeClassname
  )
  const renderActions = actions && actions.ctas?.length > 0
  return (
    <div
      className={classNames(s.intro, s[appearance], s[textAlignment])}
      data-testid="intro"
    >
      {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}
      <HeadingElement className={classNames(s.heading, headingSizeClassname)}>
        {heading}
      </HeadingElement>
      {description.includes('<p>') ? (
        <div
          dangerouslySetInnerHTML={{
            __html: description,
          }}
          className={descriptionClassName}
        />
      ) : (
        <p className={descriptionClassName}>{description}</p>
      )}
      {renderActions ? (
        <div className={s.actions}>
          <Actions appearance={appearance} {...actions} />
        </div>
      ) : null}
    </div>
  )
}
