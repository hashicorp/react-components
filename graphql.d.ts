/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'

  const value: DocumentNode
  export = value
}
