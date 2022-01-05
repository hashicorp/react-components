import { GetStaticPropsResult } from 'next'
import { ReleasesAPIResponse } from '.'
import { makeFetchWithRetry } from './utils/fetch-with-retry'

/**
 * There is a bit of a race condition with product releases and the metadata for the latest release
 * propagating to releases.hashicorp.com. Often all it takes is a re-deploy of the website for it to work,
 * so we're introducing a retry when fetching the release data in hopes that we can avoid manual intervention.
 */
const fetchWithRetry = makeFetchWithRetry(fetch, { retries: 3, delay: 1000 })

export function generateStaticProps({
  product,
  latestVersion,
}: Props): Promise<GetStaticPropsResult<{ releases: ReleasesAPIResponse }>> {
  return fetchWithRetry(
    `https://releases.hashicorp.com/${product}/index.json`,
    {
      headers: {
        'Cache-Control': 'no-cache',
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      return {
        props: {
          releases: result,
          product,
          latestVersion,
        },
      }
    })
    .catch(() => {
      throw new Error(
        `--------------------------------------------------------
        Unable to resolve version ${latestVersion} on releases.hashicorp.com from link
        <https://releases.hashicorp.com/${product}/${latestVersion}/index.json>. Usually this
        means that the specified version has not yet been released. The downloads page
        version can only be updated after the new version has been released, or it will point
        to broken release links.
        ----------------------------------------------------------`
      )
    })
}

// Types

interface Props {
  product: string
  latestVersion: string
}
