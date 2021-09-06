import useProductMeta from '@hashicorp/platform-product-meta'
import s from './style.module.css'
import classNames from 'classnames'

function EnterpriseAlert({ product, inline, children, className }) {
  const { name, slug, themeClass } = useProductMeta(product)
  return (
    <div
      className={classNames(s.root, themeClass, className, {
        [s.themed]: themeClass,
        [s.inline]: inline,
      })}
    >
      <span className={s.tag}>Enterprise</span>
      {!inline && (
        <p className={s.text}>
          {children ? (
            children
          ) : (
            <>
              This feature requires{' '}
              <a
                href={`https://www.hashicorp.com/products/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{name} Enterprise</strong>
              </a>
              .
            </>
          )}
        </p>
      )}
    </div>
  )
}

export default EnterpriseAlert
