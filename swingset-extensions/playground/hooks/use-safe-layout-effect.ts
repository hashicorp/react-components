/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { useEffect, useLayoutEffect } from 'react'

export const useSafeLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect
