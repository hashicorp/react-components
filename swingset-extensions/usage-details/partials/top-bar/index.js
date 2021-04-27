import InlineSvg from '@hashicorp/react-inline-svg'
import PackageVersion from '../package-version'
import styles from './top-bar.module.css'
import qs from '../../utils/query-string'
import useHover from '../../hooks/use-hover'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { SOURCEGRAPH_URL } = publicRuntimeConfig

function TopBar({ heading, packageJson, hideSourcegraph }) {
  const [linkRef, isHovered] = useHover()

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
          {hideSourcegraph ? null : (
            <a
              ref={linkRef}
              className={styles.sourcegraphLink}
              href={`${SOURCEGRAPH_URL}?${qs({
                q: `-file:.json$ ${packageJson.name}`,
              })}`}
            >
              Search with{' '}
              <InlineSvg
                className={styles.sourcegraphLogo}
                src={require('../../svg/sourcegraph-logo.svg?include')}
              />
              <InlineSvg
                className={styles.externalIcon}
                src={require('../../svg/external-link.svg?include')}
                data-hovered={isHovered}
              />
            </a>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default TopBar
