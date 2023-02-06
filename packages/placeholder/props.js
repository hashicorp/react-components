/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  children: {
    type: 'function',
    description:
      'Render prop used to render the placeholder layout. The function accepts a single argument, which is the renderable placeholder component.',
    required: true,
  },
}
