import { headings, type RelatedContentProps } from './types'
import classNames from 'classnames'
import * as CardPrimitive from '@hashicorp/react-card/primitives'
import StandaloneLink from '@hashicorp/react-standalone-link'
import s from './style.module.css'

const RelatedContent = ({
  appearance = 'light',
  headline,
  headlineAs = 'h2',
  description,
  cards,
  cta,
}: RelatedContentProps) => {
  const Component: React.ElementType = headlineAs
  const cardHeadingElement =
    headings[headings.indexOf(headlineAs) + 1] || 'span'

  return (
    <div className={classNames([s.wrapper, s[appearance]])}>
      <div className={s.textStack}>
        <Component className={classNames([s.headline, s[appearance]])}>
          {headline}
        </Component>
        {description ? (
          <p className={classNames([s.description, s[appearance]])}>
            {description}
          </p>
        ) : null}
      </div>
      <div className={s.cards} data-testid="wpl-cards-container">
        {cards.map(({ link, thumbnail, meta, heading, description }) => (
          <CardPrimitive.Card
            appearance={appearance}
            heading={heading}
            link={link}
            key={heading}
          >
            {thumbnail ? (
              <CardPrimitive.Thumbnail
                src={thumbnail.src}
                alt={thumbnail.alt}
              />
            ) : null}
            <CardPrimitive.Content>
              {meta && meta.length > 0 ? (
                <CardPrimitive.Meta items={meta} />
              ) : null}
              <CardPrimitive.Heading as={cardHeadingElement}>
                {heading}
              </CardPrimitive.Heading>
              {description ? (
                <CardPrimitive.Description>
                  {description}
                </CardPrimitive.Description>
              ) : null}
            </CardPrimitive.Content>
          </CardPrimitive.Card>
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
