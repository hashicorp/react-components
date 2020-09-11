import React from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import Button from '@hashicorp/react-button'

function CalloutItem(props) {
  const { icon, heading, content, link, layout, theme, brand } = props
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
    <div className={`callout-item layout-${layout} theme-${theme}`}>
      {renderIcon && (
        <div data-testid="icon" className={`icon layout-${layout}`}>
          {renderIcon({ theme, brand })}
        </div>
      )}

      <div className="text-and-links">
        {heading && (
          <h3
            className={`heading g-type-display-5 layout-${layout} theme-${theme}`}
            data-testid="heading"
          >
            {heading}
          </h3>
        )}
        {isContentString ? (
          <p
            className={`content g-type-body theme-${theme}`}
            data-testid="content"
          >
            {content}
          </p>
        ) : isContentRenderProp ? (
          content({ theme, brand })
        ) : null}

        {link && (
          <div className="links" data-testid="links">
            <Button
              title={link.text}
              url={link.url}
              linkType={link.linkType || 'inbound'}
              theme={{
                brand,
                background: theme,
                variant: 'tertiary'
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CalloutItem
