import NProgress from 'nprogress'
import { SingletonRouter } from 'next/router'

export default function NextNProgress({
  Router,
  start,
  finish,
  error,
}: {
  Router: SingletonRouter
  start?: () => void
  error?: () => void
  finish?: () => void
}): void {
  Router.events.on('routeChangeStart', () => {
    if (typeof start === 'function') start()
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    if (typeof error === 'function') error()
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', (url) => {
    if (typeof finish === 'function') finish()
    setTimeout(() => window.analytics && window.analytics.page(url), 0)
    NProgress.done()
  })
}
