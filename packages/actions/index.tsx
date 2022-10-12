import classNames from 'classnames'
import Button from '@hashicorp/react-button'
import StandaloneLink from '@hashicorp/react-standalone-link'
import type { ActionsProps } from './types'
import s from './style.module.css'

export default function Actions({
  appearance = 'light',
  layout = 'inline',
  theme = 'hashicorp',
  size = 'medium',
  ctas,
}: ActionsProps) {
  if (ctas.length < 1 || ctas.length > 2) {
    throw new Error(
      `Actions expects at least 1 cta, no more than 2. You provided ${ctas.length}.`
    )
  }
  return (
    <div className={classNames(s.actions, s[layout])} data-testid="actions">
      {ctas.map((cta, index) => {
        // The first CTA and second CTA should always
        // have the `primary` and `secondary` variations respectively.
        // This const is confusingly named because `Button` and `StandaloneLink`
        // use different prop names to trigger variations (`variant` and `theme`).

        const themeOrVariant = index === 0 ? 'primary' : 'secondary'
        const isStandaloneLink = cta?.href && cta?.children
        const isButton = cta?.title && cta?.url

        if (isButton) {
          return (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              title={cta.title}
              url={cta.url}
              onClick={cta.onClick}
              size={size}
              theme={{
                brand: theme,
                variant: themeOrVariant,
                background: appearance === 'dark' ? 'dark' : undefined,
              }}
            />
          )
        }

        if (isStandaloneLink) {
          return (
            <StandaloneLink
              href={cta.href}
              theme={themeOrVariant}
              appearance={appearance}
            >
              {cta.children}
            </StandaloneLink>
          )
        }
      })}
    </div>
  )
}
