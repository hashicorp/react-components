import { useState, Fragment } from 'react'
import useProductMeta from '@hashicorp/nextjs-scripts/lib/providers/product-meta'

import Dropdown from '../dropdown'
import {
  prettyArch,
  prettyOs,
  trackDownload,
  getVersionLabel,
} from '../../utils/downloader'
import styles from './style.module.css'

export default function ReleaseInformation({
  releases,
  latestVersion,
  packageManagers,
  containers,
  tutorials,
  changelog,
}) {
  const [selectedVersionId, setSelectedVersionId] = useState(latestVersion)
  const { version, ...selectedVersion } =
    releases.find((release) => release.version === selectedVersionId) || {}
  const { name, slug } = useProductMeta()

  return (
    <div className={styles.root}>
      <div className="g-container">
        <h2>Release Information</h2>
        <div className={styles.grid}>
          {releases.length > 0 && (
            <>
              <div className={styles.releases}>Releases:</div>
              <div>
                <Dropdown
                  title={`${name} ${getVersionLabel(version, latestVersion)}`}
                  product={slug}
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
              {Object.entries(selectedVersion).map(([os, release]) => (
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
              ))}
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

          {packageManagers?.length > 0 && (
            <>
              <div className={styles.heading}>Package Managers</div>
              <div className={styles.links}>
                {packageManagers.map((packageManager) => (
                  <div key={packageManager.label}>
                    Install with{' '}
                    <a href={packageManager.url}>{packageManager.label}</a>
                  </div>
                ))}
              </div>
            </>
          )}
          {containers?.length > 0 && (
            <>
              <div className={styles.heading}>Containers</div>
              <div className={styles.links}>
                {containers.map((container) => (
                  <div key={container.label}>
                    Run with <a href={container.url}>{container.label}</a>
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
                    <a href={tutorial.url}>{tutorial.label}</a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
