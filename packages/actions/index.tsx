import classNames from 'classnames'
import Button from '@hashicorp/react-button'
import type { ActionsProps } from './types'
import s from './style.module.css'

export default function Actions({
  layout = 'inline',
  brand = 'hashicorp',
  size = 'medium',
  ctas,
}: ActionsProps) {
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
              brand: brand,
              variant: cta.variant || 'primary',
            }}
          />
        )
      })}
    </div>
  )
}
