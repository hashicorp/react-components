import './style.css'
import '@hashicorp/nextjs-scripts/lib/nprogress/style.css'

import Router from 'next/router'
import Error from './_error'
import NProgress from '@hashicorp/nextjs-scripts/lib/nprogress'
import { ErrorBoundary } from '@hashicorp/nextjs-scripts/lib/bugsnag'
import createConsentManager from '@hashicorp/nextjs-scripts/lib/consent-manager'
import useAnchorLinkAnalytics from '@hashicorp/nextjs-scripts/lib/anchor-link-analytics'

NProgress({ Router })
const { ConsentManager, openConsentManager } = createConsentManager({
  preset: 'oss',
})

export default function App({ Component, pageProps }) {
  useAnchorLinkAnalytics()
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ConsentManager />
      <Component {...pageProps} />
      <a onClick={openConsentManager}>Consent Manager</a>
    </ErrorBoundary>
  )
}
