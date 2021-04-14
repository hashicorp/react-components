import { GetStaticPropsResult } from 'next'
import { ReleasesAPIResponse } from '.'

export function generateStaticProps({
  product,
  latestVersion,
}: Props): Promise<GetStaticPropsResult<{ releases: ReleasesAPIResponse }>> {
  return fetch(`https://releases.hashicorp.com/${product}/index.json`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
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
