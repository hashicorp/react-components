/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  productCategories: {
    description: 'Object containing the data for populating the ProductsPanel',
    required: true,
  },
  navData: {
    description: 'Object containing the data for populating the StandardPanel',
    required: true,
  },
  promo: {
    description:
      'Object containing the data for populating the promo within the ProductsPanel or StandardPanel',
    required: false,
  },
  sectionName: {
    description:
      'Name of the section for the StandardPanel used for click event tracking on www',
    required: false,
    type: 'string',
  },
  parseUrl: {
    description: 'Function that edits the url based on the input. Used in www.',
    required: false,
  },
  trackNavClickEvent: {
    description: 'Function that tracks nav click events. Used in www.',
    required: false,
  },
  v: {
    description:
      'Function that takes in a Vercel Visual Editing string and returns the string without hidden data. Used in www',
    required: false,
  },
}
