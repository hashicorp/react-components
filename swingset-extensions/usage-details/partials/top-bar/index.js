import React from 'react'
import PackageVersion from '../package-version'

import styles from './top-bar.module.css'

function TopBar({ heading, packageJson, linkSlot }) {
  //  Build our SourceGraph URL, with pre-filled query
  //  We exclude `.json` files, since we usually don't
  //  really care about package.json in SourceGraph
  //  (we already know the version from our UsageDetails component!)
  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>{heading}</h2>
      {packageJson ? (
        <div className={styles.packageDetails}>
          <div className={styles.currentVersion}>
            <span className={styles.currentVersionLabel}>Latest:</span>
            <PackageVersion
              version={packageJson.version}
              name={packageJson.name}
            />
          </div>
          {linkSlot}
        </div>
      ) : null}
    </div>
  )
}

export default TopBar
