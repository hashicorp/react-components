import { useEffect } from 'react'

/**
 * Given an error category to record,
 * make a call to window.analytics.track on mount and
 * when the provided statusCode changes, in order to record the
 * the specified error at the current window.location.href.
 *
 * Relies on window.analytics.track() being a valid function
 * which can be called as window.analytics.track(href, { category, label }).
 */
export default function useErrorPageAnalytics(
  /** The type of error. Used to send a "{statusCode} Response"
   * category value to window.analytics.track, if that's possible. */
  statusCode: number
): void {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window?.analytics?.track === 'function' &&
      typeof window?.document?.referrer === 'string' &&
      typeof window?.location?.href === 'string'
    )
      window.analytics.track(window.location.href, {
        category: `${statusCode} Response`,
        label: window.document.referrer || 'No Referrer',
      })
  }, [statusCode])
}
