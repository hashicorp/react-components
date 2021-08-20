import InlineSvg from '@hashicorp/react-inline-svg'
import Button from '@hashicorp/react-button'
import classNames from 'classnames'
import s from './style.module.css'

export default function CalloutItem({
  icon,
  heading,
  content,
  link,
  layout,
  theme,
  product,
}) {
  const hasBadLink = link && (!link.text || !link.url)
  if (hasBadLink) {
    throw new Error('`link` must have both `text` and a `url`')
  }

  const isContentString = typeof content === 'string'
  const isContentRenderProp = typeof content === 'function'
  const renderIcon =
    typeof icon === 'function'
      ? icon
      : typeof icon === 'string'
      ? () => <InlineSvg src={icon} />
      : false
  return (
    <div
      className={classNames(s.root, s[`layout-${layout}`], s[`theme-${theme}`])}
    >
      {renderIcon && (
        <div
          data-testid="icon"
          className={classNames(s.icon, s[`layout-${layout}`])}
        >
          {renderIcon({ theme, product })}
        </div>
      )}

      <div>
        {heading && (
          <h3
            className={classNames(
              s.heading,
              s[`layout-${layout}`],
              s[`theme-${theme}`]
            )}
            data-testid="heading"
          >
            {heading}
          </h3>
        )}
        {isContentString ? (
          <p
            className={classNames(s.content, s[`theme-${theme}`])}
            data-testid="content"
          >
            {content}
          </p>
        ) : isContentRenderProp ? (
          content({ theme, product })
        ) : null}

        {link && (
          <div className={s.links} data-testid="links">
            <Button
              title={link.text}
              url={link.url}
              linkType={link.linkType || 'inbound'}
              theme={{
                brand: product,
                background: theme,
                variant: 'tertiary',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
