import React, { useState, useMemo, useEffect } from 'react'
import useProductMeta, {
  ProductMetaProvider,
} from '@hashicorp/nextjs-scripts/lib/providers/product-meta'
import HashiHead from '@hashicorp/react-head'
import DownloadCards from './partials/download-cards'
import ReleaseInformation from './partials/release-information'
import generateDefaultPackageManagers from './package-managers'
import {
  sortPlatforms,
  sortAndFilterReleases,
  detectOs,
} from './utils/downloader'
import { HashiCorpProduct } from '../../types'

import styles from './style.module.css'

export default function ProductDownloader({
  tutorialLink,
  merchandisingSlot,
  logo,
  getStartedLinks,
  getStartedDescription,
  containers,
  tutorials,
  changelog,
  className,
  packageManagerOverrides = [],
  // these props are piped in from `generateStaticProps`
  product,
  latestVersion,
  releases,
}: Props): React.ReactElement {
  const { name, themeClass } = useProductMeta(product)
  const currentRelease = releases.versions[latestVersion]

  const sortedDownloads = useMemo(() => sortPlatforms(currentRelease), [
    currentRelease,
  ])
  const osKeys = Object.keys(sortedDownloads)
  const [osIndex, setSelectedOsIndex] = useState(0)

  // Sort our releases for our ReleaseInformation section
  const latestReleases = sortAndFilterReleases(Object.keys(releases.versions))
  const sortedReleases = latestReleases.map((releaseVersion) => ({
    ...sortPlatforms(releases.versions[releaseVersion]),
    version: releaseVersion,
  }))

  // Generate default package manager installation config, merge in overrides if present
  // - if an override matches the label of a default, it overrides it
  // - if not, it just gets pushed in
  // This allows for flexible behavior on changing or adding new package manager configs on
  // a per-product basis if necessary.
  let packageManagers = generateDefaultPackageManagers(name)
  const overrides = [...packageManagerOverrides]
  if (overrides) {
    packageManagers = packageManagers
      .reduce((memo, pkg) => {
        const override = overrides.find(
          (pkgOverride) => pkg.label === pkgOverride.label
        )
        if (override) {
          memo.push(override)
          const idx = overrides.findIndex(
            (pkgOverride) => pkg.label === pkgOverride.label
          )
          // if we matched an override, remove from the array, anything that remains
          // is an addition instead of an override and we merge later
          overrides.splice(idx, 1)
        } else {
          memo.push(pkg)
        }
        return memo
      }, [])
      .concat(overrides)
  }

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
      <HashiHead title={`Downloads | ${name} by HashiCorp`} />
      <div className={`${styles.root} ${themeClass || ''} ${className || ''}`}>
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
          containers={containers}
          tutorials={tutorials}
          changelog={changelog}
        />
      </div>
    </ProductMetaProvider>
  )
}

// -----
// Types
// -----

interface Props {
  tutorialLink: Link
  merchandisingSlot: React.ReactElement
  logo: React.ReactElement
  getStartedLinks: Link[]
  getStartedDescription: string
  containers?: Link[]
  tutorials?: Link[]
  changelog?: string
  className?: string
  packageManagerOverrides?: PackageManagerConfig[]
  product: HashiCorpProduct
  latestVersion: string
  releases: ReleasesAPIResponse
}

export interface Link {
  href: string
  label: string
}

export type OperatingSystem =
  | 'darwin'
  | 'freebsd'
  | 'openbsd'
  | 'netbsd'
  | 'archlinux'
  | 'linux'
  | 'windows'

export interface PackageManagerConfig {
  label: string
  url?: string
  commands: string[]
  os: OperatingSystem
}

export interface ReleaseVersion {
  name: HashiCorpProduct
  version: string
  shasums: string
  shasums_signature: string
  builds: {
    name: HashiCorpProduct
    version: string
    os: OperatingSystem
    arch: string
    filename: string
    url: string
  }[]
}
export interface ReleasesAPIResponse {
  name: HashiCorpProduct
  versions: {
    [versionNumber: string]: ReleaseVersion
  }
}
