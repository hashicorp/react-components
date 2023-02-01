/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  enabled: {
    type: 'boolean',
    description: 'Whether the toggle is on or off',
    default: false,
  },
  onChange: {
    type: 'function',
    description:
      'Function that will be called when the toggle is changed to on or off',
  },
}
