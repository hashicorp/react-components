/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  onSubmit: {
    type: 'function',
    description: 'Handle search form submission',
    default: '(event) => { event.preventDefault() }',
  },
  placeholder: {
    type: 'string',
    description: 'Placeholder content within the search box',
    default: 'Search',
  },
  renderCalloutCta: {
    type: 'function',
    description:
      'Render function for displaying a small CTA beneath the search results',
  },
  renderHitContent: {
    type: 'function',
    description:
      'Render function for displaying search results. Function returns `hit` data and a `Highlight` component in an object as arguments.',
    required: true,
  },
  resolveHitLink: {
    type: 'function',
    description:
      'Optional function to transform the results of any given hit. Primarily used to remove `/index` from resuling urls',
  },
  showSearchLegend: {
    type: 'boolean',
    description: 'Enable the search keyboard legend',
    default: false,
  },
}
