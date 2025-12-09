/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

export interface AlgoliaConfigObject {
  /** The ID of the target Algolia application. */
  appId?: string
  /** The name of the index to search. */
  indexName?: string
  /** A publishable search-only API key that can access the provided application and index. */
  searchOnlyApiKey?: string
}
