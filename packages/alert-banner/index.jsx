import { Component, createRef } from 'react'
import cookie from 'js-cookie'
import slugify from 'slugify'
import classNames from 'classnames'
import { withProductMeta } from '@hashicorp/platform-product-meta'
import InlineSvg from '@hashicorp/react-inline-svg'
import CloseIcon from './img/close-icon.svg?include'
import fragment from './fragment.graphql'
import s from './style.module.css'

class AlertBanner extends Component {
  constructor(props) {
    super(props)

    this.expirationDate = props.expirationDate
    this.name = props.name || slugify(props.text, { lower: true })
    this.state = { show: true }
    this.banner = createRef()
  }

  render() {
    const { show } = this.state
    const { url, tag, product, text, linkText, hideOnMobile } = this.props

    const tagClass = tag.length > 3 ? 'has-large-tag' : ''

    return (
      <div
        className={classNames(
          'g-alert-banner',
          product.themeClass,
          { [s.hideOnMobile]: hideOnMobile },
          { show },
          { themed: !!product.themeClass }
        )}
        ref={this.banner}
      >
        <a href={url} className="link" onClick={() => this.trackEvent('click')}>
          <span className={`g-grid-container ${tagClass}`}>
            <span className="tag g-type-body-small-x-strong">{tag}</span>
            <span className={`text g-type-body-small ${tagClass}`}>
              {text}
              {linkText ? ' ' : null}
              {linkText ? (
                <span className="link-text g-type-body-small-x-strong">
                  {linkText}
                </span>
              ) : null}
            </span>
          </span>
        </a>
        <button className="close" onClick={() => this.onClose()}>
          <InlineSvg src={CloseIcon} />
          <span className="visually-hidden">Dismiss alert</span>
        </button>
      </div>
    )
  }

  componentDidMount() {
    const isCookieSet = cookie.get(`banner_${this.name}`)
    const hasExpired =
      this.expirationDate && Date.now() > Date.parse(this.expirationDate)

    // if cookie isn't set, show the component
    if (!isCookieSet) {
      this.setState({ show: true })
    }

    // if past expiration date, don't show the component
    if (hasExpired) {
      this.setState({ show: false })
    }
  }

  onClose() {
    // animate closed by setting height so
    // it's not 'auto' and then set to zero
    this.banner.current.style.height = `${this.banner.scrollHeight}px`
    window.setTimeout(() => {
      this.banner.current.style.height = '0'
    }, 1)

    // set the cookie so this banner doesn't show up anymore
    const name = `banner_${this.name}`
    cookie.set(name, 1)

    this.setState({ show: false })
    this.trackEvent('close')
  }

  trackEvent(type) {
    if (window.analytics) {
      const { tag, product, text, linkText } = this.props

      window.analytics.track(type.charAt(0).toUpperCase() + type.slice(1), {
        category: 'Alert Banner',
        label: `${text} - ${linkText} | ${type}`,
        tag: tag,
        theme: product,
      })
    }
  }
}

const AlertBannerWithProductMeta = withProductMeta(AlertBanner)

AlertBannerWithProductMeta.fragmentSpec = { fragment }

export default AlertBannerWithProductMeta
