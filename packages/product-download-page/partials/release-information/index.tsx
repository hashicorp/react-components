import { useState, Fragment } from 'react'
import useProductMeta from '@hashicorp/platform-product-meta'
import Dropdown from '../dropdown'
import {
  prettyArch,
  prettyOs,
  trackDownload,
  getVersionLabel,
  SortedReleases,
} from '../../utils/downloader'
import { Link } from '../../'
import styles from './style.module.css'

export default function ReleaseInformation({
  releases,
  latestVersion,
  containers,
  tutorials,
  changelog,
}: ReleaseInformationProps): React.ReactElement {
  const [selectedVersionId, setSelectedVersionId] = useState(latestVersion)
  const { version, ...selectedVersion } =
    releases.find((release) => release.version === selectedVersionId) || {}
  const { name, slug } = useProductMeta()

  return (
    <div className={styles.root}>
      <main className="g-grid-container">
        <h2>Release Information</h2>
        <div className={styles.grid}>
          {releases.length > 0 && (
            <>
              <div className={styles.releases}>Releases:</div>
              <div>
                <Dropdown
                  title={`${name} ${getVersionLabel(version, latestVersion)}`}
                  options={releases.map((releaseData) => ({
                    label: `${name} ${getVersionLabel(
                      releaseData.version,
                      latestVersion
                    )}`,
                    value: releaseData.version,
                  }))}
                  onChange={(release) => setSelectedVersionId(release)}
                />
                <a
                  href={
                    changelog ||
                    `https://github.com/hashicorp/${slug}/blob/v${version}/CHANGELOG.md`
                  }
                  className={styles.changelog}
                >
                  Changelog
                </a>
              </div>
            </>
          )}
          <div className={styles.latestDownloads}>Latest Downloads:</div>
          <div>
            Package downloads for {name} {version}
            <div className={styles.downloads}>
              {/* something feels not right with the way typescript is losing track of
              typings here, but i dont know what. for now, manually clarified the typings */}
              {Object.entries(selectedVersion).map(
                ([os, release]: [string, { [arch: string]: string }]) => (
                  <Fragment key={os}>
                    <div className={styles.os}>{prettyOs(os)}</div>
                    <div className={styles.arches}>
                      {Object.entries(release).map(([arch, file]) => (
                        <a
                          href={file}
                          key={arch}
                          onClick={() => trackDownload(slug, version, os, arch)}
                        >
                          {prettyArch(arch)}
                        </a>
                      ))}
                    </div>
                  </Fragment>
                )
              )}
            </div>
            <p>
              You can find the{' '}
              <a
                href={`https://releases.hashicorp.com/${slug}/${version}/${slug}_${version}_SHA256SUMS`}
              >
                SHA256 checksums for {name} {version}
              </a>{' '}
              online and you can{' '}
              <a
                href={`https://releases.hashicorp.com/${slug}/${version}/${slug}_${version}_SHA256SUMS.sig`}
              >
                verify the checksums signature file
              </a>{' '}
              which has been signed using{' '}
              <a href="https://hashicorp.com/security">
                HashiCorp&apos;s GPG key.
              </a>
            </p>
          </div>

          {containers?.length > 0 && (
            <>
              <div className={styles.heading}>Containers</div>
              <div className={styles.links}>
                {containers.map((container) => (
                  <div key={container.label}>
                    Run with <a href={container.href}>{container.label}</a>
                  </div>
                ))}
              </div>
            </>
          )}

          {tutorials?.length > 0 && (
            <>
              <div className={styles.heading}>Tutorials</div>
              <div className={styles.links}>
                {tutorials.map((tutorial) => (
                  <div key={tutorial.label}>
                    <a href={tutorial.href}>{tutorial.label}</a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

// Types

interface ReleaseInformationProps {
  releases: (SortedReleases & { version: string })[]
  latestVersion: string
  containers: Link[]
  tutorials: Link[]
  changelog: string
}
