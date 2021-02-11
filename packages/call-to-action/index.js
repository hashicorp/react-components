import Button from '@hashicorp/react-button'

function CallToAction(props) {
  const { heading, content, links, variant, product, theme } = props
  if (!heading && !content) {
    throw new Error('<CallToAction /> requires either heading or content')
  }
  const hasLinks = links && links.length > 0
  if (hasLinks && links.filter((l) => !l.text || !l.url).length > 0) {
    throw new Error('<CallToAction /> `links` must have both a title and a URL')
  }
  return (
    <div className={`g-call-to-action variant-${variant} theme-${theme}}`}>
      <div className="g-grid-container">
        {heading && (
          <h2 data-testid="heading" className="g-type-display-2">
            {heading}
          </h2>
        )}
        <div className="content-and-links">
          {content && (
            <p data-testid="content" className="g-type-body-large">
              {content}
            </p>
          )}
          {links && (
            <div data-testid="links" className="links">
              {links.map((link, stableIdx) => {
                const buttonVariant =
                  variant === 'links'
                    ? 'tertiary-neutral'
                    : stableIdx === 0
                    ? 'primary'
                    : 'secondary'
                const linkType =
                  variant === 'links' ? link.type || 'inbound' : link.type
                return (
                  <Button
                    // eslint-disable-next-line react/no-array-index-key
                    key={stableIdx}
                    linkType={linkType}
                    theme={{
                      variant: buttonVariant,
                      brand: product,
                      background: theme,
                    }}
                    title={link.text}
                    url={link.url}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

CallToAction.defaultProps = {
  theme: 'light',
  variant: 'centered',
}

export default CallToAction
