import * as React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import type { NextStepsProps } from './types'
import useProductMeta from '@hashicorp/platform-product-meta'
import Intro from '@hashicorp/react-intro'
import ExpandableArrow from '@hashicorp/react-expandable-arrow'
import s from './style.module.css'

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
                key={index}
                className={classNames(
                  s.stepsListItem,
                  isFeatured && s.stepsListItemFeature
                )}
              >
                <Link href={step.cta.url} legacyBehavior>
                  <a className={classNames(s.tile, s[variant])}>
                    <h3 className={s.tileHeading}>{step.heading}</h3>
                    {step.description ? (
                      <p className={s.tileDescription}>{step.description}</p>
                    ) : null}
                    <span className={s.tileCta}>
                      <span className={s.tileCtaLabel}>{step.cta.title}</span>
                      <span className={s.tileCtaIcon}>
                        <svg
                          className={s.tileCtaIconArrow}
                          width="9"
                          height="10"
                          viewBox="0 0 9 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          focusable={false}
                        >
                          <path
                            d="M4 1L8 5L4 9"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          />
                          <path
                            className={s.tileCtaIconLine}
                            d="M8 5H0"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          />
                        </svg>
                      </span>
                    </span>
                  </a>
                </Link>
                <Tile
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

function Tile({ variant, heading, description, cta }) {
  const [isHovered, setIsHovered] = React.useState(false)
  return (
    <Link href={cta.url}>
      <a
        className={classNames(s.tile, s[variant])}
        onMouseOver={() => {
          setIsHovered(true)
        }}
        onMouseOut={() => {
          setIsHovered(false)
        }}
      >
        <h3 className={s.tileHeading}>{heading}</h3>
        {description ? (
          <p className={s.tileDescription}>{description}</p>
        ) : null}
        <span className={s.tileCta}>
          <span className={s.tileCtaLabel}>{cta.title}</span>
          <span className={s.tileCtaIcon}>
            <ExpandableArrow expanded={isHovered} />
          </span>
        </span>
      </a>
    </Link>
  )
}
