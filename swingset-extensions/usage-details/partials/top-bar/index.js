import InlineSvg from '@hashicorp/react-inline-svg'
import styles from './top-bar.module.css'
import svgSourcegraphLogo from '../../svg/sourcegraph-logo.svg?include'
import svgExternalLink from '../../svg/external-link.svg?include'
import qs from '../../utils/query-string'
import useHover from '../../hooks/use-hover'

const SOURCEGRAPH_URL = 'https://glacial-inlet-01066.herokuapp.com'

function TopBar({ packageName }) {
  const [linkRef, isHovered] = useHover()

  //  Build our SourceGraph URL, with pre-filled query
  //  We exclude `.json` files, since we usually don't
  //  really care about package.json in SourceGraph
  //  (we already know the version from our UsageDetails component!)
  const sourceGraphQuery = `-file:.json$ ${packageName}`
  const searchUrl = `${SOURCEGRAPH_URL}?${qs({ q: sourceGraphQuery })}`

  return (
    <div className={styles.root}>
      <h2 className={styles.heading}>Where it's used</h2>
      <a ref={linkRef} className={styles.sourcegraphLink} href={searchUrl}>
        Search with{' '}
        <InlineSvg
          className={styles.sourcegraphLogo}
          src={svgSourcegraphLogo}
        />
        <InlineSvg
          className={styles.externalIcon}
          src={svgExternalLink}
          data-hovered={isHovered}
        />
      </a>
    </div>
  )
}

export default TopBar
