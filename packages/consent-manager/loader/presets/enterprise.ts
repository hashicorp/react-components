/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import services from '../services'

export default {
  segmentServices: [
    services.googleAnalytics,
    services.googleTagManager,
    services.linkedIn,
    services.heap,
    services.marketo,
    services.googleAds,
  ],
}
