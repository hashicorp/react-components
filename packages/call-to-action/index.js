import Button from '@hashicorp/react-button'
import classNames from 'classnames'
import variantCentered from './styles/variant-centered.module.css'
import variantCompact from './styles/variant-compact.module.css'
import variantLinks from './styles/variant-links.module.css'

const stylesDict = {
  centered: variantCentered,
  compact: variantCompact,
  links: variantLinks,
}

function CallToAction({
  heading,
  content,
  links,
  variant = 'centered',
  product,
  theme = 'light',
  className,
}) {
  const s = stylesDict[variant]
  if (!heading && !content) {
    throw new Error('<CallToAction /> requires either heading or content')
  }
  const hasLinks = links && links.length > 0
  if (hasLinks && links.filter((l) => !l.text || !l.url).length > 0) {
    throw new Error('<CallToAction /> `links` must have both a title and a URL')
  }
  return (
    <div className={classNames(s.root, s[`theme-${theme}`], className)}>
      <div className={s.container}>
        {heading && (
          <h2 className={s.heading} data-testid="heading">
            {heading}
          </h2>
        )}
        <div className={s.contentAndLinks}>
          {content && (
            <div
              className={classNames(s.content, { [s.hasHeading]: heading })}
              data-testid="content"
            >
              {content}
            </div>
          )}
          {links && (
            <div className={s.links} data-testid="links">
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
                    className={s.button}
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

export default CallToAction
