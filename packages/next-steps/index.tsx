/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

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
  steps,
  cta,
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
          {cta ? (
            <div className={s.cta}>
              <p className={s.ctaCopy}>{cta.copy}</p>
              <StandaloneLink
                href={cta.href}
                theme={'secondary'}
                appearance={appearance}
              >
                {cta.ctaText}
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
          <h3 className={s.tileHeading}>
            <span className={s.tileHeadingText}>{heading}</span>
            {badge ? <BadgeWrapper theme={theme}>{badge}</BadgeWrapper> : null}
          </h3>
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
        <span className={s.tileScrim} />
      </a>
    </Link>
  )
}

const BadgeWrapper = ({ theme, children }) => {
  const badgeTheme = theme === 'hashicorp' ? 'action' : theme
  const page = theme === 'hashicorp' ? 'action' : 'actionFaint'

  return (
    <span className={s.tileBadge}>
      <Badge theme={badgeTheme} page={page}>
        {children}
      </Badge>
    </span>
  )
}
