import * as React from 'react'
import Badge from '@hashicorp/react-badge'
import classNames from 'classnames'
import ExpandableArrow from '@hashicorp/react-expandable-arrow'
import Intro from '@hashicorp/react-intro'
import Link from 'next/link'
import type { NextStepsProps } from './types'
import StandaloneLink from '@hashicorp/react-standalone-link'
import useProductMeta from '@hashicorp/platform-product-meta'
import s from './style.module.css'

export default function NextSteps({
  appearance = 'light',
  theme = 'hashicorp',
  heading,
  description,
  ctas,
  steps,
  tertiaryCta,
}: NextStepsProps) {
  const { slug, themeClass } = useProductMeta(theme)

  // Only render the tertiary CTA if it is provided, there are less than 3 steps and no CTAs
  const showTertiaryCta = tertiaryCta && steps.length < 3 && !ctas
  return (
    <section
      className={classNames(
        s.nextSteps,
        s[appearance],
        themeClass,
        slug && s[slug]
      )}
      data-testid="next-steps"
    >
      <div className={s.container}>
        <div className={s.content}>
          <Intro
            appearance={appearance}
            heading={heading}
            description={description}
            actions={{
              layout: 'stacked',
              ctas:
                ctas &&
                (ctas.map((cta) => ({
                  ...cta,
                  type: 'standalone-link',
                })) as NextStepsProps['ctas']),
            }}
          />
        </div>
        <div className={s.stepsWrapper}>
          <ul className={s.stepsList}>
            {steps.map((step, index) => {
              const isFeatured = steps.length === 3 && index === 0
              const variant = index === 0 ? 'primary' : 'secondary'
              return (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={classNames(
                    s.stepsListItem,
                    isFeatured && s.stepsListItemFeature
                  )}
                >
                  <Tile
                    badge={step.badge}
                    theme={theme}
                    variant={variant}
                    cta={{
                      title: step.cta.title,
                      url: step.cta.url,
                    }}
                    heading={step.heading}
                    description={step.description}
                  />
                </li>
              )
            })}
          </ul>
          {showTertiaryCta ? (
            <div className={s.tertiaryCta}>
              <p className={s.tertiaryCtaText}>{tertiaryCta.copy}</p>
              <StandaloneLink
                href={tertiaryCta.href}
                theme={'secondary'}
                appearance={appearance}
              >
                {tertiaryCta.ctaText}
              </StandaloneLink>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function Tile({ theme, variant, heading, badge, description, cta }) {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <Link href={cta.url} legacyBehavior>
      <a
        className={classNames(s.tile, s[variant])}
        onMouseOver={() => {
          setIsHovered(true)
        }}
        onMouseOut={() => {
          setIsHovered(false)
        }}
      >
        <div className={s.tileInner}>
          <div className={s.tileHeadingWrapper}>
            <h3 className={s.tileHeading}>{heading}</h3>
            {badge ? <BadgeWrapper theme={theme}>{badge}</BadgeWrapper> : null}
          </div>
          {description ? (
            <p className={s.tileDescription}>{description}</p>
          ) : null}
          <span className={s.tileCta}>
            <span className={s.tileCtaLabel}>{cta.title}</span>
            <span className={s.tileCtaIcon}>
              <ExpandableArrow expanded={isHovered} />
            </span>
          </span>
        </div>
        {theme !== 'hashicorp' || variant === 'secondary' ? (
          <span className={s.tileScrim} />
        ) : null}
      </a>
    </Link>
  )
}

const BadgeWrapper = ({ theme, children }) => {
  const badgeTheme = theme === 'hashicorp' ? 'action' : theme
  const page = theme === 'hashicorp' ? 'action' : 'actionFaint'

  return (
    <Badge theme={badgeTheme} page={page}>
      {children}
    </Badge>
  )
}
