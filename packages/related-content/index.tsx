import type { RelatedContentProps } from './types'
import classNames from 'classnames'
import Card from '@hashicorp/react-card'
import StandaloneLink from '@hashicorp/react-standalone-link'
import s from './style.module.css'

const RelatedContent = ({
  appearance = 'light',
  headline,
  description,
  cards,
  cta,
}: RelatedContentProps) => {
  return (
    <div className={classNames([s.wrapper, s[appearance]])}>
      <div className={s.textStack}>
        <h2 className={classNames([s.headline, s[appearance]])}>{headline}</h2>
        {description ? (
          <p className={classNames([s.description, s[appearance]])}>
            {description}
          </p>
        ) : null}
      </div>
      <div className={s.cards} data-testid="wpl-cards-container">
        {cards.map((card, i) => (
          <Card
            key={i}
            link={card.link}
            thumbnail={card.thumbnail}
            meta={card.meta}
            heading={card.heading}
            description={card.description}
            appearance={appearance}
          />
        ))}
      </div>
      <div className={s.cta} data-testid="wpl-cta-container">
        <StandaloneLink appearance={appearance} href={cta.href}>
          {cta.text}
        </StandaloneLink>
      </div>
    </div>
  )
}

export default RelatedContent
