import { capitalize } from '@hashicorp/js-utils'

export default function EnterpriseAlert({ product, inline, children }) {
  return (
    <div className={`g-enterprise-alert ${product}${inline ? ' inline' : ''}`}>
      <span className="tag g-type-tag-label">Enterprise</span>
      {!inline && (
        <p className="g-type-body">
          {children ? (
            children
          ) : (
            <>
              This feature requires{' '}
              <a
                href={`https://www.hashicorp.com/products/${product}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>{capitalize(product)} Enterprise</strong>
              </a>
              .
            </>
          )}
        </p>
      )}
    </div>
  )
}
