import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'

export default function EnterpriseAlert({ product, inline, children }) {
  const { name, slug, themeClass } = useProductMeta(product)
  return (
    <div
      className={`g-enterprise-alert ${themeClass || ''} ${
        themeClass ? 'themed' : ''
      } ${inline ? 'inline' : ''}`}
    >
      <span className="tag g-type-tag-label">Enterprise</span>
      {!inline && (
        <p className="g-type-body">
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
