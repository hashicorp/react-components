import Script from 'next/script'

declare global {
  interface Window {
    heap?: $TSFixMe
  }
}

// Define a function that's responsible for sending Segment-related properties to Heap
// We pass this callback function to Segment's ready method (https://segment.com/docs/sources/website/analytics.js/#ready)
const segmentReadyCb = function passSegmentKeysToHeap() {
  if (!window.heap) return

  // Send XID
  if (!localStorage.getItem('seg_heap_xid')) {
    const xId = localStorage.getItem('seg_xid')

    if (xId) {
      window.heap.addUserProperties({
        'Segment Cross Origin ID': JSON.parse(xId),
      })
      localStorage.setItem('seg_heap_xid', Date.now().toString())
    }
  }

  // Send Anonymous ID
  if (!localStorage.getItem('seg_heap_anonymous_id')) {
    const anonId = localStorage.getItem('ajs_anonymous_id')

    if (anonId) {
      window.heap.addUserProperties({
        'Segment Dotcom Anonymous ID': JSON.parse(anonId),
      })
      localStorage.setItem('seg_heap_anonymous_id', Date.now().toString())
    }
  }
}

export default function SegmentScript({ preferences, writeKey }) {
  if (!preferences.loadAll && !preferences.segment) return null

  const integrations = Object.assign(
    { All: Boolean(preferences.loadAll), 'Segment.io': true },
    preferences.segment ?? {}
  )

  return (
    <Script id="segment">
      {`!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("${writeKey}", ${
        integrations ? JSON.stringify({ integrations: integrations }) : {}
      });
  analytics.page();
  analytics.ready(${segmentReadyCb});
  }}();`}
    </Script>
  )
}
