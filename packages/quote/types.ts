/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { AuthorBylineProps } from '@hashicorp/react-author-byline/types'

export interface QuoteProps extends AuthorBylineProps {
  /**
   * The display size the text should render as.
   */
  textSize?: 4 | 5
  /**
   * The text displayed as the quote
   */
  text: string
}
