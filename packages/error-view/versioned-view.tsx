import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useErrorPageAnalytics from './use-error-page-analytics'
import ErrorPage from '.'
import s from './style.module.css'

const versionPattern = /\/(?<version>v\d+[.]\d+[.](\d+|x))/

function VersionNotFound({ version }): React.ReactElement {
  const { asPath } = useRouter()
  useErrorPageAnalytics(404)

  const pathWithoutVersion = asPath.replace(versionPattern, '')
  const basePath = asPath.split('/')[1]

  return (
    <div className={s.root}>
      <h1 className={s.heading}>
        This page does not exist for version {version}.
      </h1>
      <p>
        Please select either the{' '}
        <Link href={pathWithoutVersion}>
          <a>most recent version</a>
        </Link>{' '}
        or a valid version that includes the page you are looking for.
      </p>
      <p>
        <Link href={`/${basePath}`}>
          <a className={s.link}>← Go back to Documentation</a>
        </Link>
      </p>
    </div>
  )
}

function VersionedErrorPage({ statusCode, versions }): React.ReactElement {
  const { asPath } = useRouter()

  const versionMatches = versionPattern.exec(asPath)

  const versionInPath = versionMatches?.groups?.version

  return versionInPath && statusCode === 404 ? (
    <VersionNotFound version={versionInPath} versions={versions} />
  ) : (
    <ErrorPage statusCode={statusCode} />
  )
}

VersionedErrorPage.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  const props = { statusCode }

  if (statusCode === 404 && typeof window === 'undefined') {
    // cache 404 for one day
    res.setHeader('Cache-Control', 's-maxage=86400')
  }

  return props
}

export { VersionedErrorPage }
