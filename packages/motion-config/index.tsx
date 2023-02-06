/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { LazyMotion } from 'framer-motion'

export default function MotionConfig({ children }) {
  return (
    <LazyMotion
      features={() => import('./features').then((mod) => mod.default)}
      strict={process.env.NODE_ENV === 'development'}
    >
      {children}
    </LazyMotion>
  )
}
