import { useState, useMemo, useEffect } from 'react'
import useProductMeta, {
  ProductMetaProvider,
} from '@hashicorp/nextjs-scripts/lib/providers/product-meta'

import DownloadCards from './partials/download-cards'
import ReleaseInformation from './partials/release-information'
import {
  sortPlatforms,
  sortAndFilterReleases,
  detectOs,
} from './utils/downloader'

import styles from './style.module.css'

export default function ProductDownloader({
  releases,
  product,
  latestVersion,
  tutorialLink,
  merchandisingSlot,
  logo,
  getStartedLinks,
  getStartedDescription,
  containers,
  tutorials,
  packageManagers,
  changelog,
}) {
  const { name, themeClass } = useProductMeta(product)
  const currentRelease = releases.versions[latestVersion]

  const sortedDownloads = useMemo(() => sortPlatforms(currentRelease), [
    currentRelease,
  ])
  const osKeys = Object.keys(sortedDownloads)
  const [osIndex, setSelectedOsIndex] = useState()

  // Sort our releases for our ReleaseInformation section
  const latestReleases = sortAndFilterReleases(Object.keys(releases.versions))
  const sortedReleases = latestReleases.map((releaseVersion) => ({
    ...sortPlatforms(releases.versions[releaseVersion]),
    version: releaseVersion,
  }))

  const tabData = Object.keys(sortedDownloads).map((osKey) => ({
    os: osKey,
    packageManagers: packageManagers.filter(
      (packageManager) => packageManager.os === osKey
    ),
  }))

  useEffect(() => {
    // if we're on the client side, detect the default platform only on initial render
    const index = osKeys.indexOf(detectOs(window.navigator.platform))
    setSelectedOsIndex(index)
  }, [])

  return (
    <ProductMetaProvider product={product}>
      <div className={`${styles.root} ${themeClass || ''}`}>
        <h1>Download {name}</h1>
        <DownloadCards
          defaultTabIdx={osIndex}
          tabData={tabData}
          downloads={sortedDownloads}
          version={latestVersion}
          logo={logo}
          tutorialLink={tutorialLink}
          merchandisingSlot={merchandisingSlot}
        />
        {
          <div className="g-container">
            <div className={styles.gettingStarted}>
              <h2>Get Started</h2>
              <p>{getStartedDescription}</p>
              <div className={styles.links}>
                {getStartedLinks?.map((link) => (
                  <a href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        }

        <ReleaseInformation
          releases={sortedReleases}
          latestVersion={latestVersion}
          packageManagers={packageManagers.filter(
            (packageManager) => !!packageManager.url
          )}
          containers={containers}
          tutorials={tutorials}
          changelog={changelog}
        />
      </div>
    </ProductMetaProvider>
  )
}
