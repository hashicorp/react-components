/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { ReactElement } from 'react'

/**
 * Pulls out the text node child of a pre element rendered via MDX
 */
export function getCodeFromChildPre(child: ReactElement): string {
  return child?.props?.children?.props?.children ?? ''
}
