/**
 * trackClick is intended to capture
 * link clicks on the alert banner.
 */
function trackClick({ linkText, product, tag, text }) {
  if (!hasTrackFunction()) return
  window.analytics.track('Click', {
    category: 'Alert Banner',
    label: `${text} - ${linkText} | click`,
    tag: tag,
    theme: product,
  })
}

/**
 * trackClose is intended to capture
 * when visitors manually dismiss the alert banner
 */
function trackClose({ linkText, product, tag, text }) {
  if (!hasTrackFunction()) return
  window.analytics.track('Close', {
    category: 'Alert Banner',
    label: `${text} - ${linkText} | close`,
    tag: tag,
    theme: product,
  })
}

/**
 * Determine if window.analytics.track
 * is a function we can call.
 *
 * With consent, window.analytics.track is initialized in our
 * @hashicorp/react-consent-manager component
 * https://github.com/hashicorp/react-components/blob/c69c29bbcb9e2718c6864336326e4ddfb66822ba/packages/consent-manager/load.js#L132
 * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track
 *
 * @returns true if window.analytics.track is a function, false otherwise
 */
function hasTrackFunction() {
  return (
    window && window.analytics && typeof window.analytics.track == 'function'
  )
}

export default {
  trackClick,
  trackClose,
}
