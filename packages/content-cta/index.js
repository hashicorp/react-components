import useProductMeta from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import Button from '@hashicorp/react-button'
import s from './style.module.css'

export default function ContentCta({
  heading,
  content,
  product = 'hashicorp',
  links,
  className,
}) {
  if (!heading || !content) {
    throw new Error('<ContentCTA /> requires heading & content props')
  }
  const hasLinks = links && links.length > 0
  if (hasLinks && links.filter((l) => !l.title || !l.url).length > 0) {
    throw new Error('<ContentCTA /> `links` must have both a title and a URL')
  }
  const isContentString = typeof content === 'string'
  const isContentRenderProp = typeof content === 'function'
  const { themeClass } = useProductMeta(product)

  return (
    <div
      className={classNames(
        s.root,
        themeClass,
        {
          [s.hasTheme]: themeClass,
        },
        className
      )}
    >
      <h4 data-testid="heading" className={s.heading}>
        {heading}
      </h4>

      {isContentString ? (
        <p data-testid="content" className={s.content}>
          {content}
        </p>
      ) : isContentRenderProp ? (
        content()
      ) : null}
      {hasLinks && (
        <div data-testid="links" className={s.links}>
          {links.map(({ title, url }, i) => (
            <Button
              key={title}
              className={i === 0 ? s.firstLink : ''}
              title={title}
              url={url}
              theme={{
                brand: product,
                variant: i === 0 ? 'primary' : 'secondary',
              }}
              size="small"
            />
          ))}
        </div>
      )}
    </div>
  )
}
