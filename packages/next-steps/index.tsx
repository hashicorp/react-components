import Link from 'next/link'
import classNames from 'classnames'
import type { NextStepsProps } from './types'
import { IconArrowRight16 } from '@hashicorp/flight-icons/svg-react/arrow-right-16'
import useProductMeta from '@hashicorp/platform-product-meta'
import Intro from '@hashicorp/react-intro'
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
                <Link href={step.cta.url}>
                  <a className={classNames(s.tile, s[variant])}>
                    <h3 className={s.tileHeading}>{step.heading}</h3>
                    {step.description ? (
                      <p className={s.tileDescription}>{step.description}</p>
                    ) : null}
                    <span className={s.tileCta}>
                      <span className={s.tileCtaLabel}>{step.cta.title}</span>
                      <span className={s.tileCtaIcon}>
                        <svg
                          className={s.arrow}
                          width="9"
                          height="10"
                          viewBox="0 0 9 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          focusable={false}
                        >
                          <path
                            className={s.chevron}
                            d="M4 1L8 5L4 9"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          />
                          <path
                            className={s.line}
                            d="M8 5H0"
                            stroke="currentColor"
                            strokeWidth={1.8}
                          />
                        </svg>
                      </span>
                    </span>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
