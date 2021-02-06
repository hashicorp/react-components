/*
  integrations.js
  Fetches integrations from Segment given write key and applies user-defined
  overrides. Combines with custom scripts to give a complete view into
  scripts that the site is trying to load. Finally, groups it all by category.
*/

export default function getIntegrations(
  segmentServices,
  additionalServices,
  segmentWriteKey,
  utilServerRoot
) {
  return fetchIntegrationsFromSegment(segmentWriteKey, utilServerRoot)
    .then(zipIntegrations.bind(this, segmentServices, additionalServices))
    .then(groupByCategory)
}

// Get integrations from Segment by write key
function fetchIntegrationsFromSegment(segmentWriteKey, utilServerRoot) {
  return fetch(`${utilServerRoot}/seg_integrations/${segmentWriteKey}`).then(
    (res) => {
      if (!res.ok) {
        throw new Error(
          `Failed to fetch integrations: HTTP ${res.status} ${res.statusText}`
        )
      }

      return res.json()
    }
  )
}

// Include developer overrides for fetched Segment integrations
function zipIntegrations(
  segmentOverrides,
  additionalServices,
  segmentOriginated
) {
  // Create Segment integration object with name as key for quick retrieval
  let segmentObj = segmentOriginated.reduce((obj, segment) => {
    obj[segment.name] = segment
    obj[segment.name].origin = 'segment'
    return obj
  }, {})

  // Go through each developer-defined segment service and update
  // segmentObj with any overrides
  for (var i = 0; i < segmentOverrides.length; i++) {
    if (
      Object.prototype.hasOwnProperty.call(segmentObj, segmentOverrides[i].name)
    ) {
      segmentObj[segmentOverrides[i].name] = Object.assign(
        segmentObj[segmentOverrides[i].name],
        segmentOverrides[i]
      )
    } else {
      /* eslint-disable-next-line */
      console.warn(
        `Unmatched integration config for ${segmentOverrides[i].name}`
      )
    }
  }

  // Include additional (non-Segment) services
  let allIntegrations = additionalServices
    ? additionalServices.map((integration) => {
        integration.origin = 'custom'
        return integration
      })
    : []

  for (const key in segmentObj) {
    allIntegrations.push(segmentObj[key])
  }

  // Returns array with all integrations, with origin key (segment or custom)
  return allIntegrations
}

// Group by category for display purposes
function groupByCategory(integrations) {
  let grouped = {}

  integrations.forEach((integration) => {
    if (Object.prototype.hasOwnProperty.call(grouped, integration.category)) {
      grouped[integration.category].push(integration)
    } else {
      grouped[integration.category] = [integration]
    }
  })

  return grouped
}
