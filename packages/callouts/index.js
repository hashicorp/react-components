import useProductMeta from '@hashicorp/platform-product-meta'
import CalloutItem from './partials/callout-item/index.js'
import classNames from 'classnames'
import s from './style.module.css'

function Callouts({
  heading,
  subheading,
  centerHeading,
  className,
  layout,
  theme = 'light',
  product = 'hashicorp',
  items,
}) {
  if (!layout)
    throw new Error('The "layout" prop is required, please pass in a value')

  const { slug } = useProductMeta(product)
  return (
    <section className={classNames(s.root, s[`theme-${theme}`], className)}>
      <div className="g-grid-container">
        {(heading || subheading) && (
          <div className={s.headings} data-testid="headings">
            {heading && (
              <h2
                className={classNames(s.heading, s[`theme-${theme}`], {
                  [s.centerHeading]: centerHeading,
                })}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p
                className={classNames(s.subHeading, s[`theme-${theme}`], {
                  [s.centerHeading]: centerHeading,
                })}
              >
                {subheading}
              </p>
            )}
          </div>
        )}
        <div className={classNames(s.items, s[`layout-${layout}`])}>
          {items.map((item, stableIdx) => {
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={stableIdx}
                className={classNames(
                  s.calloutItemWrapper,
                  s[`layout-${layout}`]
                )}
              >
                <CalloutItem
                  icon={item.icon}
                  heading={item.heading}
                  content={item.content}
                  link={item.link}
                  layout={layout}
                  theme={theme}
                  product={slug}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Callouts
