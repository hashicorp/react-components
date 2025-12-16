/**
 * Copyright IBM Corp. 2020, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import React from 'react'
import Image from 'next/image'
import qs from '../../utils/query-string'
import useHover from '../../hooks/use-hover'
import getConfig from 'next/config'
import styles from './style.module.css'
import SourcegraphLogo from '../../svg/sourcegraph-logo.svg'
import ExternalLink from '../../svg/external-link.svg'

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
      <Image className={styles.sourcegraphLogo} {...SourcegraphLogo} />
      <Image
        className={styles.externalIcon}
        {...ExternalLink}
        data-hovered={isHovered}
      />
    </a>
  )
}

export default SourcegraphLink
