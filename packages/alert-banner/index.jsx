import { useEffect, useState } from 'react'
import cookie from 'js-cookie'
import slugify from 'slugify'
import classNames from 'classnames'
import useProductMeta from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import CloseIcon from './img/close-icon.svg?include'
import fragment from './fragment.graphql'
import s from './style.module.css'
import analytics from './analytics'

/**
 * AlertBanner renders a full-width link container.
 * Intended for use at the very top of a page,
 * above the navigation.
 *
 * @param {props} object
 * @param {props.expirationDate}
 * @param {props.hideOnMobile}
 * @param {props.linkText}
 * @param {props.name}
 * @param {props.product}
 * @param {props.tag}
 * @param {props.text}
 * @param {props.url}
 * @returns
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
}) {
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
    if (hasBeenDismissed || hasExpired) setIsShown(false)
  }, [])

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
      data-test-is-shown={String(isShown)}
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
        <span className={s.visuallyHidden}>Dismiss alert</span>
      </button>
    </div>
  )
}

AlertBanner.fragmentSpec = { fragment }

export default AlertBanner
