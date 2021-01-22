import { Component } from 'react'
import CloseIcon from './close-icon'
import cookie from 'js-cookie'
import slugify from 'slugify'
import fragment from './fragment.graphql'

class AlertBanner extends Component {
  constructor(props) {
    super(props)

    this.expirationDate = props.expirationDate
    this.name = props.name || slugify(props.text, { lower: true })
    this.state = { show: true }
    this.banner = React.createRef()
  }

  render() {
    const { show } = this.state
    const { url, tag, theme, text, linkText } = this.props

    const tagClass = tag.length > 3 ? 'has-large-tag' : ''

    return (
      <div
        className={`g-alert-banner ${theme} ${show ? 'show' : ''} `}
        ref={this.banner}
      >
        <a
          href={url}
          className={`link ${theme}`}
          onClick={() => this.trackEvent('click')}
        >
          <span className={`g-grid-container ${tagClass}`}>
            <span className="tag g-type-label">{tag}</span>
            <span className={`text g-type-body-small-strong ${tagClass}`}>
              {text}
              {linkText ? ' ' : null}
              {linkText ? <span className="link-text">{linkText}</span> : null}
            </span>
          </span>
        </a>
        <button className={`close ${theme}`} onClick={() => this.onClose()}>
          <CloseIcon />
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
      const { tag, theme, text, linkText } = this.props

      window.analytics.track(type.charAt(0).toUpperCase() + type.slice(1), {
        category: 'Alert Banner',
        label: `${text} - ${linkText} | ${type}`,
        tag: tag,
        theme: theme,
      })
    }
  }
}

AlertBanner.fragmentSpec = { fragment }

export default AlertBanner
