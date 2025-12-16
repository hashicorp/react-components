/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import useProductMeta from '@hashicorp/platform-product-meta'
import type { Products } from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import s from './style.module.css'

interface EnterpriseAlertProps {
  product?: Products
  inline?: boolean
  className?: string
  children?: ReactNode
}

function EnterpriseAlert({
  product,
  inline,
  children,
  className,
}: EnterpriseAlertProps) {
  const { name, slug, themeClass } = useProductMeta(product)

  // This ensures we aren't producing invalid HTML when rendering inline alerts within MDX. When used inline, we might end up nesting a div inside of a p. This is invalid as p cannot contain block-level elements (ref: https://www.w3.org/TR/html401/struct/text.html#h-9.3.1).
  const Element = inline ? 'span' : 'div'

  return (
    <Element
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
    </Element>
  )
}

export default EnterpriseAlert
