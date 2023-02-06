/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

module.exports = {
  statusCode: {
    type: 'number',
    description:
      'Integer representing an HTTP response status code. Passing `404` will render "Not Found" vibes, passing any other error code will render generic error vibes.',
  },
}
