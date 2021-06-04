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
  /* @TODO write test - mock window.analytics, assert on call */
  console.log('trackCodeClick')
  if (!window || !window.analytics) return
  window.analytics.track('Click', { category: 'CodeBlock' })
}

function trackCopy() {
  /* @TODO write test - mock window.analytics, assert on call */
  console.log('trackCopy')
  if (!window || !window.analytics) return
  window.analytics.track('Copy', { category: 'CodeBlock' })
}

function trackTabSelect(tabGroup) {
  /* @TODO write test - mock window.analytics, assert on call */
  console.log('trackTabSelect', tabGroup)
  if (!window || !window.analytics) return
  window.analytics.track('Select CodeTab', { category: 'CodeBlock', tabGroup })
}

export { heapAttributes }
export default {
  trackCodeClick,
  trackCopy,
  trackTabSelect,
}
