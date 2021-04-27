import React from 'react'
import InlineSvg from '@hashicorp/react-inline-svg'
import qs from '../../utils/query-string'
import useHover from '../../hooks/use-hover'
import getConfig from 'next/config'
import styles from './style.module.css'

const { publicRuntimeConfig } = getConfig()
const { SOURCEGRAPH_URL } = publicRuntimeConfig

function SourcegraphLink({ packageName }) {
  const [linkRef, isHovered] = useHover()
  return (
    <a
      ref={linkRef}
      className={styles.sourcegraphLink}
      href={`${SOURCEGRAPH_URL}?${qs({
        q: `-file:.json$ ${packageName}`,
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
  )
}

export default SourcegraphLink
