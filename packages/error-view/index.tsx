import React from 'react'
import Link from 'next/link'
import useErrorPageAnalytics from './use-error-page-analytics'
import use404Redirects from './use-404-redirects'
import s from './style.module.css'

export interface ErrorPageProps {
  /** Error code to be recorded via window.analytics.track.  */
  statusCode: number
}

const CONTENT_DICT = {
  404: {
    heading: 'Not Found',
    message: "We're sorry, but we can't find the page you're looking for.",
  },
  fallback: {
    heading: 'Something went wrong.',
    message:
      "We're sorry, but the requested page isn't available right now. We've logged this as an error, and will look into it. Please check back soon.",
  },
}

function ErrorPage({ statusCode }: ErrorPageProps): React.ReactElement {
  useErrorPageAnalytics(statusCode)

  const { heading, message } = CONTENT_DICT[statusCode] || CONTENT_DICT.fallback
  return (
    <div className={s.root}>
      <h1 className={s.heading}>{heading}</h1>
      <p>{message}</p>
      <p>
        <Link href="/">
          <a className={s.link}>Back to Home</a>
        </Link>
      </p>
    </div>
  )
}

export { useErrorPageAnalytics, use404Redirects }
export default ErrorPage
