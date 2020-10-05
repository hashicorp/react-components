/*
  load.js
  Responsible for loading scripts, whether they are Segment-originated or
  custom defined.
*/

export default function loadAnalytics(
  preferences,
  segmentWriteKey,
  additionalServices
) {
  // If analytics have already been added to page, it's likely you're updating your preferences
  // We reload the page to re-initiate the script with the updated integrations
  // TODO: Investigate alternatives to full page reload approach
  if (window.analytics && window.analytics.initialized) {
    window.location.reload()
    return
  }

  if (preferences.loadAll) {
    loadSegment(segmentWriteKey, { All: true })
    loadCustom(additionalServices)
    return
  }

  if (preferences.segment) {
    loadSegment(segmentWriteKey, preferences.segment)
  }

  if (preferences.custom) {
    loadCustom(additionalServices, preferences.custom)
  }
}

function loadSegment(writeKey, userPreferences = {}) {
  const integrations = Object.assign(
    { All: false, 'Segment.io': true },
    userPreferences
  )

  // Exit early if Segment snippet is already present on page
  if (window.analytics) return

  // Otherwise, construct and append script to <body>
  insertScript({
    body: constructSegmentSnippet(writeKey, integrations),
    addToBody: true,
  })
}

function loadCustom(services, userPreferences) {
  if (!services || services.length === 0) return

  if (userPreferences) {
    // Load according to user preferences
    const integrationNames = Object.keys(userPreferences)
    let service
    integrationNames.forEach((name) => {
      service = services.find((service) => {
        return userPreferences[name] && service.name === name
      })
      if (service) {
        insertScript(service)
      }
    })
  } else {
    // Load everything
    services.forEach((service) => {
      insertScript(service)
    })
  }
}

function insertScript(script) {
  const scriptElement = document.createElement('script')
  scriptElement.type = 'text/javascript'

  if (script.async) {
    scriptElement.setAttribute('async', '')
  }

  if (script.dataAttrs) {
    script.dataAttrs.forEach((attr) => {
      scriptElement.dataset[attr.name] = attr.value
    })
  }

  if (script.body) {
    scriptElement.text = script.body
  } else if (script.url) {
    scriptElement.src = script.url
  }

  if (script.addToBody) {
    document.body.appendChild(scriptElement)
  } else {
    document.head.appendChild(scriptElement)
  }
}

function constructSegmentSnippet(writeKey, integrations) {
  // Define a function that's responsible for sending Segment-related properties to Heap
  // We pass this callback function to Segment's ready method (https://segment.com/docs/sources/website/analytics.js/#ready)
  const readyCb = function passSegmentKeysToHeap() {
    if (!window.heap) return

    // Send XID
    if (!localStorage.getItem('seg_heap_xid')) {
      const xId = localStorage.getItem('seg_xid')

      if (xId) {
        window.heap.addUserProperties({
          'Segment Cross Origin ID': JSON.parse(xId),
        })
        localStorage.setItem('seg_heap_xid', Date.now())
      }
    }

    // Send Anonymous ID
    if (!localStorage.getItem('seg_heap_anonymous_id')) {
      const anonId = localStorage.getItem('ajs_anonymous_id')

      if (anonId) {
        window.heap.addUserProperties({
          'Segment Dotcom Anonymous ID': JSON.parse(anonId),
        })
        localStorage.setItem('seg_heap_anonymous_id', Date.now())
      }
    }
  }

  return `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
analytics.load("${writeKey}", ${
    integrations ? JSON.stringify({ integrations }) : {}
  });
analytics.page();
analytics.ready(${readyCb});
}}();`
}
