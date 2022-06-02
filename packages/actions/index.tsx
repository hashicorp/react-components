import classNames from 'classnames'
import Button from '@hashicorp/react-button'
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
        return (
          <Button
            key={index}
            title={cta.title}
            linkType={
              cta.variant === 'tertiary-neutral' ? 'inbound' : undefined
            }
            url={cta.url}
            onClick={cta.onClick}
            size={size}
            theme={{
              brand: theme,
              variant: cta.variant || 'primary',
              background: appearance === 'dark' ? 'dark' : undefined,
            }}
          />
        )
      })}
    </div>
  )
}
