import Link from 'next/link'
import classNames from 'classnames'
import type { NextStepsProps } from './types'
import { IconArrowRight16 } from '@hashicorp/flight-icons/svg-react/arrow-right-16'
import useProductMeta from '@hashicorp/platform-product-meta'
import Actions from '@hashicorp/react-actions'
import s from './style.module.css'

export default function NextSteps({
  appearance = 'light',
  theme = 'hashicorp',
  heading,
  description,
  actions,
  steps,
}: NextStepsProps) {
  const { themeClass } = useProductMeta(theme)
  const _actions =
    actions?.map((action) => {
      return {
        ...action,
        variant: 'tertiary-neutral',
      }
    }) || null
  return (
    <section className={classNames(s.nextSteps, themeClass, s[appearance])}>
      <div className={s.container}>
        <div className={s.content}>
          <h2 className={s.heading}>{heading}</h2>
          <p className={s.description}>{description}</p>
          {actions && actions.length > 0 ? (
            <div className={s.actions}>
              <Actions
                ctas={_actions}
                layout="stacked"
                appearance={appearance}
              />
            </div>
          ) : null}
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
                      {step.cta.title} <IconArrowRight16 />
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
