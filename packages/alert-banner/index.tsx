import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import slugify from 'slugify'
import classNames from 'classnames'
import VisuallyHidden from '@reach/visually-hidden'
import useProductMeta, {
  Products as HashiCorpProduct,
} from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import CloseIcon from './img/close-icon.svg?include'
import fragment from './fragment.graphql'
import s from './style.module.css'
import analytics from './analytics'

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
  const dismissalCookieId = `banner_${name || slugify(text, { lower: true })}`
  const [isShown, setIsShown] = useState(true)
  const { themeClass } = useProductMeta(product)

  /**
   * On mount, hide the banner if it is expired or
   * if a cookie indicates it was previously closed
   */
  useEffect(() => {
    const hasBeenDismissed = cookie.get(dismissalCookieId)
    const hasExpired = expirationDate && Date.now() > Date.parse(expirationDate)
    const shouldBeShown = !hasBeenDismissed && !hasExpired
    setIsShown((current) =>
      current !== shouldBeShown ? shouldBeShown : current
    )
  }, [expirationDate])

  /**
   * Dismiss the banner, and set a cookie
   * to remember the dismissal of this banner
   */
  function closeBanner() {
    cookie.set(dismissalCookieId, 1)
    setIsShown(false)
    analytics.trackClose({ linkText, product, tag, text })
  }

  return (
    <div
      className={classNames(
        s.root,
        themeClass,
        { [s.isShown]: isShown },
        { [s.hideOnMobile]: hideOnMobile }
      )}
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
            {linkText ? <span className={s.linkText}> {linkText}</span> : null}
          </span>
        </span>
      </a>
      <button className={s.closeButton} onClick={closeBanner}>
        <InlineSvg src={CloseIcon} />
        <VisuallyHidden>Dismiss alert</VisuallyHidden>
      </button>
    </div>
  )
}

AlertBanner.fragmentSpec = { fragment }

export default AlertBanner
