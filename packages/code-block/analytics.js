/**
 * data-heap-track attributes are used on Learn
 * for reporting via Heap
 */
const heapAttributes = {
  root: 'code-block',
  copy: 'code-block-clipboard-icon',
}

/**
 * trackCodeClick is intended to capture manual click-and-select
 * interactions with our `code-block` component.
 *
 * (On Learn, we've found many readers click and
 * select manually rather than using the Copy button)
 */
function trackCodeClick() {
  if (!hasTrackFunction()) return
  window.analytics.track('Click', { category: 'CodeBlock' })
}

/**
 * Track clicks on the "Copy" button
 * via window.analytics.track
 */
function trackCopy() {
  if (!hasTrackFunction()) return
  window.analytics.track('Copy', { category: 'CodeBlock' })
}

/**
 * Track tab selection in CodeTabs
 * via window.analytics.track
 */
function trackTabSelect(tabGroup) {
  if (!hasTrackFunction()) return
  window.analytics.track('Select CodeTab', { category: 'CodeBlock', tabGroup })
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

export { heapAttributes }
export default {
  trackCodeClick,
  trackCopy,
  trackTabSelect,
}
