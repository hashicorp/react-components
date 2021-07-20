import React, { useState, useMemo, useEffect } from 'react'
import useProductMeta, {
  ProductMetaProvider,
} from '@hashicorp/platform-product-meta'
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

export default function ProductDownloadsPage({
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
  enterpriseMode = false,
  // these props are piped in from `generateStaticProps`
  product,
  latestVersion,
  releases,
}: ProductDownloadsPageProps): React.ReactElement {
  const { name, slug, themeClass } = useProductMeta(product)
  const _latestVersion = `${latestVersion}${enterpriseMode ? '+ent' : ''}`
  const currentRelease = releases.versions[_latestVersion]

  if (!currentRelease)
    throw new Error(
      `We went looking for version "${_latestVersion}" but could not find it in the release data. Please make sure that the "latestVersion" prop matches the version name of an existing release.`
    )

  const sortedDownloads = useMemo(() => sortPlatforms(currentRelease), [
    currentRelease,
  ])
  const osKeys = Object.keys(sortedDownloads)
  const [osIndex, setSelectedOsIndex] = useState(0)

  // Sort our releases for our ReleaseInformation section
  const latestReleases = sortAndFilterReleases(Object.keys(releases.versions))
  const sortedReleases = latestReleases
    // remove enterprise releases unless enterpriseMode is active
    .filter((releaseVersion) => {
      const isEnterpriseVersion = !!releaseVersion.match(/\+ent(?:.*?)*$/)
      if (enterpriseMode) return isEnterpriseVersion
      return !isEnterpriseVersion
    })
    .map((releaseVersion) =>
      Object.assign({}, sortPlatforms(releases.versions[releaseVersion]), {
        version: releaseVersion,
      })
    )

  // Generate default package manager installation config, merge in overrides if present
  // - if an override matches the label of a default, it overrides it
  // - if not, it just gets pushed in
  // This allows for flexible behavior on changing or adding new package manager configs on
  // a per-product basis if necessary.
  //
  // NOTE: enterprise releases do not currently work with package managers. according to rel-eng,
  // this feature will be added in august 2021
  let packageManagers = enterpriseMode
    ? []
    : generateDefaultPackageManagers(slug)
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
        <h1 className={styles.pageTitle}>
          Download {name}
          {enterpriseMode ? ' Enterprise' : ''}
        </h1>
        <DownloadCards
          defaultTabIdx={osIndex}
          tabData={tabData}
          downloads={sortedDownloads}
          version={_latestVersion}
          logo={logo}
          tutorialLink={tutorialLink}
          merchandisingSlot={merchandisingSlot}
        />
        {
          <div className="g-grid-container">
            <div className={styles.gettingStarted}>
              <h2 className={styles.gettingStartedTitle}>Get Started</h2>
              <p className={styles.gettingStartedDescription}>
                {getStartedDescription}
              </p>
              <div className={styles.links}>
                {getStartedLinks?.map((link) => (
                  <a className={styles.link} href={link.href} key={link.href}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        }

        <ReleaseInformation
          releases={sortedReleases}
          latestVersion={_latestVersion}
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

interface ProductDownloadsPageProps {
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
  enterpriseMode: boolean
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
