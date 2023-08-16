/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import './global.css'
import { TabProvider } from '../packages/tabs'
import { Analytics } from '@vercel/analytics/react'
import MotionConfig from '../packages/motion-config'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <MotionConfig>
        <TabProvider>
          <Component {...pageProps} />
        </TabProvider>
      </MotionConfig>
    </>
  )
}
