import * as React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import type { NextStepsProps } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import Intro from '@hashicorp/react-intro'
import ExpandableArrow from '@hashicorp/react-expandable-arrow'
import s from './style.module.css'
import Badge from '@hashicorp/react-badge'

export default function NextSteps({
  appearance = 'light',
  theme = 'hashicorp',
  heading,
  description,
  ctas,
  steps,
}: NextStepsProps) {
  const { slug, themeClass } = useProductMeta(theme)
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
