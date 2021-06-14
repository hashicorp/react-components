import { useEffect } from 'react'

// If there is a hash in the url, this script will check whether the hash matches
// the anchor link IDs for any element on the page and log it to our analytics.
export default function useAnchorLinkAnalytics() {
  let handle

  useEffect(() => {
    // pass if on server, requestIdleCallback not supported, analytics not loaded
    if (
      typeof window === 'undefined' ||
      !window.requestIdleCallback ||
      !window.analytics
    )
      return

    // since this is low priority work that we don't want to delay page load, we
    // run it inside on an idle callback
    handle = window.requestIdleCallback(() => {
      // if there is no hash in the url, we can pass
      const hash = window.location.hash
      if (hash.length < 1) return

      // find all the anchor link targets
      const targets = [].slice.call(
        document.querySelectorAll('.__target-lic, .__target-h')
      )

      // see if any of the anchor link targets match the hash in the url
      const targetMatch = targets.find((t) => t.id === hash.replace(/^#/, ''))

      // log the result to analytics
      window.analytics.track('Anchor Link Pageview', {
        hash,
        hit: !!targetMatch,
      })
    })

    return () => window.cancelIdleCallback(handle)
  })
}
