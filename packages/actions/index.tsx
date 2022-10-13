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

        const variant = index === 0 ? 'primary' : 'secondary'
        const isStandaloneLink = cta?.type === 'standalone-link'

        if (isStandaloneLink) {
          return (
            <StandaloneLink
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              href={cta.href}
              theme={variant}
              appearance={appearance}
              onClick={cta?.onClick}
              data-testid="standaloneLink"
            >
              {cta.title}
            </StandaloneLink>
          )
        } else {
          return (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              title={cta.title}
              url={cta.href}
              onClick={cta.onClick}
              size={size}
              theme={{
                brand: theme,
                variant: variant,
                background: appearance === 'dark' ? 'dark' : undefined,
              }}
              data-testid="button"
            />
          )
        }
      })}
    </div>
  )
}
