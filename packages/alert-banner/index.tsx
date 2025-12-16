/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import useProductMeta, {
  Products as HashiCorpProduct,
} from '@hashicorp/platform-product-meta'
import fragment from './fragment.graphql'
import s from './style.module.css'
import analytics from './analytics'
import { IconArrowRight16 } from '@hashicorp/flight-icons/svg-react/arrow-right-16'

interface AlertBannerProps {
  tag: string
  text: string
  url: string
  expirationDate?: string
  hideOnMobile?: boolean
  linkText?: string
  name?: string
  product?: HashiCorpProduct
}

/**
 * AlertBanner is a component used widely across HashiCorp websites to
 * draw attention to an important release, event, etc. It appears in
 * bold colors at the top of the website, and can be dismissed.
 */
function AlertBanner({
  expirationDate,
  hideOnMobile,
  linkText,
  name,
  product = 'vagrant', // override useProductMeta's default "hashicorp", as it would result in a dull gray background
  tag,
  text,
  url,
}: AlertBannerProps): React.ReactElement {
  const [isShown, setIsShown] = useState(() => {
    const hasExpired = expirationDate && Date.now() > Date.parse(expirationDate)

    return !hasExpired
  })
  const { themeClass } = useProductMeta(product)

  /**
   * On mount, hide the banner if it is expired
   */
  useEffect(() => {
    const hasExpired = expirationDate && Date.now() > Date.parse(expirationDate)
    setIsShown((current) => (current !== !hasExpired ? !hasExpired : current))
  }, [expirationDate])

  return (
    <>
      <div
        className={classNames(
          s.root,
          themeClass,
          { [s.isShown]: isShown },
          { [s.hideOnMobile]: hideOnMobile }
        )}
        suppressHydrationWarning
      >
        <a
          href={url}
          className={s.linkElem}
          onClick={() => analytics.trackClick({ linkText, product, tag, text })}
        >
          <span className={s.textContainer}>
            <span className={s.tag}>{tag} </span>
            <span className={s.text}>
              {text}
              {linkText ? (
                <span className={s.link}>
                  <span className={s.linkText}> {linkText}</span>
                  <IconArrowRight16 />
                </span>
              ) : null}
            </span>
          </span>
        </a>
      </div>
    </>
  )
}

AlertBanner.fragmentSpec = { fragment }

export default AlertBanner
