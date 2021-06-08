// data-heap-track attributes are used on Learn for reporting via Heap
const heapAttributes = {
  root: 'code-block',
  copy: 'code-block-clipboard-icon',
}

// window.analytics.track is initialized in our @hashicorp/react-consent-manager component (pending consent, of course)
// https://github.com/hashicorp/react-components/blob/c69c29bbcb9e2718c6864336326e4ddfb66822ba/packages/consent-manager/load.js#L132
// https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#track

// trackCodeClick is intended to capture manual selection interaction with our `code-block` component.
// (On Learn, we've found many readers click and select manually rather than using the Copy button)
function trackCodeClick() {
  if (!hasTrackFunction()) return
  window.analytics.track('Click', { category: 'CodeBlock' })
}

function trackCopy() {
  if (!hasTrackFunction()) return
  window.analytics.track('Copy', { category: 'CodeBlock' })
}

function trackTabSelect(tabGroup) {
  if (!hasTrackFunction()) return
  window.analytics.track('Select CodeTab', { category: 'CodeBlock', tabGroup })
}

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
