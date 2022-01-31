import { useEffect } from 'react'
import { useRouter } from 'next/router'

/**
 * If the current URL results in a non-404 response from the server, log the
 * event with window.analytics (if available) and perform a client-side
 * navigation to the resolved URL. Only intended to be used in conjunction with
 * Next.js's 404 page.
 *
 * Relies on window.analytics.track() being a valid function which can be
 * called as window.analytics.track(href, { category, label }).
 */
export default function use404Redirects(): void {
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const res = await fetch(window.location.pathname, { method: 'HEAD' })
      if (res.ok) {
        // res.url is the final URL that the redirect resolves to
        const { href, pathname } = new URL(res.url)

        // Prevent an infinite loop if hook is used on a page that the server
        // doesn't respond with a 404.
        if (pathname !== window.location.pathname) {
          if (
            typeof window !== 'undefined' &&
            typeof window?.analytics?.track === 'function' &&
            typeof window?.location?.href === 'string'
          ) {
            window.analytics.track(window.location.href, {
              category: 'Client-side Redirect',
              label: href,
            })
          }

          router.replace(pathname)
        }
      }
    })()
  }, [])
}
