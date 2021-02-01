import Tabs, { Tab } from '@hashicorp/react-tabs'

import { prettyOs, prettyArch } from '../../utils/downloader'
import styles from './style.module.css'

export default function DownloadTabs({
  defaultTabIdx,
  tabData,
  downloads,
  version,
  merchandisingSlot,
  brand,
  logo,
  tutorialLink,
}) {
  return (
    <Tabs
      key={defaultTabIdx}
      centered
      fullWidthBorder
      theme={brand}
      className={styles.tabs}
      defaultTabIdx={defaultTabIdx}
    >
      {tabData.map((tab, stableIdx) => {
        const { os, packageManagers } = tab
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Tab key={stableIdx} heading={prettyOs(os)}>
            <div className={styles.cards}>
              <Cards
                key={os}
                os={os}
                downloads={downloads}
                packageManagers={packageManagers}
                version={version}
                theme={brand}
                logo={logo}
                tutorialLink={tutorialLink}
              />
              {merchandisingSlot}
            </div>
          </Tab>
        )
      })}
    </Tabs>
  )
}

function Cards({
  os,
  downloads,
  packageManagers,
  version,
  theme,
  logo,
  tutorialLink,
}) {
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
              <Tabs
                theme={theme}
                items={packageManagers.map(({ label, commands }) => ({
                  heading: label,
                  tabChildren: function TabChildren() {
                    return (
                      <div className={styles.install}>
                        {commands.map((command) => (
                          <pre key={command}>{command}</pre>
                        ))}
                      </div>
                    )
                  },
                }))}
              >
                {packageManagers.map((mgr, stableIdx) => {
                  const { label, commands } = mgr

                  return (
                    <Tab key={stableIdx} heading={label}>
                      <div className={styles.install}>
                        {commands.map((command) => (
                          <pre key={command}>{command}</pre>
                        ))}
                      </div>
                    </Tab>
                  )
                })}
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
          <span className={styles.cardTitle}>Binary Download</span>
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
