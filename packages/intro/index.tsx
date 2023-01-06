import classNames from 'classnames'
import type { IntroProps } from './types'
import Actions from '@hashicorp/react-actions'
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
  return (
    <div
      className={classNames(s.intro, s[appearance], s[textAlignment])}
      data-testid="intro"
    >
      {eyebrow ? <p className={s.eyebrow}>{eyebrow}</p> : null}
      <HeadingElement className={classNames(s.heading, headingSizeClassname)}>
        {heading}
      </HeadingElement>
      <Description className={descriptionClassName}>{description}</Description>
      {actions && actions.ctas && actions.ctas.length > 0 ? (
        <div className={s.actions}>
          <Actions
            appearance={appearance}
            layout={actions.layout}
            alignment={textAlignment}
            theme={actions.theme}
            size={actions.size}
            ctas={actions.ctas}
          />
        </div>
      ) : null}
    </div>
  )
}

const containsHTML = (str: string) => /<[a-z][\s\S]*>/i.test(str)

function Description({
  className,
  children,
}: {
  className: string
  children: IntroProps['description']
}) {
  // ReactNode
  if (typeof children === 'object') {
    return <div className={className}>{children}</div>
  }

  // HTML String
  if (typeof children === 'string' && containsHTML(children)) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: children,
        }}
        className={className}
      />
    )
  }

  // String
  return <p className={className}>{children}</p>
}
