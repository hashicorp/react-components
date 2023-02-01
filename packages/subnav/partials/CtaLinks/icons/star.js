/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'

function StarIcon(props) {
  return (
    <svg width={14} height={16} viewBox="0 0 14 16" {...props}>
      <path
        fillRule="evenodd"
        fill="#000000"
        d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
      />
    </svg>
  )
}

export default StarIcon
