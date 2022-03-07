import Tabs, { Tab } from '@hashicorp/react-tabs'
import { prettyOs, prettyArch, SortedReleases } from '../../utils/downloader'
import { Link, PackageManagerConfig } from '../..'
import styles from './style.module.css'

export default function DownloadTabs({
  defaultTabIdx,
  tabData,
  downloads,
  version,
  merchandisingSlot,
  logo,
  tutorialLink,
}: DownloadTabsProps): React.ReactElement {
  return (
    <Tabs
      key={defaultTabIdx}
      centered
      fullWidthBorder
      defaultTabIdx={defaultTabIdx}
    >
      {tabData.map(({ os, packageManagers }) => (
        <Tab key={os} heading={prettyOs(os)}>
          <div className={styles.cards}>
            <Cards
              os={os}
              downloads={downloads}
              packageManagers={packageManagers}
              version={version}
              logo={logo}
              tutorialLink={tutorialLink}
            />
            {merchandisingSlot ? merchandisingSlot : null}
          </div>
        </Tab>
      ))}
    </Tabs>
  )
}

function Cards({
  os,
  downloads,
  packageManagers,
  version,
  logo,
  tutorialLink,
}: CardsProps): React.ReactElement {
  const arches = downloads[os]
  const hasPackageManager = packageManagers.length > 0
  const hasMultiplePackageManagers = packageManagers.length > 1

  return (
    <>
      <div
        data-testid="download-cards"
        className={
          hasMultiplePackageManagers
            ? styles.downloadCardsSingle
            : styles.downloadCards
        }
      >
        {hasPackageManager && (
          <div className={styles.packageManagers}>
            <span className={styles.cardTitle}>Package Manager</span>
            {hasMultiplePackageManagers ? (
              <Tabs className={styles.packageManagerTabs}>
                {packageManagers.map(({ label, commands }) => (
                  <Tab key={label} heading={label}>
                    <div className={styles.install}>
                      {commands.map((command) => (
                        <pre key={command}>{command}</pre>
                      ))}
                    </div>
                  </Tab>
                ))}
              </Tabs>
            ) : (
              <div className={styles.install}>
                {packageManagers[0].commands.map((command) => (
                  <pre key={command}>{command}</pre>
                ))}
              </div>
            )}
            {tutorialLink && (
              <div>
                <a href={tutorialLink.href}>{tutorialLink.label}</a>
              </div>
            )}
          </div>
        )}
        <div className={hasPackageManager ? styles.card : styles.soloCard}>
          <span className={styles.cardTitle}>
            {prettyOs(os)} Binary Download
          </span>
          <div>
            <div className={styles.logoWrapper}>
              {logo}
              <span className={styles.version}>{version}</span>
            </div>
            {Object.entries(arches).map(([arch, url]) => (
              <a href={url} key={arch} className={styles.downloadLink}>
                {prettyArch(arch)}
              </a>
            ))}
          </div>
          <div className={styles.fastly}>
            Bandwidth courtesy of
            <img src={require('../logos/fastly.svg')} alt="Fastly" />
          </div>
        </div>
      </div>
    </>
  )
}

// Types

interface DownloadTabsProps {
  defaultTabIdx: number
  tabData: {
    os: string
    packageManagers: PackageManagerConfig[]
  }[]
  downloads: SortedReleases
  version: string
  merchandisingSlot?: React.ReactElement
  logo: React.ReactElement
  tutorialLink: Link
}

interface CardsProps {
  os: string
  downloads: SortedReleases
  packageManagers: PackageManagerConfig[]
  version: string
  logo: React.ReactElement
  tutorialLink: Link
}
