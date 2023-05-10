/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ReactNode } from 'react'
import Button from '@hashicorp/react-button'
import type { ThemeVariant } from '@hashicorp/react-button/types'
import type { Products } from '@hashicorp/platform-product-meta'
import classNames from 'classnames'
import variantCentered from './styles/variant-centered.module.css'
import variantCompact from './styles/variant-compact.module.css'
import variantCompactGrid from './styles/variant-compact-grid.module.css'
import variantLinks from './styles/variant-links.module.css'

const stylesDict = {
  centered: variantCentered,
  compact: variantCompact,
  compactTertiary: variantCompact,
  compactGrid: variantCompactGrid,
  links: variantLinks,
}

interface CallToActionProps {
  heading?: string
  content?: ReactNode
  links?: {
    type?: 'inbound' | 'outbound' | 'anchor' | 'download'
    text: string
    url: string
  }[]
  variant?: keyof typeof stylesDict
  product?: Products
  theme?: 'light' | 'gray' | 'dark' | 'brand'
  className?: string
}

function CallToAction({
  heading,
  content,
  links,
  variant = 'centered',
  product = 'hashicorp',
  theme = 'light',
  className,
}: CallToActionProps) {
  const s = stylesDict[variant]
  if (!heading && !content) {
    throw new Error('<CallToAction /> requires either heading or content')
  }
  const hasLinks = links && links.length > 0
  if (hasLinks && links.filter((l) => !l.text || !l.url).length > 0) {
    throw new Error(
      '<CallToAction /> `links` must have both a "text" and a "url" prop'
    )
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
                let buttonVariant: ThemeVariant =
                  stableIdx === 0 ? 'primary' : 'secondary'
                if (variant === 'links') {
                  buttonVariant = 'tertiary-neutral'
                } else if (variant === 'compactTertiary') {
                  buttonVariant = 'tertiary'
                }
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
                      background: theme === 'gray' ? 'light' : theme,
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
